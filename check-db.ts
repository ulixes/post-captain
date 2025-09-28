import { Database } from 'bun:sqlite'

const db = new Database('./auth.db')

// Get all tables
const tables = db.query("SELECT name FROM sqlite_master WHERE type='table'").all()
console.log('Tables in database:', tables)

// Check each table
for (const table of tables) {
  const tableName = table.name
  const count = db.query(`SELECT COUNT(*) as count FROM ${tableName}`).get()
  const rows = db.query(`SELECT * FROM ${tableName} LIMIT 5`).all()
  
  console.log(`\n=== Table: ${tableName} ===`)
  console.log(`Total rows: ${count.count}`)
  
  if (rows.length > 0) {
    console.log('Sample data:')
    console.log(JSON.stringify(rows, null, 2))
  }
}

db.close()