import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();
const userQuery = async () => {
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
  await db.query(sqlQuery)
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err);
    });
};
export default userQuery;
