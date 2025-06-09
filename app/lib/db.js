import { Pool } from 'pg'
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});
let db;

 async function getPgVersion() {
  const db = await pool.connect();
  try {
    const result = await db.query('SELECT version()');
    console.log(result.rows[0]);
  } finally {
    client.release();
  }
}
getPgVersion();

export default db;