import './dotenv.js'
import { pool } from './database.js'

const reset = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS customcars;

      CREATE TABLE customcars (
        id SERIAL PRIMARY KEY,
        name TEXT,
        convertible BOOLEAN,
        exterior TEXT,
        roof TEXT,
        wheels TEXT,
        interior TEXT,
        price INTEGER
      );
    `)

    console.log("🎉 customcars table created successfully")
  } catch (error) {
    console.error("⚠️ error creating customcars table", error)
  } finally {
    pool.end()
  }
}

reset()