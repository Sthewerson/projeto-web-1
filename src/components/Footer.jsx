import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-conteudo">
        <div>
          <h2 className="footer-titulo">Lanchonete Beira-Rio</h2>
          <p>Av. Beira-Rio, s/n, Centro, Penedo/AL</p>
        </div>
        <div>
          <p>Aberto todos os dias, das 7h às 22h</p>
          <p>Pedidos pelo WhatsApp: (82) 99999-9999</p>
        </div>
      </div>
      <p className="footer-credito">Projeto da disciplina Programação Web I, UFAL</p>
    </footer>
  )
}

export default Footer
