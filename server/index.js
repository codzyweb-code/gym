import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

import authRoutes from './routes/auth.js'
import accessRoutes from './routes/access.js'
import adminRoutes from './routes/admin.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 2011

// Health check (Public - Keep Render alive)
// Placed at the very top to ensure it always works even if middleware or DB fails
app.get('/health', (req, res) => {
  console.log(`[${new Date().toISOString()}] Health check pinged`)
  res.status(200).send('OK')
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err))

// Middleware
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'], credentials: true }))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/access', accessRoutes)
app.use('/api/admin', adminRoutes)

// API status (internal check)
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

// Serve frontend in production


app.listen(PORT, () => {
  console.log(`🚀 S4 Fitness API running on http://localhost:${PORT}`)
  console.log(`📁 Using local JSON database at server/database.json`)
})
