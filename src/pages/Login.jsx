import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaLock } from 'react-icons/fa'
import { login } from '../services/api'
import './Admin.css'

function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  async function entrar(e) {
    e.preventDefault()
    setErro('')
    try {
      const { token } = await login(usuario, senha)
      localStorage.setItem('token', token)
      navigate('/admin')
    } catch (err) {
      setErro(err.message)
    }
  }

  return (
    <div className="admin-pagina">
      <form className="admin-caixa login-caixa" onSubmit={entrar}>
        <h1><FaLock aria-hidden="true" /> Área do dono</h1>
        <label>
          Usuário
          <input value={usuario} onChange={(e) => setUsuario(e.target.value)} autoComplete="username" />
        </label>
        <label>
          Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="current-password" />
        </label>
        {erro && <p className="admin-erro" role="alert">{erro}</p>}
        <button className="btn btn-primario" type="submit">Entrar</button>
        <Link to="/" className="admin-voltar"><FaArrowLeft aria-hidden="true" /> Voltar ao cardápio</Link>
      </form>
    </div>
  )
}

export default Login
