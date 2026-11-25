import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Categorias from '../components/Categorias'
import ListaProdutos from '../components/ListaProdutos'
import Footer from '../components/Footer'
import { listarProdutos, listarCategorias } from '../services/api'

function Home() {
  const [produtos, setProdutos] = useState([])
  const [categorias, setCategorias] = useState(['Todos'])
  const [categoriaAtual, setCategoriaAtual] = useState('Todos')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  // Busca os dados na API assim que a página abre
  useEffect(() => {
    Promise.all([listarProdutos(), listarCategorias()])
      .then(([prods, cats]) => {
        setProdutos(prods)
        setCategorias(['Todos', ...cats])
      })
      .catch(() => setErro('Não foi possível carregar o cardápio. Tente novamente em instantes.'))
      .finally(() => setCarregando(false))
  }, [])

  const produtosFiltrados =
    categoriaAtual === 'Todos' ? produtos : produtos.filter((p) => p.categoria === categoriaAtual)

  return (
    <div className="app">
      <Header />
      <main className="conteudo">
        <Categorias categorias={categorias} selecionada={categoriaAtual} onSelecionar={setCategoriaAtual} />
        {carregando && <p className="lista-vazia">Carregando cardápio...</p>}
        {erro && <p className="lista-vazia">{erro}</p>}
        {!carregando && !erro && <ListaProdutos produtos={produtosFiltrados} />}
      </main>
      <Footer />
    </div>
  )
}

export default Home
