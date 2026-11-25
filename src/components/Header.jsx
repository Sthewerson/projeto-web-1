import { Link } from 'react-router-dom'
import { FaClock, FaUserCog } from 'react-icons/fa'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-faixa" aria-hidden="true"></div>
      <div className="header-conteudo">
        <h1 className="header-titulo">Lanchonete Beira-Rio</h1>
        <p className="header-subtitulo">
          Lanches, pratos e sucos. Escolha no cardápio e faça seu pedido pelo WhatsApp.
        </p>
        <p className="header-horario"><FaClock aria-hidden="true" /> Aberto todos os dias, das 7h às 22h</p>
        <Link to="/admin" className="header-admin"><FaUserCog aria-hidden="true" /> Área do dono</Link>
      </div>
    </header>
  )
}

export default Header
