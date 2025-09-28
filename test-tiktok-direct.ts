import { Database } from 'bun:sqlite'

const db = new Database('./auth.db')

// Get the TikTok account data
const account = db.query(`SELECT * FROM account WHERE providerId = 'tiktok'`).get()
console.log('Account data:', account)

// Get user data
const user = db.query(`SELECT * FROM user WHERE id = ?`).get(account.userId)
console.log('\nUser:', user)

// Call TikTok API with the access token
async function getTikTokProfile() {
  console.log('\nFetching TikTok profile...')
  console.log('Access token:', account.accessToken)
  console.log('Token expires at:', account.accessTokenExpiresAt)
  
  const response = await fetch(
    'https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name',
    {
      headers: {
        'Authorization': `Bearer ${account.accessToken}`
      }
    }
  )
  
  const data = await response.json()
  console.log('\nTikTok API Response:')
  console.log(JSON.stringify(data, null, 2))
  
  if (data.error && account.refreshToken) {
    console.log('\nToken might be expired, you may need to refresh it')
    console.log('Refresh token available:', account.refreshToken)
  }
}

await getTikTokProfile()
db.close()