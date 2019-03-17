import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

let sqlQuery = `CREATE TABLE IF NOT EXISTS users
(id SERIAL NOT NULL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE,
firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL)`;

if (process.env.NODE_ENV === 'test') {
  sqlQuery = `DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE IF NOT EXISTS users
(id SERIAL NOT NULL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE,
firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL)`;
}
// Create userss table in the database
db.query(sqlQuery, (err, res) => {
  if (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      error: {
        message: 'An error occured while trying to create the users table, please try again',
      },
    });
  }
  // users table created
  console.log('Connection successful, user table created');
  return true;
});
