import jwt from 'jsonwebtoken'
import db from '../db.js'

export default function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'No token provided' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 's4fitness_jwt_secret_key_2026')
    const user = db.findUserById(decoded.id)
    if (!user) return res.status(401).json({ error: 'User not found' })

    // Don't pass password
    const { password, ...safeUser } = user
    req.user = safeUser
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}
