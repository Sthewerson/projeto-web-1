import express from 'express'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import 'dotenv/config'
import produtosRouter from './routes/produtos.js'
import uploadRouter from './routes/upload.js'
import authRouter from './routes/auth.js'

if (!process.env.JWT_SECRET) {
  console.error('Defina JWT_SECRET no arquivo .env')
  process.exit(1)
}

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', authRouter)
app.use('/api', produtosRouter)
app.use('/api', uploadRouter)

// Fotos enviadas pelo painel
app.use('/uploads', express.static(fileURLToPath(new URL('../uploads', import.meta.url))))

// Erros inesperados (ex.: banco fora do ar)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ erro: 'Erro interno do servidor.' })
})

const porta = process.env.PORT || 3001
app.listen(porta, () => console.log(`API rodando em http://localhost:${porta}`))
