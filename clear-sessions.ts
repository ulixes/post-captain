import { Database } from 'bun:sqlite'

const db = new Database('./auth.db')

// Clear all sessions
console.log('Clearing all sessions...')
const result = db.query("DELETE FROM session").run()
console.log(`Deleted ${result.changes} sessions`)

// Show remaining data
const users = db.query("SELECT * FROM user").all()
console.log('\nRemaining users:', users.length)

const accounts = db.query("SELECT * FROM account").all()
console.log('Remaining linked accounts:', accounts.length)

db.close()
console.log('\nAll sessions cleared! Users and linked accounts remain.')