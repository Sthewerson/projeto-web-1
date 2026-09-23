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
        <p className="header-horario">Aberto todos os dias, das 7h às 22h</p>
      </div>
    </header>
  )
}

export default Header
