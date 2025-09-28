# Re-authentication Required

The TikTok OAuth scopes have been updated to include video publishing permissions. You need to re-authenticate to grant these new permissions.

## Steps to Re-authenticate:

1. **Clear your current session** (if logged in):
   ```
   POST https://4d575ba248ac.ngrok-free.app/api/auth/logout
   ```

2. **Start new OAuth flow with updated scopes**:
   ```
   POST https://4d575ba248ac.ngrok-free.app/api/auth/sign-in/social
   Body: { "provider": "tiktok" }
   ```

3. **Visit the returned URL** to authorize with TikTok
   - You'll be asked to grant additional permissions:
     - `video.publish` - Post videos to TikTok
     - `video.upload` - Upload video content

4. **After authorization**, you'll be redirected back and can use:
   - `/api/tiktok/post-video` - Post videos
   - `/api/tiktok/post-photos` - Post photos
   - `/api/tiktok/creator-info` - Get creator info
   - `/api/tiktok/post-status` - Check post status

## API Documentation

Visit https://4d575ba248ac.ngrok-free.app/docs for full API documentation.

## Current Scopes

The application now requests these TikTok scopes:
- `user.info.profile` - Basic profile information
- `user.info.basic` - User details
- `video.publish` - **NEW** - Publish videos
- `video.upload` - **NEW** - Upload video content