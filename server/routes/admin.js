import { Router } from 'express'
import bcrypt from 'bcryptjs'
import auth, { adminOnly } from '../middleware/auth.js'
import db from '../db.js'

const router = Router()

// GET /api/admin/members
router.get('/members', auth, adminOnly, (req, res) => {
  try {
    const members = db.getAllMembers().map(({ password, ...m }) => m)
    res.json({ members })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

// POST /api/admin/membership — Grant membership
router.post('/membership', auth, adminOnly, (req, res) => {
  try {
    const { userId, plan, durationMonths } = req.body
    const user = db.findUserById(userId)
    if (!user) return res.status(404).json({ error: 'User not found.' })

    const now = new Date()
    const expiry = new Date(now)
    expiry.setMonth(expiry.getMonth() + (durationMonths || 1))

    db.updateUser(userId, {
      hasMembership: true,
      membershipPlan: plan,
      membershipStart: now.toISOString(),
      membershipExpiry: expiry.toISOString(),
    })

    res.json({ message: `${plan} membership granted to ${user.name} until ${expiry.toLocaleDateString()}.` })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

// POST /api/admin/checkin — Log entry for a member (1 per day max)
router.post('/checkin', auth, adminOnly, (req, res) => {
  try {
    const { userId, method } = req.body
    const user = db.findUserById(userId)
    if (!user) return res.status(404).json({ error: 'User not found.' })
    if (!user.hasMembership) return res.status(403).json({ error: 'User has no membership.' })
    if (db.hasEntryToday(user._id)) return res.status(400).json({ error: `${user.name} already has an entry for today.` })

    db.createLog({ userId: user._id, type: 'entry', method: method || 'rfid' })
    const totalVisits = db.getLogsByUser(user._id).filter(l => l.type === 'entry').length

    res.json({ message: `${user.name} entry logged. Total visits: ${totalVisits}` })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

// POST /api/admin/delete-member — Remove a member (requires admin password)
router.post('/delete-member', auth, adminOnly, async (req, res) => {
  try {
    const { userId, adminPassword } = req.body
    if (!userId || !adminPassword) return res.status(400).json({ error: 'Member ID and admin password required.' })

    // Verify admin password
    const admin = db.findUserById(req.user._id)
    const isMatch = await bcrypt.compare(adminPassword, admin.password)
    if (!isMatch) return res.status(403).json({ error: 'Incorrect admin password.' })

    const member = db.findUserById(userId)
    if (!member) return res.status(404).json({ error: 'Member not found.' })

    const memberName = member.name
    db.deleteUser(userId)

    res.json({ message: `${memberName} has been removed.` })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

// POST /api/admin/create-admin — One-time setup
router.post('/create-admin', async (req, res) => {
  try {
    const adminExists = db.findAdmin()
    if (adminExists) return res.status(400).json({ error: 'Admin already exists.' })

    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password required.' })
    }

    const hashed = await bcrypt.hash(password, 12)
    const user = db.createUser({ name, email, password: hashed, role: 'admin' })
    db.updateUser(user._id, { hasMembership: true })

    res.status(201).json({ message: 'Admin account created.', email: user.email })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

export default router
