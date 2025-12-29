import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

const dbPassword = String(process.env.DB_PASSWORD || '');

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: dbPassword,
  database: "myDB",
});


export default pool;