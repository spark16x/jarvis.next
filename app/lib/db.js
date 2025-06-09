import { Pool } from 'pg'
import dotenv from "dotenv";

dotenv.config();
 
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.POSTGRES_USER,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

console.log(pool.connect())