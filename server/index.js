import './loadEnv.js'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'
import next from 'next'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')

import authRoutes from './routes/auth.js'
import accessRoutes from './routes/access.js'
import adminRoutes from './routes/admin.js'

const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000

// ── Initialize Next.js ─────────────────────────────────────
const nextApp = next({ dev, dir: projectRoot })
const nextHandle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  // ── Security Middleware ─────────────────────────────────────
  // Helmet sets secure HTTP headers (CSP, HSTS, X-Frame-Options, etc.)
  app.use(helmet({
    contentSecurityPolicy: false, // Let Next.js handle CSP on the frontend
    crossOriginEmbedderPolicy: false,
  }))

  // Health check — placed early so it always works even if middleware or DB fails
  app.get('/health', (req, res) => {
    console.log(`[${new Date().toISOString()}] Health check pinged`)
    res.status(200).send('OK')
  })

  // Using local JSON database storage (server/database.json)
  console.log('✅ Local JSON Database initialized')

  // ── Core Middleware ─────────────────────────────────────────
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
  })
  app.use(cors({ origin: true, credentials: true }))
  app.use(express.json({ limit: '1mb' })) // Limit body size to prevent abuse

  // ── API Routes ────────────────────────────────────────────
  app.use('/api/auth', authRoutes)
  app.use('/api/access', accessRoutes)
  app.use('/api/admin', adminRoutes)

  // API status (internal check)
  app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

  // ── Next.js handles everything else ───────────────────────
  app.use((req, res) => {
    return nextHandle(req, res)
  })

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 S4 Fitness running on http://0.0.0.0:${PORT}`)
    console.log(`📁 Using local JSON database at server/database.json`)
    console.log(`🌍 Mode: ${dev ? 'development' : 'production'}`)
  })
})
