import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { betterAuth } from 'better-auth'
import { Database } from 'bun:sqlite'
import { cors } from 'hono/cors'

// Load env vars
const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY || Bun.env.TIKTOK_CLIENT_KEY
const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET || Bun.env.TIKTOK_CLIENT_SECRET

console.log('TikTok Client Key:', TIKTOK_CLIENT_KEY ? 'Loaded' : 'Missing')
console.log('TikTok Client Secret:', TIKTOK_CLIENT_SECRET ? 'Loaded' : 'Missing')

// Create database
const db = new Database('./auth.db')

// Initialize Better Auth with TikTok provider
export const auth = betterAuth({
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  database: db as any,
  socialProviders: {
    tiktok: {
      clientKey: TIKTOK_CLIENT_KEY!,
      clientSecret: TIKTOK_CLIENT_SECRET!,
    }
  },
  trustedOrigins: [
    'http://localhost:3000',
    process.env.BASE_URL || 'http://localhost:3000'
  ].filter(Boolean)
})

// Create Hono app
const app = new Hono()

// Add CORS middleware for auth routes
app.use('/api/auth/*', cors({
  origin: ['http://localhost:3000', 'https://4d575ba248ac.ngrok-free.app'],
  credentials: true,
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Mount Better Auth routes
app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

// Custom endpoint to get TikTok user profile
app.get('/api/tiktok/profile', async (c) => {
  const sessionCookie = c.req.header('cookie')
  
  if (!sessionCookie) {
    return c.json({ error: 'No session cookie' }, 401)
  }

  // Parse session from cookie
  const session = await auth.api.getSession({
    headers: { cookie: sessionCookie }
  })

  if (!session?.session || !session.user) {
    return c.json({ error: 'Not authenticated' }, 401)
  }

  // Get the account info to retrieve access token
  const accounts = await auth.api.getAccounts({
    headers: { cookie: sessionCookie }
  })

  const tiktokAccount = accounts?.find(acc => acc.providerId === 'tiktok')
  
  if (!tiktokAccount?.accessToken) {
    return c.json({ error: 'No TikTok access token found' }, 404)
  }

  // Fetch TikTok user profile
  try {
    const response = await fetch(
      'https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name',
      {
        headers: {
          'Authorization': `Bearer ${tiktokAccount.accessToken}`
        }
      }
    )

    const data = await response.json()
    
    if (data.error?.code !== 'ok') {
      return c.json({ error: 'TikTok API error', details: data.error }, 500)
    }

    return c.json({
      profile: data.data.user,
      sessionUser: session.user
    })
  } catch (error) {
    return c.json({ error: 'Failed to fetch TikTok profile', details: error }, 500)
  }
})

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'tiktok-auth-api' })
})

// Start server
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`
console.log(`Server running on http://localhost:${port}`)
console.log(`Base URL: ${baseUrl}`)
console.log(`TikTok OAuth: ${baseUrl}/api/auth/sign-in/social?provider=tiktok`)

serve({
  fetch: app.fetch,
  port
})