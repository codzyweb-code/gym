import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, default: '' },
  rfidTag: { type: String, unique: true, sparse: true },

  // Membership
  hasMembership: { type: Boolean, default: false },
  membershipPlan: { type: String, enum: ['Starter', 'Pro', 'Elite', ''], default: '' },
  membershipStart: { type: Date },
  membershipExpiry: { type: Date },

  // Role
  role: { type: String, enum: ['member', 'admin'], default: 'member' },

  // Current gym status
  isInsideGym: { type: Boolean, default: false },
}, { timestamps: true })

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', userSchema)
