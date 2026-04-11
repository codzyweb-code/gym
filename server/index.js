import './loadEnv.js'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

import authRoutes from './routes/auth.js'
import accessRoutes from './routes/access.js'
import adminRoutes from './routes/admin.js'

const app = express()
const PORT = process.env.API_PORT || 2011

// ── Security Middleware ─────────────────────────────────────
// Helmet sets secure HTTP headers (CSP, HSTS, X-Frame-Options, etc.)
app.use(helmet({
  contentSecurityPolicy: false, // Let Next.js handle CSP on the frontend
  crossOriginEmbedderPolicy: false,
}))

// Health check (Public - Keep Render alive)
// Placed at the very top to ensure it always works even if middleware or DB fails
app.get('/health', (req, res) => {
  console.log(`[${new Date().toISOString()}] Health check pinged`)
  res.status(200).send('OK')
})

// Root route — friendly status instead of "Cannot GET /"
app.get('/', (req, res) => {
  res.json({ service: 'S4 Fitness API', status: 'running', time: new Date().toISOString() })
})

// Using local JSON database storage (server/database.json)
console.log('✅ Local JSON Database initialized')

// ── Core Middleware ─────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'], credentials: true }))
app.use(express.json({ limit: '1mb' })) // Limit body size to prevent abuse

// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/access', accessRoutes)
app.use('/api/admin', adminRoutes)

// API status (internal check)
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

app.listen(PORT, () => {
  console.log(`🚀 S4 Fitness API running on http://localhost:${PORT}`)
  console.log(`📁 Using local JSON database at server/database.json`)
})
