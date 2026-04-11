import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '.env')

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
  console.log('✅ Environment variables loaded from server/.env')
} else {
  console.log('ℹ️  No server/.env found — using platform environment variables')
}
