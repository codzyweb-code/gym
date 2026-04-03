import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { randomUUID } from 'crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, 'database.json')

// Initialize DB structure
const defaultDB = { users: [], accessLogs: [] }

function read() {
  try {
    if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify(defaultDB, null, 2))
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
  } catch {
    return { ...defaultDB }
  }
}

function write(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2))
}

const db = {
  // ---- USERS ----
  findUserByEmail(email) {
    return read().users.find(u => u.email === email.toLowerCase()) || null
  },

  findUserById(id) {
    return read().users.find(u => u._id === id) || null
  },

  createUser({ name, email, password, phone, role }) {
    const data = read()
    const user = {
      _id: randomUUID(),
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      rfidTag: null,
      hasMembership: false,
      membershipPlan: '',
      membershipStart: null,
      membershipExpiry: null,
      role: role || 'member',
      isInsideGym: false,
      createdAt: new Date().toISOString(),
    }
    data.users.push(user)
    write(data)
    return user
  },

  updateUser(id, updates) {
    const data = read()
    const idx = data.users.findIndex(u => u._id === id)
    if (idx === -1) return null
    data.users[idx] = { ...data.users[idx], ...updates }
    write(data)
    return data.users[idx]
  },

  getAllMembers() {
    return read().users.filter(u => u.role === 'member')
  },

  findAdmin() {
    return read().users.find(u => u.role === 'admin') || null
  },

  // ---- ACCESS LOGS ----
  createLog({ userId, type, method }) {
    const data = read()
    const log = {
      _id: randomUUID(),
      userId,
      type,
      method: method || 'manual',
      timestamp: new Date().toISOString(),
    }
    data.accessLogs.push(log)
    write(data)
    return log
  },

  getLogsByUser(userId) {
    return read().accessLogs.filter(l => l.userId === userId).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  },

  countEntriesThisMonth(userId) {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    return read().accessLogs.filter(l => l.userId === userId && l.type === 'entry' && l.timestamp >= startOfMonth).length
  },

  hasEntryToday(userId) {
    const now = new Date()
    const todayStr = now.toISOString()
    return this.hasEntryOnDate(userId, todayStr)
  },

  hasEntryOnDate(userId, dateStr) {
    const dayStart = new Date(dateStr)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(dayStart)
    dayEnd.setDate(dayEnd.getDate() + 1)
    return read().accessLogs.some(l =>
      l.userId === userId && l.type === 'entry' &&
      new Date(l.timestamp) >= dayStart && new Date(l.timestamp) < dayEnd
    )
  },

  deleteUser(id) {
    const data = read()
    const idx = data.users.findIndex(u => u._id === id)
    if (idx === -1) return false
    data.users.splice(idx, 1)
    // Also remove their access logs
    data.accessLogs = data.accessLogs.filter(l => l.userId !== id)
    write(data)
    return true
  },
}

export default db
