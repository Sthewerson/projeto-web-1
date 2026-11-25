import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../db.js'

const router = Router()

// POST /api/login  { usuario, senha } -> { token }
router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body || {}
  if (!usuario || !senha) {
    return res.status(400).json({ erro: 'Informe usuário e senha.' })
  }
  const [linhas] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario])
  const u = linhas[0]
  if (!u || !(await bcrypt.compare(senha, u.senha_hash))) {
    return res.status(401).json({ erro: 'Usuário ou senha incorretos.' })
  }
  const token = jwt.sign({ id: u.id, usuario: u.usuario }, process.env.JWT_SECRET, { expiresIn: '8h' })
  res.json({ token })
})

export default router
