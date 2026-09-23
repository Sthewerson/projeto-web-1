import './Categorias.css'

// Recebe a lista de categorias, qual está selecionada
// e a função que deve ser chamada ao clicar em um botão
function Categorias({ categorias, selecionada, onSelecionar }) {
  return (
    <nav className="categorias" aria-label="Filtrar por categoria">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          className={categoria === selecionada ? 'categoria ativa' : 'categoria'}
          aria-pressed={categoria === selecionada}
          onClick={() => onSelecionar(categoria)}
        >
          {categoria}
        </button>
      ))}
    </nav>
  )
}

export default Categorias
