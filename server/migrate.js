import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import AccessLog from './models/AccessLog.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })

const DB_PATH = path.join(__dirname, 'database.json')

async function migrate() {
  try {
    console.log('🚀 Starting Migration...')

    if (!fs.existsSync(DB_PATH)) {
      console.log('ℹ️ No database.json found. Skipping migration.')
      process.exit(0)
    }

    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing data to avoid duplicates if re-run
    await User.deleteMany({})
    await AccessLog.deleteMany({})
    console.log('🗑️ Cleared existing collections')

    const idMap = {}

    // 1. Migrate Users
    console.log(`👥 Migrating ${data.users.length} users...`)
    for (const u of data.users) {
      const userData = {
        _id: new mongoose.Types.ObjectId(),
        name: u.name,
        email: u.email,
        password: u.password,
        phone: u.phone || '',
        hasMembership: u.hasMembership || false,
        membershipPlan: u.membershipPlan || '',
        membershipStart: u.membershipStart,
        membershipExpiry: u.membershipExpiry,
        role: u.role || 'member',
        isInsideGym: u.isInsideGym || false,
        createdAt: u.createdAt || new Date()
      }
      
      // Only add rfidTag if it's not null to maintain uniqueness with sparse index
      if (u.rfidTag) {
        userData.rfidTag = u.rfidTag
      }

      await User.collection.insertOne(userData)
      idMap[u._id] = userData._id
    }
    console.log('✅ Users migrated.')

    // 2. Migrate Access Logs
    console.log(`📝 Migrating ${data.accessLogs.length} access logs...`)
    const logsToInsert = []
    for (const l of data.accessLogs) {
      const newUserId = idMap[l.userId]
      if (!newUserId) {
        console.warn(`⚠️ Skipping log ${l._id}: User ${l.userId} not found in map.`)
        continue
      }
      logsToInsert.push({
        userId: newUserId,
        type: l.type,
        method: l.method,
        timestamp: l.timestamp ? new Date(l.timestamp) : new Date()
      })
    }
    
    if (logsToInsert.length > 0) {
      await AccessLog.insertMany(logsToInsert)
    }
    console.log('✅ Access logs migrated.')

    console.log('🎉 Migration completed successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Migration failed:', err)
    process.exit(1)
  }
}

migrate()
