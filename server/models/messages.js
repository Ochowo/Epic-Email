import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();
dotenv.config();
const msgQuery = async () => {
  let sqlQuery = `CREATE TABLE IF NOT EXISTS messages
    (id SERIAL NOT NULL PRIMARY KEY, createdOn TIMESTAMPTZ DEFAULT NOW(), subject VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL, parentMessageId INT, status VARCHAR(255) DEFAULT 'unread' NOT NULL, senderId INT NOT NULL, receiverId INT NOT NULL)`;

  if (process.env.NODE_ENV === 'test') {
    sqlQuery = `DROP TABLE IF EXISTS messages CASCADE;
  CREATE TABLE IF NOT EXISTS messages
    (id SERIAL NOT NULL PRIMARY KEY, createdOn TIMESTAMPTZ DEFAULT NOW(), subject VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL, parentMessageId INT, status VARCHAR(255) DEFAULT 'unread' NOT NULL, senderId INT NOT NULL, receiverId INT NOT NULL)`;
  }
  // Create message table in the database
  await db.query(sqlQuery)
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err);
    });
};
export default msgQuery;
