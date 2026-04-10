import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from '../db.js'
import auth from '../middleware/auth.js'

const router = Router()

// JWT secret — crash immediately if not configured (no fallback!)
const getSecret = () => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('FATAL: JWT_SECRET environment variable is not set. Server cannot sign tokens.')
  }
  return secret
}

const signToken = (id) => jwt.sign({ id }, getSecret(), { expiresIn: '30d' })

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' })
    }

    const exists = await db.findUserByEmail(email)
    if (exists) return res.status(400).json({ error: 'Email already registered.' })

    const hashed = await bcrypt.hash(password, 12)
    const user = await db.createUser({ name, email, password: hashed, phone })
    const token = signToken(user._id)

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, hasMembership: user.hasMembership, role: user.role }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    const user = await db.findUserByEmail(email)
    if (!user) return res.status(400).json({ error: 'Invalid email or password.' })

    const isMatch = user.isEnvAdmin
      ? password === process.env.ADMIN_PASSWORD
      : await bcrypt.compare(password, user.password)
      
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password.' })

    const token = signToken(user._id)

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        hasMembership: user.hasMembership,
        membershipPlan: user.membershipPlan,
        membershipExpiry: user.membershipExpiry,
        role: user.role,
        isInsideGym: user.isInsideGym,
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

// GET /api/auth/me
router.get('/me', auth, (req, res) => {
  res.json({ user: req.user })
})

export default router
