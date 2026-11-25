import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaEdit, FaPlus, FaSignOutAlt, FaTrash, FaArrowLeft } from 'react-icons/fa'
import FormProduto from '../components/FormProduto'
import { enviarImagem, criarProduto, editarProduto, excluirProduto, listarCategorias, listarProdutos } from '../services/api'
import './Admin.css'

const preco = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function Admin() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [produtos, setProdutos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [formulario, setFormulario] = useState(null) // null = fechado, {} = novo, {id,...} = editando
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!token) return
    Promise.all([listarProdutos(), listarCategorias()])
      .then(([p, c]) => { setProdutos(p); setCategorias(c) })
      .catch((e) => setErro(e.message))
  }, [token])

  // Sem login, volta para a tela de entrada (renderização condicional)
  if (!token) return <Navigate to="/admin/login" replace />

  function sair() {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  // Se o token expirou, o servidor responde 401 e mandamos o usuário logar de novo
  function tratarErro(e) {
    if (/autorizado/i.test(e.message)) return sair()
    setErro(e.message)
  }

  async function salvar(dados) {
    setErro('')
    try {
      if (formulario.id) {
        const atualizado = await editarProduto(formulario.id, dados, token)
        setProdutos(produtos.map((p) => (p.id === atualizado.id ? atualizado : p)))
      } else {
        const novo = await criarProduto(dados, token)
        setProdutos([...produtos, novo])
      }
      setFormulario(null)
    } catch (e) {
      tratarErro(e)
    }
  }

  async function excluir(p) {
    if (!window.confirm(`Excluir "${p.nome}"?`)) return
    setErro('')
    try {
      await excluirProduto(p.id, token)
      setProdutos(produtos.filter((x) => x.id !== p.id))
    } catch (e) {
      tratarErro(e)
    }
  }

  return (
    <div className="admin-pagina">
      <div className="admin-caixa admin-larga">
        <div className="admin-topo">
          <h1>Gerenciar cardápio</h1>
          <div className="admin-acoes">
            <Link to="/" className="btn"><FaArrowLeft aria-hidden="true" /> Ver cardápio</Link>
            <button className="btn" onClick={sair}><FaSignOutAlt aria-hidden="true" /> Sair</button>
          </div>
        </div>

        {erro && <p className="admin-erro" role="alert">{erro}</p>}

        {formulario ? (
          <FormProduto
            inicial={formulario}
            categorias={categorias}
            onSalvar={salvar}
            onEnviarImagem={(arquivo) => enviarImagem(arquivo, token).catch((e) => { tratarErro(e); return null })}
            onCancelar={() => setFormulario(null)}
          />
        ) : (
          <button className="btn btn-primario" onClick={() => setFormulario({})}>
            <FaPlus aria-hidden="true" /> Novo produto
          </button>
        )}

        <table className="admin-tabela">
          <thead>
            <tr><th>Nome</th><th>Categoria</th><th>Preço</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}{p.destaque && <span className="admin-tag">Mais pedido</span>}</td>
                <td>{p.categoria}</td>
                <td>{preco(p.preco)}</td>
                <td>
                  <button className="btn-icone" aria-label={`Editar ${p.nome}`} onClick={() => setFormulario(p)}><FaEdit /></button>
                  <button className="btn-icone perigo" aria-label={`Excluir ${p.nome}`} onClick={() => excluir(p)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
