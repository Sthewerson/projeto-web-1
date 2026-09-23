import { useState } from 'react'
import Header from './components/Header'
import Categorias from './components/Categorias'
import ListaProdutos from './components/ListaProdutos'
import Footer from './components/Footer'
import { produtos, categorias } from './data/produtos'
import './App.css'

function App() {
  // Estado: qual categoria está selecionada no filtro
  const [categoriaAtual, setCategoriaAtual] = useState('Todos')

  // Filtra os produtos de acordo com a categoria escolhida
  const produtosFiltrados =
    categoriaAtual === 'Todos'
      ? produtos
      : produtos.filter((p) => p.categoria === categoriaAtual)

  return (
    <div className="app">
      <Header />

      <main className="conteudo">
        <Categorias
          categorias={categorias}
          selecionada={categoriaAtual}
          onSelecionar={setCategoriaAtual}
        />
        <ListaProdutos produtos={produtosFiltrados} />
      </main>

      <Footer />
    </div>
  )
}

export default App
