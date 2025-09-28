import { serve } from '@hono/node-server'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { betterAuth } from 'better-auth'
import { Database } from 'bun:sqlite'
import { cors } from 'hono/cors'
import { createTikTokPostingRoutes } from './tiktok-posting'

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
      scope: ['user.info.profile', 'user.info.basic', 'video.publish', 'video.upload']
    }
  },
  trustedOrigins: [
    'http://localhost:3000',
    process.env.BASE_URL || 'http://localhost:3000'
  ].filter(Boolean)
})

// Create OpenAPI Hono app
const app = new OpenAPIHono()

// Add CORS middleware
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://4d575ba248ac.ngrok-free.app'],
  credentials: true,
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}))

// Mount Better Auth routes (these won't be in OpenAPI docs)
app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

// Define schemas
const ErrorSchema = z.object({
  error: z.string(),
  details: z.any().optional()
})

const HealthSchema = z.object({
  status: z.literal('ok'),
  service: z.string()
})

const OAuthInitSchema = z.object({
  provider: z.literal('tiktok')
})

const OAuthResponseSchema = z.object({
  url: z.string().url(),
  redirect: z.boolean()
})

const TikTokProfileSchema = z.object({
  open_id: z.string(),
  union_id: z.string(),
  avatar_url: z.string().url(),
  display_name: z.string()
})

const ProfileResponseSchema = z.object({
  profile: TikTokProfileSchema,
  sessionUser: z.object({
    id: z.string(),
    email: z.string().optional(),
    name: z.string().optional(),
    image: z.string().optional()
  })
})

// Health check route
const healthRoute = createRoute({
  method: 'get',
  path: '/health',
  tags: ['System'],
  summary: 'Health Check',
  description: 'Check if the API is running',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: HealthSchema,
        },
      },
      description: 'API is healthy',
    },
  },
})

app.openapi(healthRoute, (c) => {
  return c.json({
    status: 'ok' as const,
    service: 'tiktok-auth-api'
  })
})

// OAuth initiation route
const oauthInitRoute = createRoute({
  method: 'post',
  path: '/oauth/tiktok',
  tags: ['Authentication'],
  summary: 'Initiate TikTok OAuth',
  description: 'Start the TikTok OAuth flow and get the authorization URL',
  request: {
    body: {
      content: {
        'application/json': {
          schema: OAuthInitSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: OAuthResponseSchema,
        },
      },
      description: 'OAuth URL generated successfully',
    },
  },
})

app.openapi(oauthInitRoute, async (c) => {
  // Forward the request to Better Auth's internal handler
  const response = await fetch(`${process.env.BASE_URL || 'http://localhost:3000'}/api/auth/sign-in/social`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ provider: 'tiktok' }),
  })
  
  const data = await response.json()
  return c.json(data)
})

// Logout route
const logoutRoute = createRoute({
  method: 'post',
  path: '/api/auth/logout',
  tags: ['Authentication'],
  summary: 'Logout',
  description: 'Clear user session and logout',
  security: [{
    cookieAuth: []
  }],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            message: z.string()
          })
        }
      },
      description: 'Logout successful'
    }
  }
})

app.openapi(logoutRoute, async (c) => {
  try {
    await auth.api.signOut({
      headers: c.req.raw.headers
    })
    return c.json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    return c.json({ success: false, message: 'Logout failed' }, 500)
  }
})

// Session check route
const sessionRoute = createRoute({
  method: 'get',
  path: '/api/auth/session',
  tags: ['Authentication'],
  summary: 'Check Session',
  description: 'Check if user is authenticated and get session info',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            session: z.object({
              id: z.string(),
              userId: z.string(),
              expiresAt: z.string(),
            }).nullable(),
            user: z.object({
              id: z.string(),
              email: z.string().optional(),
              name: z.string().optional(),
              image: z.string().optional(),
            }).nullable(),
          }),
        },
      },
      description: 'Session info',
    },
  },
})

app.openapi(sessionRoute, async (c) => {
  // Use c.req.raw.headers for Better Auth
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  })

  if (!session) {
    return c.json({ session: null, user: null })
  }

  return c.json({
    session: session.session,
    user: session.user
  })
})

// TikTok profile route
const profileRoute = createRoute({
  method: 'get',
  path: '/api/tiktok/profile',
  tags: ['User Profile'],
  summary: 'Get TikTok Profile',
  description: 'Fetch the authenticated user\'s TikTok profile information',
  security: [{
    cookieAuth: []
  }],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ProfileResponseSchema,
        },
      },
      description: 'Profile fetched successfully',
    },
    401: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Not authenticated',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'No TikTok access token found',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Failed to fetch profile',
    },
  },
})

app.openapi(profileRoute, async (c) => {
  // Parse session using c.req.raw.headers
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  })

  if (!session?.session || !session.user) {
    return c.json({ error: 'Not authenticated' }, 401)
  }

  // Use Better Auth's getAccessToken API - it handles refresh automatically
  try {
    const tokenResponse = await auth.api.getAccessToken({
      body: {
        providerId: 'tiktok'
      },
      headers: c.req.raw.headers
    })
    
    if (!tokenResponse?.accessToken) {
      return c.json({ error: 'No TikTok access token found' }, 404)
    }

    // Fetch TikTok user profile with the fresh token
    const response = await fetch(
      'https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name',
      {
        headers: {
          'Authorization': `Bearer ${tokenResponse.accessToken}`
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

// Add TikTok posting routes
const getAccessToken = async (headers: Headers): Promise<string | null> => {
  const session = await auth.api.getSession({ headers })
  if (!session?.user) return null
  
  try {
    const tokenResponse = await auth.api.getAccessToken({
      body: { providerId: 'tiktok' },
      headers
    })
    return tokenResponse?.accessToken || null
  } catch {
    return null
  }
}

createTikTokPostingRoutes(app, getAccessToken)

// Add OpenAPI documentation
app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'TikTok Auth API',
    description: 'Headless TikTok authentication API built with Better Auth and Hono',
  },
  servers: [
    {
      url: process.env.BASE_URL || 'http://localhost:3000',
      description: 'Current server'
    }
  ],
  tags: [
    {
      name: 'System',
      description: 'System endpoints'
    },
    {
      name: 'Authentication', 
      description: 'OAuth authentication endpoints'
    },
    {
      name: 'User Profile',
      description: 'User profile endpoints'
    },
    {
      name: 'TikTok Posting',
      description: 'Content posting endpoints for TikTok'
    }
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'better-auth.session_token',
        description: 'Session cookie from Better Auth'
      }
    }
  }
})

// Serve Scalar documentation UI
app.get('/docs', apiReference({
  spec: {
    url: '/openapi.json'
  },
  theme: 'purple',
  pageTitle: 'TikTok Auth API Documentation',
}))

// Redirect root to docs
app.get('/', (c) => c.redirect('/docs'))

// Start server
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`
console.log(`Server running on http://localhost:${port}`)
console.log(`Base URL: ${baseUrl}`)
console.log(`API Documentation: ${baseUrl}/docs`)
console.log(`OpenAPI Spec: ${baseUrl}/openapi.json`)
console.log(`TikTok OAuth: ${baseUrl}/api/auth/sign-in/social`)

serve({
  fetch: app.fetch,
  port
})