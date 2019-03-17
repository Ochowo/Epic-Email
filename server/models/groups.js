import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

let sqlQuery = `CREATE TABLE IF NOT EXISTS groups
(id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL)`;

if (process.env.NODE_ENV === 'test') {
  sqlQuery = `DROP TABLE IF EXISTS ggroups CASCADE;
  CREATE TABLE IF NOT EXISTS groups
    (id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(255)NOT NULL)`;
}
// Create group table in the database
db.query(sqlQuery, (err, res) => {
  if (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      error: {
        message: 'An error occured while trying to create the group table, please try again',
      },
    });
  }
  // sent table created
  console.log('Connection successful, group table created');
  return true;
});
