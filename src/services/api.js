// Funções que conversam com o back-end (Node + Express + MySQL).
// Em desenvolvimento o Vite redireciona /api para http://localhost:3001.
const BASE = '/api'

async function requisicao(caminho, { metodo = 'GET', corpo, token } = {}) {
  const resposta = await fetch(BASE + caminho, {
    method: metodo,
    headers: {
      ...(corpo && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: corpo ? JSON.stringify(corpo) : undefined,
  })
  if (resposta.status === 204) return null
  const dados = await resposta.json().catch(() => ({}))
  if (!resposta.ok) throw new Error(dados.erro || 'Erro ao falar com o servidor.')
  return dados
}

export const listarProdutos = () => requisicao('/produtos')
export const listarCategorias = () => requisicao('/categorias')
export const login = (usuario, senha) => requisicao('/login', { metodo: 'POST', corpo: { usuario, senha } })
export const criarProduto = (produto, token) => requisicao('/produtos', { metodo: 'POST', corpo: produto, token })
export const editarProduto = (id, produto, token) => requisicao(`/produtos/${id}`, { metodo: 'PUT', corpo: produto, token })
export const excluirProduto = (id, token) => requisicao(`/produtos/${id}`, { metodo: 'DELETE', token })

// Envia a foto como multipart/form-data (o navegador define o Content-Type)
export async function enviarImagem(arquivo, token) {
  const corpo = new FormData()
  corpo.append('imagem', arquivo)
  const resposta = await fetch(`${BASE}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: corpo,
  })
  const dados = await resposta.json().catch(() => ({}))
  if (!resposta.ok) throw new Error(dados.erro || 'Erro ao enviar a imagem.')
  return dados.imagem
}
