import CardProduto from './CardProduto'
import './ListaProdutos.css'

function ListaProdutos({ produtos }) {
  if (produtos.length === 0) {
    return <p className="lista-vazia">Nenhum item nesta categoria ainda.</p>
  }

  return (
    <section className="lista-produtos">
      {/* O mesmo componente CardProduto é reutilizado para cada item */}
      {produtos.map((produto) => (
        <CardProduto key={produto.id} produto={produto} />
      ))}
    </section>
  )
}

export default ListaProdutos
