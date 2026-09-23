// Dados do cardápio.
// Na fase 2 este arquivo será substituído por uma chamada à API (GET /produtos).
// Por isso cada item já está no mesmo formato que o back-end vai devolver.

export const categorias = ['Todos', 'Lanches', 'Pratos', 'Bebidas', 'Sobremesas']

export const produtos = [
  { id: 1, nome: 'X-Tudo', descricao: 'Pão, hambúrguer, ovo, queijo, presunto, bacon e salada.', preco: 22.0, categoria: 'Lanches', imagem: 'imagens/x-tudo.svg', destaque: true },
  { id: 2, nome: 'Tapioca de carne de sol', descricao: 'Recheada com carne de sol desfiada e queijo coalho.', preco: 16.0, categoria: 'Lanches', imagem: 'imagens/tapioca.svg' },
  { id: 3, nome: 'Cuscuz completo', descricao: 'Cuscuz com ovo, queijo coalho e charque.', preco: 14.0, categoria: 'Lanches', imagem: 'imagens/cuscuz.svg' },
  { id: 4, nome: 'Peixe frito', descricao: 'Filé de peixe do rio com arroz, feijão e salada.', preco: 32.0, categoria: 'Pratos', imagem: 'imagens/peixe.svg', destaque: true },
  { id: 5, nome: 'Caldinho de sururu', descricao: 'Caldo cremoso de sururu com cheiro-verde.', preco: 12.0, categoria: 'Pratos', imagem: 'imagens/sururu.svg' },
  { id: 6, nome: 'Frango assado', descricao: 'Coxa e sobrecoxa com baião de dois e farofa.', preco: 26.0, categoria: 'Pratos', imagem: 'imagens/frango.svg' },
  { id: 7, nome: 'Suco de cajá', descricao: 'Copo de 400 ml, feito com a fruta.', preco: 8.0, categoria: 'Bebidas', imagem: 'imagens/caja.svg' },
  { id: 8, nome: 'Café coado', descricao: 'Xícara de café passado na hora.', preco: 4.0, categoria: 'Bebidas', imagem: 'imagens/cafe.svg' },
  { id: 9, nome: 'Refrigerante lata', descricao: 'Lata de 350 ml. Pergunte os sabores.', preco: 6.0, categoria: 'Bebidas', imagem: 'imagens/refri.svg' },
  { id: 10, nome: 'Cocada de forno', descricao: 'Fatia de cocada assada, feita aqui.', preco: 7.0, categoria: 'Sobremesas', imagem: 'imagens/cocada.svg' },
  { id: 11, nome: 'Pudim de leite', descricao: 'Fatia de pudim com calda de caramelo.', preco: 9.0, categoria: 'Sobremesas', imagem: 'imagens/pudim.svg' },
]

// Número do WhatsApp do estabelecimento (com DDI e DDD, só números).
export const WHATSAPP = '5582999999999'
