# Health

Types:

- <code><a href="./src/resources/health.ts">HealthCheckResponse</a></code>

Methods:

- <code title="get /health">client.health.<a href="./src/resources/health.ts">check</a>() -> HealthCheckResponse</code>

# OAuth

Types:

- <code><a href="./src/resources/oauth.ts">OAuthInitiateTiktokResponse</a></code>

Methods:

- <code title="post /oauth/tiktok">client.oauth.<a href="./src/resources/oauth.ts">initiateTiktok</a>({ ...params }) -> OAuthInitiateTiktokResponse</code>

# API

## Auth

Types:

- <code><a href="./src/resources/api/auth.ts">AuthCheckSessionResponse</a></code>
- <code><a href="./src/resources/api/auth.ts">AuthLogoutResponse</a></code>

Methods:

- <code title="get /api/auth/session">client.api.auth.<a href="./src/resources/api/auth.ts">checkSession</a>() -> AuthCheckSessionResponse</code>
- <code title="post /api/auth/logout">client.api.auth.<a href="./src/resources/api/auth.ts">logout</a>() -> AuthLogoutResponse</code>

## Tiktok

Types:

- <code><a href="./src/resources/api/tiktok.ts">TiktokCheckPostStatusResponse</a></code>
- <code><a href="./src/resources/api/tiktok.ts">TiktokGetProfileResponse</a></code>
- <code><a href="./src/resources/api/tiktok.ts">TiktokPostPhotosResponse</a></code>
- <code><a href="./src/resources/api/tiktok.ts">TiktokPostVideoResponse</a></code>
- <code><a href="./src/resources/api/tiktok.ts">TiktokQueryCreatorInfoResponse</a></code>
- <code><a href="./src/resources/api/tiktok.ts">TiktokUploadVideoFileResponse</a></code>

Methods:

- <code title="post /api/tiktok/post-status">client.api.tiktok.<a href="./src/resources/api/tiktok.ts">checkPostStatus</a>({ ...params }) -> TiktokCheckPostStatusResponse</code>
- <code title="get /api/tiktok/profile">client.api.tiktok.<a href="./src/resources/api/tiktok.ts">getProfile</a>() -> TiktokGetProfileResponse</code>
- <code title="post /api/tiktok/post-photos">client.api.tiktok.<a href="./src/resources/api/tiktok.ts">postPhotos</a>({ ...params }) -> TiktokPostPhotosResponse</code>
- <code title="post /api/tiktok/post-video">client.api.tiktok.<a href="./src/resources/api/tiktok.ts">postVideo</a>({ ...params }) -> TiktokPostVideoResponse</code>
- <code title="post /api/tiktok/creator-info">client.api.tiktok.<a href="./src/resources/api/tiktok.ts">queryCreatorInfo</a>() -> TiktokQueryCreatorInfoResponse</code>
- <code title="put /api/tiktok/upload-video">client.api.tiktok.<a href="./src/resources/api/tiktok.ts">uploadVideoFile</a>(body, { ...params }) -> TiktokUploadVideoFileResponse</code>
