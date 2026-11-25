import { Router } from 'express'
import { pool } from '../db.js'
import { exigirLogin } from '../middleware/auth.js'

const router = Router()

// Mesmo formato que o front já usava em src/data/produtos.js
const SELECT = `
  SELECT p.id, p.nome, p.descricao, CAST(p.preco AS DOUBLE) AS preco,
         c.nome AS categoria, p.imagem, p.destaque = 1 AS destaque
  FROM produtos p JOIN categorias c ON c.id = p.categoria_id`

// Valida o corpo e devolve { erro } ou { dados }
async function validar(body = {}) {
  const nome = String(body.nome || '').trim()
  const preco = Number(body.preco)
  if (!nome) return { erro: 'O nome é obrigatório.' }
  if (!Number.isFinite(preco) || preco < 0) return { erro: 'Preço inválido.' }
  const [cat] = await pool.query('SELECT id FROM categorias WHERE nome = ?', [body.categoria])
  if (!cat[0]) return { erro: 'Categoria inválida.' }
  return {
    dados: [
      nome.slice(0, 100),
      String(body.descricao || '').slice(0, 255),
      preco,
      cat[0].id,
      String(body.imagem || ''),
      body.destaque ? 1 : 0,
    ],
  }
}

// GET /api/categorias
router.get('/categorias', async (req, res) => {
  const [linhas] = await pool.query('SELECT nome FROM categorias ORDER BY id')
  res.json(linhas.map((l) => l.nome))
})

// GET /api/produtos?categoria=Lanches
router.get('/produtos', async (req, res) => {
  const { categoria } = req.query
  const [linhas] = categoria
    ? await pool.query(`${SELECT} WHERE c.nome = ? ORDER BY p.id`, [categoria])
    : await pool.query(`${SELECT} ORDER BY p.id`)
  res.json(linhas.map((p) => ({ ...p, destaque: !!p.destaque })))
})

// POST /api/produtos (admin)
router.post('/produtos', exigirLogin, async (req, res) => {
  const { erro, dados } = await validar(req.body)
  if (erro) return res.status(400).json({ erro })
  const [r] = await pool.query(
    'INSERT INTO produtos (nome, descricao, preco, categoria_id, imagem, destaque) VALUES (?,?,?,?,?,?)',
    dados
  )
  const [[novo]] = await pool.query(`${SELECT} WHERE p.id = ?`, [r.insertId])
  res.status(201).json({ ...novo, destaque: !!novo.destaque })
})

// PUT /api/produtos/:id (admin)
router.put('/produtos/:id', exigirLogin, async (req, res) => {
  const { erro, dados } = await validar(req.body)
  if (erro) return res.status(400).json({ erro })
  const [r] = await pool.query(
    'UPDATE produtos SET nome=?, descricao=?, preco=?, categoria_id=?, imagem=?, destaque=? WHERE id=?',
    [...dados, req.params.id]
  )
  if (r.affectedRows === 0) return res.status(404).json({ erro: 'Produto não encontrado.' })
  const [[atual]] = await pool.query(`${SELECT} WHERE p.id = ?`, [req.params.id])
  res.json({ ...atual, destaque: !!atual.destaque })
})

// DELETE /api/produtos/:id (admin)
router.delete('/produtos/:id', exigirLogin, async (req, res) => {
  const [r] = await pool.query('DELETE FROM produtos WHERE id = ?', [req.params.id])
  if (r.affectedRows === 0) return res.status(404).json({ erro: 'Produto não encontrado.' })
  res.status(204).end()
})

export default router
