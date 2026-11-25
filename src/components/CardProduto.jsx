import { WHATSAPP } from '../config'
import './CardProduto.css'

// Formata o número como moeda brasileira: 22 -> "R$ 22,00"
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function CardProduto({ produto }) {
  const mensagem = `Olá! Quero pedir: ${produto.nome} (${formatarPreco(produto.preco)})`
  const linkWhatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`

  return (
    <article className="card">
      <div className="card-imagem-area">
        <img className="card-imagem" src={`/${produto.imagem}`} alt={produto.nome} />
        {produto.destaque && <span className="card-selo">Mais pedido</span>}
      </div>

      <div className="card-corpo">
        <h3 className="card-nome">{produto.nome}</h3>
        <p className="card-descricao">{produto.descricao}</p>

        <div className="card-rodape">
          <span className="card-preco">{formatarPreco(produto.preco)}</span>
          <a className="card-botao" href={linkWhatsapp} target="_blank" rel="noreferrer">
            Pedir no WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}

export default CardProduto
