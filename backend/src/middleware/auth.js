import jwt from 'jsonwebtoken'

// Protege rotas: exige o header "Authorization: Bearer <token>"
export function exigirLogin(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '')
  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ erro: 'Não autorizado. Faça login.' })
  }
}
