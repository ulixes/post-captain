import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { cors } from 'hono/cors'

// Schemas for TikTok posting
const CreatorInfoSchema = z.object({
  creator_avatar_url: z.string(),
  creator_username: z.string(),
  creator_nickname: z.string(),
  privacy_level_options: z.array(z.string()),
  comment_disabled: z.boolean(),
  duet_disabled: z.boolean(),
  stitch_disabled: z.boolean(),
  max_video_post_duration_sec: z.number()
})

const PostInfoSchema = z.object({
  title: z.string().max(150).describe('Video title (required, max 150 chars)'),
  privacy_level: z.enum(['PUBLIC_TO_EVERYONE', 'MUTUAL_FOLLOW_FRIENDS', 'SELF_ONLY'])
    .default('PUBLIC_TO_EVERYONE')
    .describe('Privacy setting for the video'),
  disable_duet: z.boolean().default(false).describe('Disable duet feature'),
  disable_comment: z.boolean().default(false).describe('Disable comments'),
  disable_stitch: z.boolean().default(false).describe('Disable stitch feature'),
  video_cover_timestamp_ms: z.number().optional().describe('Thumbnail timestamp in milliseconds'),
  description: z.string().optional().describe('Video description/caption'),
  auto_add_music: z.boolean().default(false).describe('Automatically add music')
})

const VideoSourceInfoSchema = z.object({
  source: z.enum(['FILE_UPLOAD', 'PULL_FROM_URL'])
    .describe('FILE_UPLOAD: Upload file directly, PULL_FROM_URL: Provide video URL'),
  video_url: z.string().url().optional()
    .describe('HTTPS URL of video file (required for PULL_FROM_URL)'),
  video_size: z.number().optional()
    .describe('Size of video in bytes (required for FILE_UPLOAD)'),
  chunk_size: z.number().default(10000000).optional()
    .describe('Chunk size in bytes for FILE_UPLOAD (default: 10MB)'),
  total_chunk_count: z.number().default(1).optional()
    .describe('Number of chunks for FILE_UPLOAD (default: 1)')
})

const PhotoSourceInfoSchema = z.object({
  source: z.enum(['FILE_UPLOAD', 'PULL_FROM_URL']),
  photo_cover_index: z.number().optional(),
  photo_images: z.array(z.string())
})

const VideoInitResponseSchema = z.object({
  publish_id: z.string(),
  upload_url: z.string().optional()
})

const PhotoInitResponseSchema = z.object({
  publish_id: z.string()
})

const PostStatusSchema = z.object({
  status: z.string(),
  fail_reason: z.string().optional(),
  publicaly_available_post_id: z.array(z.string()).optional(),
  uploaded_bytes: z.number().optional()
})

// Create posting routes
export function createTikTokPostingRoutes(app: OpenAPIHono, getAccessToken: (headers: Headers) => Promise<string | null>) {
  
  // Query Creator Info
  const creatorInfoRoute = createRoute({
    method: 'post',
    path: '/api/tiktok/creator-info',
    tags: ['TikTok Posting'],
    summary: 'Query Creator Info',
    description: 'Get the latest information about the authenticated TikTok creator',
    security: [{
      cookieAuth: []
    }],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              data: CreatorInfoSchema
            })
          }
        },
        description: 'Creator info retrieved successfully'
      },
      401: {
        content: {
          'application/json': {
            schema: z.object({ error: z.string() })
          }
        },
        description: 'Not authenticated'
      }
    }
  })

  app.openapi(creatorInfoRoute, async (c) => {
    const accessToken = await getAccessToken(c.req.raw.headers)
    if (!accessToken) {
      return c.json({ error: 'Not authenticated' }, 401)
    }

    try {
      const response = await fetch('https://open.tiktokapis.com/v2/post/publish/creator_info/query/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })

      const data = await response.json()
      if (data.error?.code !== 'ok') {
        return c.json({ error: data.error.message || 'Failed to get creator info' }, 400)
      }

      return c.json({ data: data.data })
    } catch (error) {
      return c.json({ error: 'Failed to query creator info' }, 500)
    }
  })

  // Post Video
  const postVideoRoute = createRoute({
    method: 'post',
    path: '/api/tiktok/post-video',
    tags: ['TikTok Posting'],
    summary: 'Post Video to TikTok',
    description: 'Initiate video upload to TikTok',
    security: [{
      cookieAuth: []
    }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              post_info: PostInfoSchema,
              source_info: VideoSourceInfoSchema
            }),
            example: {
              post_info: {
                title: "My Amazing Video",
                privacy_level: "PUBLIC_TO_EVERYONE",
                disable_duet: false,
                disable_comment: false,
                disable_stitch: false,
                description: "Check out this cool video! #tiktok #video"
              },
              source_info: {
                source: "PULL_FROM_URL",
                video_url: "https://example.com/video.mp4"
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              data: VideoInitResponseSchema
            })
          }
        },
        description: 'Video post initiated successfully'
      },
      401: {
        content: {
          'application/json': {
            schema: z.object({ error: z.string() })
          }
        },
        description: 'Not authenticated'
      }
    }
  })

  app.openapi(postVideoRoute, async (c) => {
    const accessToken = await getAccessToken(c.req.raw.headers)
    if (!accessToken) {
      return c.json({ error: 'Not authenticated' }, 401)
    }

    const body = c.req.valid('json')

    try {
      const response = await fetch('https://open.tiktokapis.com/v2/post/publish/video/init/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(body)
      })

      const data = await response.json()
      console.log('TikTok API Response:', JSON.stringify(data, null, 2))
      
      if (data.error?.code !== 'ok') {
        return c.json({ 
          error: data.error.message || 'Failed to initiate video post',
          error_code: data.error.code,
          full_error: data.error,
          log_id: data.error.log_id
        }, 400)
      }

      return c.json({ data: data.data })
    } catch (error) {
      return c.json({ error: 'Failed to post video' }, 500)
    }
  })

  // Post Photos
  const postPhotosRoute = createRoute({
    method: 'post',
    path: '/api/tiktok/post-photos',
    tags: ['TikTok Posting'],
    summary: 'Post Photos to TikTok',
    description: 'Initiate photo upload to TikTok',
    security: [{
      cookieAuth: []
    }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              post_info: PostInfoSchema,
              source_info: PhotoSourceInfoSchema,
              post_mode: z.literal('DIRECT_POST'),
              media_type: z.literal('PHOTO')
            })
          }
        }
      }
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              data: PhotoInitResponseSchema
            })
          }
        },
        description: 'Photo post initiated successfully'
      },
      401: {
        content: {
          'application/json': {
            schema: z.object({ error: z.string() })
          }
        },
        description: 'Not authenticated'
      }
    }
  })

  app.openapi(postPhotosRoute, async (c) => {
    const accessToken = await getAccessToken(c.req.raw.headers)
    if (!accessToken) {
      return c.json({ error: 'Not authenticated' }, 401)
    }

    const body = c.req.valid('json')

    try {
      const response = await fetch('https://open.tiktokapis.com/v2/post/publish/content/init/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      const data = await response.json()
      if (data.error?.code !== 'ok') {
        return c.json({ error: data.error.message || 'Failed to initiate photo post' }, 400)
      }

      return c.json({ data: data.data })
    } catch (error) {
      return c.json({ error: 'Failed to post photos' }, 500)
    }
  })

  // Check Post Status
  const postStatusRoute = createRoute({
    method: 'post',
    path: '/api/tiktok/post-status',
    tags: ['TikTok Posting'],
    summary: 'Check Post Status',
    description: 'Check the status of a TikTok post',
    security: [{
      cookieAuth: []
    }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              publish_id: z.string()
            })
          }
        }
      }
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              data: PostStatusSchema
            })
          }
        },
        description: 'Post status retrieved successfully'
      },
      401: {
        content: {
          'application/json': {
            schema: z.object({ error: z.string() })
          }
        },
        description: 'Not authenticated'
      }
    }
  })

  app.openapi(postStatusRoute, async (c) => {
    const accessToken = await getAccessToken(c.req.raw.headers)
    if (!accessToken) {
      return c.json({ error: 'Not authenticated' }, 401)
    }

    const body = c.req.valid('json')

    try {
      const response = await fetch('https://open.tiktokapis.com/v2/post/publish/status/fetch/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(body)
      })

      const data = await response.json()
      if (data.error?.code !== 'ok') {
        return c.json({ error: data.error.message || 'Failed to get post status' }, 400)
      }

      return c.json({ data: data.data })
    } catch (error) {
      return c.json({ error: 'Failed to check post status' }, 500)
    }
  })

  // Upload Video File (for FILE_UPLOAD source)
  const uploadVideoRoute = createRoute({
    method: 'put',
    path: '/api/tiktok/upload-video',
    tags: ['TikTok Posting'],
    summary: 'Upload Video File',
    description: 'Upload video file to TikTok (used with FILE_UPLOAD source)',
    security: [{
      cookieAuth: []
    }],
    request: {
      body: {
        content: {
          'video/mp4': {
            schema: z.any()
          }
        }
      },
      query: z.object({
        upload_url: z.string()
      })
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              success: z.boolean()
            })
          }
        },
        description: 'Video uploaded successfully'
      }
    }
  })

  app.openapi(uploadVideoRoute, async (c) => {
    const { upload_url } = c.req.query()
    const videoData = await c.req.blob()

    try {
      const response = await fetch(upload_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Range': `bytes 0-${videoData.size - 1}/${videoData.size}`
        },
        body: videoData
      })

      if (!response.ok) {
        return c.json({ error: 'Failed to upload video' }, 400)
      }

      return c.json({ success: true })
    } catch (error) {
      return c.json({ error: 'Failed to upload video' }, 500)
    }
  })
}