import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();
const sentQuery = async () => {
  let sqlQuery = `CREATE TABLE IF NOT EXISTS sent
    (senderId INT NOT NULL, messageId INT NOT NULL, receiverId INT NOT NULL, status VARCHAR(255) NOT NULL,
    FOREIGN KEY(messageId) REFERENCES messages(id) ON DELETE CASCADE,
    FOREIGN KEY(senderId) REFERENCES users(id) ON DELETE CASCADE)`;

  if (process.env.NODE_ENV === 'test') {
    sqlQuery = `DROP TABLE IF EXISTS sent CASCADE;
  CREATE TABLE IF NOT EXISTS sent
    (senderId INT NOT NULL, messageId INT NOT NULL, receiverId INT NOT NULL, status VARCHAR(255) NOT NULL,
    FOREIGN KEY(messageId) REFERENCES messages(id) ON DELETE CASCADE,
    FOREIGN KEY(senderId) REFERENCES users(id) ON DELETE CASCADE)`;
  }
  // Create sent table in the database
  await db.query(sqlQuery)
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err);
    });

};

export default sentQuery;
