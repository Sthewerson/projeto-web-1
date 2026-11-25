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

- Front-end: [React](https://react.dev/) 18, [Vite](https://vitejs.dev/), React Router, React Icons
- Back-end: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- Banco de dados: [MySQL](https://www.mysql.com/) (driver `mysql2`)
- Autenticação do dono: JWT + senha com hash (`bcryptjs`)

## Como executar

Pré-requisitos: Node.js 18+ e MySQL em execução.

```bash
# 1. Clonar o repositório
git clone https://github.com/SEU-USUARIO/cardapio-digital.git
cd cardapio-digital

# 2. Back-end: instalar, configurar e criar o banco
cd backend
npm install
cp .env.example .env     # edite com a senha do seu MySQL e o login do admin
npm run setup            # cria banco, tabelas, produtos iniciais e o usuário admin
npm run dev              # API em http://localhost:3001

# 3. Front-end (em outro terminal, na raiz do projeto)
npm install
npm run dev              # http://localhost:5173
```

O Vite redireciona as chamadas `/api` para a API na porta 3001.
O painel do dono fica em `/admin` (use o `ADMIN_USUARIO` e `ADMIN_SENHA` do `.env`).

## API

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| GET | `/api/produtos` | público | Lista produtos (`?categoria=Lanches` filtra) |
| GET | `/api/categorias` | público | Lista categorias |
| POST | `/api/login` | público | Recebe `{usuario, senha}` e devolve `{token}` |
| POST | `/api/produtos` | admin | Cadastra produto |
| PUT | `/api/produtos/:id` | admin | Edita produto |
| DELETE | `/api/produtos/:id` | admin | Exclui produto |

Rotas de admin exigem o header `Authorization: Bearer <token>`.

## Estrutura do projeto

```
cardapio-digital/
├── backend/
│   ├── sql/schema.sql       # tabelas: categorias, produtos, usuarios
│   ├── scripts/setup.js     # cria o banco e os dados iniciais
│   └── src/
│       ├── server.js        # Express
│       ├── db.js            # pool de conexões MySQL
│       ├── middleware/auth.js
│       └── routes/          # produtos.js, auth.js
├── public/imagens/          # fotos dos produtos
└── src/                     # front-end React
    ├── pages/               # Home, Login, Admin
    ├── components/          # Header, Categorias, ListaProdutos, CardProduto, FormProduto, Footer
    └── services/api.js      # chamadas à API
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

| Requisito (fase 2) | Onde está |
|---|---|
| Rotas para diferentes páginas | `App.jsx` (`/`, `/admin/login`, `/admin`) |
| Biblioteca de ícones | `react-icons` em `Header`, `Login`, `Admin` |
| `onChange` e `onClick` | `Login.jsx`, `FormProduto.jsx`, `Admin.jsx`, `Categorias.jsx` |
| `useState` e renderização condicional | `Home.jsx` (carregando/erro), `Admin.jsx` (formulário aberto/fechado, redirecionamento sem login) |
| Conexão com banco de dados | `backend/src/db.js` + `routes/produtos.js` (MySQL) |
