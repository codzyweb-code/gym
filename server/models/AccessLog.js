import mongoose from 'mongoose'

const accessLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['entry', 'exit'], required: true },
  method: { type: String, enum: ['rfid', 'biometric', 'manual'], default: 'manual' },
  timestamp: { type: Date, default: Date.now },
})

// Index for fast queries
accessLogSchema.index({ userId: 1, timestamp: -1 })

export default mongoose.model('AccessLog', accessLogSchema)
