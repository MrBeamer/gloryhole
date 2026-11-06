import { Pool } from "pg";
import "dotenv/config";

// this initiates a connection to the db, can be replace by env from service like superbase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
