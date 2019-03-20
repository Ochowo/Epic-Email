import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

let sqlQuery = `CREATE TABLE IF NOT EXISTS contacts
(id SERIAL NOT NULL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE,
firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, ownerId INT NOT NULL,
FOREIGN KEY(ownerId) REFERENCES users(id) ON DELETE CASCADE)`;

if (process.env.NODE_ENV === 'test') {
  sqlQuery = `DROP TABLE IF EXISTS contacts CASCADE;
  CREATE TABLE IF NOT EXISTS contacts
(id SERIAL NOT NULL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE,
firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL)`;
}
// Create users table in the database
db.query(sqlQuery, (err, res) => {
  if (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      error: {
        message: 'An error occured while trying to create the contacts table, please try again',
      },
    });
  }
  // users table created
  console.log('Connection successful, user table created');
  return true;
});
