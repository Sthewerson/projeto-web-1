# Cardápio Digital

Cardápio online para uma lanchonete de Penedo/AL. O cliente vê os itens com foto, descrição e preço, filtra por categoria e faz o pedido direto pelo WhatsApp.

Projeto da disciplina **Programação Web I** (UFAL), professor Gustavo Miranda.

## O problema

Muitos estabelecimentos pequenos usam cardápio de papel ou mandam fotos pelo WhatsApp. Os preços ficam desatualizados e o cliente precisa perguntar tudo antes de pedir. O cardápio digital reúne essas informações em um link que pode ser compartilhado ou acessado por QR Code na mesa.

## Funcionalidades

- Lista de produtos com foto, descrição e preço
- Filtro por categoria (Lanches, Pratos, Bebidas, Sobremesas)
- Selo de "Mais pedido" nos itens em destaque
- Botão que abre o WhatsApp com o pedido já escrito
- Layout responsivo (computador, tablet e celular)

## Tecnologias

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/)
- HTML e CSS (Flexbox)

## Como executar

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
# 1. Clonar o repositório
git clone https://github.com/SEU-USUARIO/cardapio-digital.git
cd cardapio-digital

# 2. Instalar as dependências
npm install

# 3. Rodar em modo de desenvolvimento
npm run dev
```

Depois acesse o endereço que aparecer no terminal (normalmente http://localhost:5173).

Para gerar a versão de produção:

```bash
npm run build
```

## Estrutura do projeto

```
cardapio-digital/
├── public/imagens/        # fotos dos produtos
├── src/
│   ├── components/
│   │   ├── Header.jsx         # topo com nome e horário
│   │   ├── Categorias.jsx     # botões de filtro
│   │   ├── ListaProdutos.jsx  # grade de produtos
│   │   ├── CardProduto.jsx    # card de um produto (reutilizável)
│   │   └── Footer.jsx         # endereço e contato
│   ├── data/produtos.js   # dados do cardápio
│   ├── App.jsx            # componente principal e estado do filtro
│   └── index.css          # cores, fontes e estilos globais
└── index.html
```

## Requisitos da disciplina atendidos

| Requisito | Onde está |
|---|---|
| Layout com HTML dividido em partes | `Header`, `Categorias`, `ListaProdutos`, `Footer` |
| Estilização de texto | `Header.css`, `CardProduto.css` (fontes, tamanhos, pesos) |
| Estilização de imagens | `CardProduto.css` (`object-fit`, zoom no hover, selo sobre a imagem) |
| Flexbox | `App.css`, `Categorias.css`, `ListaProdutos.css`, `CardProduto.css`, `Footer.css` |
| Aplicação React com HTML e CSS | Todo o projeto (Vite + React) |
| Componentes | `CardProduto` recebe dados por props e é reutilizado com `.map()` |

## Próximos passos (fase 2)

- Back-end com API REST para cadastrar, editar e excluir produtos
- Painel do dono com login
- Os dados de `src/data/produtos.js` passarão a vir da API (`GET /produtos`)
