// Cria o banco, as tabelas, os produtos iniciais e o usuário admin.
// Uso: npm run setup   (precisa do arquivo .env)
import 'dotenv/config'
import fs from 'node:fs'
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

const conn = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
})

const banco = process.env.DB_NAME || 'cardapio_digital'
const schema = fs.readFileSync(new URL('../sql/schema.sql', import.meta.url), 'utf8')
await conn.query(schema.replaceAll('cardapio_digital', banco))
await conn.query(`USE \`${banco}\``)

const categorias = ['Lanches', 'Pratos', 'Bebidas', 'Sobremesas']
for (const c of categorias) await conn.query('INSERT IGNORE INTO categorias (nome) VALUES (?)', [c])

const [[{ total }]] = await conn.query('SELECT COUNT(*) AS total FROM produtos')
if (total === 0) {
  const produtos = [
    ['X-Tudo', 'Pão, hambúrguer, ovo, queijo, presunto, bacon e salada.', 22, 'Lanches', 'imagens/x-tudo.svg', 1],
    ['Tapioca de carne de sol', 'Recheada com carne de sol desfiada e queijo coalho.', 16, 'Lanches', 'imagens/tapioca.svg', 0],
    ['Cuscuz completo', 'Cuscuz com ovo, queijo coalho e charque.', 14, 'Lanches', 'imagens/cuscuz.svg', 0],
    ['Peixe frito', 'Filé de peixe do rio com arroz, feijão e salada.', 32, 'Pratos', 'imagens/peixe.svg', 1],
    ['Caldinho de sururu', 'Caldo cremoso de sururu com cheiro-verde.', 12, 'Pratos', 'imagens/sururu.svg', 0],
    ['Frango assado', 'Coxa e sobrecoxa com baião de dois e farofa.', 26, 'Pratos', 'imagens/frango.svg', 0],
    ['Suco de cajá', 'Copo de 400 ml, feito com a fruta.', 8, 'Bebidas', 'imagens/caja.svg', 0],
    ['Café coado', 'Xícara de café passado na hora.', 4, 'Bebidas', 'imagens/cafe.svg', 0],
    ['Refrigerante lata', 'Lata de 350 ml. Pergunte os sabores.', 6, 'Bebidas', 'imagens/refri.svg', 0],
    ['Cocada de forno', 'Fatia de cocada assada, feita aqui.', 7, 'Sobremesas', 'imagens/cocada.svg', 0],
    ['Pudim de leite', 'Fatia de pudim com calda de caramelo.', 9, 'Sobremesas', 'imagens/pudim.svg', 0],
  ]
  for (const [nome, descricao, preco, cat, imagem, destaque] of produtos) {
    await conn.query(
      'INSERT INTO produtos (nome, descricao, preco, categoria_id, imagem, destaque) SELECT ?,?,?,id,?,? FROM categorias WHERE nome = ?',
      [nome, descricao, preco, imagem, destaque, cat]
    )
  }
  console.log('Produtos iniciais inseridos.')
}

const { ADMIN_USUARIO, ADMIN_SENHA } = process.env
if (ADMIN_USUARIO && ADMIN_SENHA) {
  const hash = await bcrypt.hash(ADMIN_SENHA, 10)
  await conn.query(
    'INSERT INTO usuarios (usuario, senha_hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE senha_hash = VALUES(senha_hash)',
    [ADMIN_USUARIO, hash]
  )
  console.log(`Usuário admin "${ADMIN_USUARIO}" pronto.`)
}

await conn.end()
console.log('Banco configurado.')
