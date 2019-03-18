import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

let sqlQuery = `CREATE TABLE IF NOT EXISTS contact
(id SERIAL NOT NULL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE,
firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL,
FOREIGN KEY(email) REFERENCES users(email) ON DELETE CASCADE)`;

if (process.env.NODE_ENV === 'test') {
  sqlQuery = `DROP TABLE IF EXISTS contact CASCADE;
  CREATE TABLE IF NOT EXISTS contact
  (id SERIAL NOT NULL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE,
  firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL,
  FOREIGN KEY(email) REFERENCES users(email) ON DELETE CASCADE)`;
}
// Create contact table in the database
db.query(sqlQuery, (err, res) => {
  if (err) {
    return res.status(500).json({
      status: 500,
      error: {
        message: 'An error occured while trying to create the contact table, please try again',
      },
    });
  }
  // users table created
  console.log('Connection successful, contact table created');
  return true;
});
