import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

const inboxQuery = async () => {
  let sqlQuery = `CREATE TABLE IF NOT EXISTS inbox
    (receiverId INT NOT NULL, messageId INT NOT NULL, senderId INT NOT NULL, status VARCHAR(255) NOT NULL, 
    FOREIGN KEY(messageId) REFERENCES messages(id) ON DELETE CASCADE,
    FOREIGN KEY(receiverId) REFERENCES users(id) ON DELETE CASCADE)`;

  if (process.env.NODE_ENV === 'test') {
    sqlQuery = `DROP TABLE IF EXISTS inbox CASCADE;
  CREATE TABLE IF NOT EXISTS inbox
    (receiverId INT NOT NULL, messageId INT NOT NULL, senderId INT NOT NULL, status VARCHAR(255) NOT NULL, 
    FOREIGN KEY(messageId) REFERENCES messages(id) ON DELETE CASCADE,
    FOREIGN KEY(receiverId) REFERENCES users(id) ON DELETE CASCADE)`;
  }
  // Create inbox table in the database
  await db.query(sqlQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  // , (err, res) => {
  //   if (err) {
  //     return res.status(500).json({
  //       status: 500,
  //       error: {
  //         message: 'An error occured while trying to inbox the sent table, please try again',
  //       },
  //     });
  //   }
  //   // sent table created
  //   console.log('Connection successful, inbox table created');
  //   // return true;
  // });
};
export default inboxQuery;
