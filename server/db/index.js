import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// database connectionstring
let connectionString;

// Get environment
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_TEST;
} else if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DATABASE_DEVELOPMENT;
} else if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_PRODUCTION;
}
const db = new Pool({
  connectionString,
});
export default db;
