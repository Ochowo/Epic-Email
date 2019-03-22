import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();
const groupQuery = async () => {
  let sqlQuery = `CREATE TABLE IF NOT EXISTS groups
(id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(255) NULL,
role VARCHAR(255) DEFAULT 'member' NOT NULL, userId INT NOT NULL,
FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE)`;

  if (process.env.NODE_ENV === 'test') {
    sqlQuery = `DROP TABLE IF EXISTS groups CASCADE;
    CREATE TABLE IF NOT EXISTS groups
    (id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(255) NULL,
    role VARCHAR(255) DEFAULT 'member' NOT NULL, userId INT NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE)`;
  }
  await db.query(sqlQuery)
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err);
    });
};
export default groupQuery;
