import { Router } from 'express'
import multer from 'multer'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { exigirLogin } from '../middleware/auth.js'

// Só aceitamos imagens. A extensão vem do tipo do arquivo, não do nome enviado.
const EXTENSOES = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' }

const upload = multer({
  storage: multer.diskStorage({
    destination: fileURLToPath(new URL('../../uploads/', import.meta.url)),
    filename: (req, file, cb) => cb(null, crypto.randomUUID() + EXTENSOES[file.mimetype]),
  }),
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB
  fileFilter: (req, file, cb) => cb(null, file.mimetype in EXTENSOES),
})

const router = Router()

// POST /api/upload (admin) — campo "imagem" -> { imagem: "uploads/<arquivo>" }
router.post('/upload', exigirLogin, (req, res) => {
  upload.single('imagem')(req, res, (err) => {
    if (err?.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ erro: 'Imagem muito grande (máximo 3 MB).' })
    if (err) return res.status(400).json({ erro: 'Erro ao enviar a imagem.' })
    if (!req.file) return res.status(400).json({ erro: 'Envie uma imagem JPG, PNG ou WebP.' })
    res.status(201).json({ imagem: `uploads/${req.file.filename}` })
  })
})

export default router
