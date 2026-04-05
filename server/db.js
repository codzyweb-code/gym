import User from './models/User.js'
import AccessLog from './models/AccessLog.js'

const db = {
  // ---- USERS ----
  async findUserByEmail(email) {
    return await User.findOne({ email: email.toLowerCase() })
  },

  async findUserById(id) {
    return await User.findById(id)
  },

  async createUser({ name, email, password, phone, role }) {
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      role: role || 'member'
    })
    return await user.save()
  },

  async updateUser(id, updates) {
    return await User.findByIdAndUpdate(id, updates, { new: true })
  },

  async getAllMembers() {
    return await User.find({ role: 'member' })
  },

  async findAdmin() {
    return await User.findOne({ role: 'admin' })
  },

  // ---- ACCESS LOGS ----
  async createLog({ userId, type, method }) {
    const log = new AccessLog({
      userId,
      type,
      method: method || 'manual'
    })
    return await log.save()
  },

  async getLogsByUser(userId) {
    return await AccessLog.find({ userId }).sort({ timestamp: -1 })
  },

  async countEntriesThisMonth(userId) {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    return await AccessLog.countDocuments({
      userId,
      type: 'entry',
      timestamp: { $gte: startOfMonth }
    })
  },

  async hasEntryToday(userId) {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfDay = new Date(startOfDay)
    endOfDay.setDate(endOfDay.getDate() + 1)

    const entry = await AccessLog.findOne({
      userId,
      type: 'entry',
      timestamp: { $gte: startOfDay, $lt: endOfDay }
    })
    return !!entry
  },

  async hasEntryOnDate(userId, dateStr) {
    const dayStart = new Date(dateStr)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(dayStart)
    dayEnd.setDate(dayEnd.getDate() + 1)

    const entry = await AccessLog.findOne({
      userId,
      type: 'entry',
      timestamp: { $gte: dayStart, $lt: dayEnd }
    })
    return !!entry
  },

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id)
    if (!user) return false
    // Also remove their access logs
    await AccessLog.deleteMany({ userId: id })
    return true
  },
}

export default db
