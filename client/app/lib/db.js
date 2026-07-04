import { Pool } from 'pg';
import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL, PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const poolConfig = DATABASE_URL
  ? { connectionString: DATABASE_URL }
  : {
      host: PGHOST,
      database: PGDATABASE,
      username: PGUSER,
      password: PGPASSWORD,
      port: 5432,
    };

poolConfig.ssl = {
  rejectUnauthorized: false // safe for Neon and general cloud databases
};

const pool = new Pool(poolConfig);

export default pool;