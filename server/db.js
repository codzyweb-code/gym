import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, 'database.json')

// Helper to interact with the JSON file
const fetchStore = () => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial = { users: [], accessLogs: [] }
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2))
      return initial
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
  } catch (err) {
    console.error('❌ Error reading database.json:', err)
    return { users: [], accessLogs: [] }
  }
}

const saveStore = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('❌ Error writing to database.json:', err)
  }
}

const db = {
  // ---- USERS ----
  async findUserByEmail(email) {
    const { users } = fetchStore()
    return users.find(u => u.email.toLowerCase() === email.toLowerCase())
  },

  async findUserById(id) {
    const { users } = fetchStore()
    return users.find(u => u._id === id)
  },

  async createUser({ name, email, password, phone, role }) {
    const store = fetchStore()
    const user = {
      _id: crypto.randomUUID(),
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      hasMembership: false,
      membershipPlan: '',
      role: role || 'member',
      isInsideGym: false,
      createdAt: new Date().toISOString()
    }
    store.users.push(user)
    saveStore(store)
    return user
  },

  async updateUser(id, updates) {
    const store = fetchStore()
    const index = store.users.findIndex(u => u._id === id)
    if (index === -1) return null
    
    // Maintain _id and merge updates
    store.users[index] = { ...store.users[index], ...updates, _id: id }
    saveStore(store)
    return store.users[index]
  },

  async getAllMembers() {
    const { users } = fetchStore()
    return users.filter(u => u.role === 'member')
  },

  async findAdmin() {
    const { users } = fetchStore()
    return users.find(u => u.role === 'admin')
  },

  // ---- ACCESS LOGS ----
  async createLog({ userId, type, method }) {
    const store = fetchStore()
    const log = {
      _id: crypto.randomUUID(),
      userId,
      type,
      method: method || 'manual',
      timestamp: new Date().toISOString()
    }
    store.accessLogs.push(log)
    saveStore(store)
    return log
  },

  async getLogsByUser(userId) {
    const { accessLogs } = fetchStore()
    return accessLogs
      .filter(l => l.userId === userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  },

  async countEntriesThisMonth(userId) {
    const { accessLogs } = fetchStore()
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    return accessLogs.filter(l => 
      l.userId === userId && 
      l.type === 'entry' && 
      new Date(l.timestamp) >= startOfMonth
    ).length
  },

  async hasEntryToday(userId) {
    const { accessLogs } = fetchStore()
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    const nextDay = startOfDay + (24 * 60 * 60 * 1000)

    return accessLogs.some(l => {
      const ts = new Date(l.timestamp).getTime()
      return l.userId === userId && l.type === 'entry' && ts >= startOfDay && ts < nextDay
    })
  },

  async hasEntryOnDate(userId, dateStr) {
    const { accessLogs } = fetchStore()
    const targetDate = new Date(dateStr)
    const dayStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime()
    const dayEnd = dayStart + (24 * 60 * 60 * 1000)

    return accessLogs.some(l => {
      const ts = new Date(l.timestamp).getTime()
      return l.userId === userId && l.type === 'entry' && ts >= dayStart && ts < dayEnd
    })
  },

  async deleteUser(id) {
    const store = fetchStore()
    const initialCount = store.users.length
    store.users = store.users.filter(u => u._id !== id)
    
    if (store.users.length === initialCount) return false
    
    // Also remove their access logs
    store.accessLogs = store.accessLogs.filter(l => l.userId !== id)
    saveStore(store)
    return true
  },
}

export default db
