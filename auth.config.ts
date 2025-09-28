import { betterAuth } from 'better-auth'
import Database from 'better-sqlite3'

const db = new Database('./auth.db')

export const auth = betterAuth({
  database: db,
  socialProviders: {
    tiktok: {
      clientId: process.env.TIKTOK_CLIENT_KEY || 'placeholder',
      clientSecret: process.env.TIKTOK_CLIENT_SECRET || 'placeholder',
    }
  },
})