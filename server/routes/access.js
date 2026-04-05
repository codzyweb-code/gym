import { Router } from 'express'
import auth from '../middleware/auth.js'
import db from '../db.js'

const router = Router()

// POST /api/access/checkin — Log gym entry (RFID scan)
router.post('/checkin', auth, async (req, res) => {
  try {
    const user = await db.findUserById(req.user._id)
    if (!user.hasMembership) return res.status(403).json({ error: 'No active membership. Please purchase a plan.' })
    if (await db.hasEntryToday(user._id)) return res.status(400).json({ error: 'Already logged entry for today.' })

    await db.createLog({ userId: user._id, type: 'entry', method: req.body.method || 'rfid' })

    res.json({ message: 'Entry logged successfully.' })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

// GET /api/access/stats — Get member stats (entry-only)
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user._id

    // Visits this month
    const visitsThisMonth = await db.countEntriesThisMonth(userId)

    // Total visits (all time)
    const allLogs = (await db.getLogsByUser(userId)).filter(l => l.type === 'entry')
    const totalVisits = allLogs.length

    // Current streak — consecutive days with at least 1 entry
    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let checkDate = new Date(today)
    while (true) {
      if (await db.hasEntryOnDate(userId, checkDate.toISOString())) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    res.json({ visitsThisMonth, totalVisits, streak })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error.' })
  }
})

// GET /api/access/history — Recent entry logs
router.get('/history', auth, async (req, res) => {
  try {
    const entries = (await db.getLogsByUser(req.user._id))
      .filter(l => l.type === 'entry')
      .reverse()
      .slice(0, 15)

    const sessions = entries.map(log => {
      const d = new Date(log.timestamp)
      return {
        date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        method: log.method,
      }
    })

    res.json({ sessions })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

export default router
