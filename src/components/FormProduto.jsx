import { useState } from 'react'

// Formulário usado para criar e editar produtos.
// Recebe os valores iniciais e devolve os dados pelo callback onSalvar.
function FormProduto({ inicial, categorias, onSalvar, onEnviarImagem, onCancelar }) {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: categorias[0] || '',
    imagem: '',
    destaque: false,
    ...inicial,
  })

  const [enviando, setEnviando] = useState(false)

  function mudar(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  // Ao escolher um arquivo, envia para o servidor e guarda o caminho devolvido
  async function escolherImagem(e) {
    const arquivo = e.target.files[0]
    if (!arquivo) return
    setEnviando(true)
    const caminho = await onEnviarImagem(arquivo)
    if (caminho) setForm((f) => ({ ...f, imagem: caminho }))
    setEnviando(false)
  }

  function enviar(e) {
    e.preventDefault()
    onSalvar({ ...form, preco: Number(String(form.preco).replace(',', '.')) })
  }

  return (
    <form className="admin-form" onSubmit={enviar}>
      <h2>{inicial.id ? 'Editar produto' : 'Novo produto'}</h2>
      <label>Nome<input name="nome" value={form.nome} onChange={mudar} required maxLength={100} /></label>
      <label>Descrição<input name="descricao" value={form.descricao} onChange={mudar} maxLength={255} /></label>
      <div className="admin-linha">
        <label>Preço (R$)<input name="preco" value={form.preco} onChange={mudar} required inputMode="decimal" /></label>
        <label>Categoria
          <select name="categoria" value={form.categoria} onChange={mudar}>
            {categorias.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
      </div>
      <label>Foto do produto (JPG, PNG ou WebP, até 3 MB)
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={escolherImagem} />
      </label>
      {enviando && <p>Enviando foto...</p>}
      {form.imagem && !enviando && (
        <img className="admin-previa" src={`/${form.imagem}`} alt="Prévia da foto" />
      )}
      <label className="admin-check">
        <input type="checkbox" name="destaque" checked={form.destaque} onChange={mudar} /> Marcar como "Mais pedido"
      </label>
      <div className="admin-acoes">
        <button className="btn btn-primario" type="submit" disabled={enviando}>Salvar</button>
        <button className="btn" type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  )
}

export default FormProduto
