# Auth

Types:

- <code><a href="./src/resources/auth.ts">AuthSignInWithSocialResponse</a></code>
- <code><a href="./src/resources/auth.ts">AuthSignOutResponse</a></code>

Methods:

- <code title="post /api/auth/sign-in/social">client.auth.<a href="./src/resources/auth.ts">signInWithSocial</a>({ ...params }) -> AuthSignInWithSocialResponse</code>
- <code title="post /api/auth/sign-out">client.auth.<a href="./src/resources/auth.ts">signOut</a>({ ...params }) -> AuthSignOutResponse</code>

# Session

Types:

- <code><a href="./src/resources/session.ts">SessionRetrieveResponse</a></code>

Methods:

- <code title="get /api/session">client.session.<a href="./src/resources/session.ts">retrieve</a>({ ...params }) -> SessionRetrieveResponse</code>

# Profile

Types:

- <code><a href="./src/resources/profile.ts">ProfileRetrieveResponse</a></code>

Methods:

- <code title="get /api/profile">client.profile.<a href="./src/resources/profile.ts">retrieve</a>({ ...params }) -> ProfileRetrieveResponse</code>
