import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

const draftQuery = async () => {
  let sqlQuery = `CREATE TABLE IF NOT EXISTS draft
    (senderId INT NOT NULL, messageId INT NOT NULL, receiverId INT NOT NULL, status VARCHAR(255) NOT NULL,
    FOREIGN KEY(messageId) REFERENCES messages(id) ON DELETE CASCADE,
    FOREIGN KEY(senderId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(receiverId) REFERENCES users(id) ON DELETE CASCADE)`;

  if (process.env.NODE_ENV === 'test') {
    sqlQuery = `DROP TABLE IF EXISTS draft CASCADE;
  CREATE TABLE IF NOT EXISTS draft
    (senderId INT NOT NULL, messageId INT NOT NULL, receiverId INT NOT NULL, status VARCHAR(255) NOT NULL,
    FOREIGN KEY(messageId) REFERENCES messages(id) ON DELETE CASCADE,
    FOREIGN KEY(senderId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(receiverId) REFERENCES users(id) ON DELETE CASCADE)`;
  }
  // Create draft table in the database
  await db.query(sqlQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  // , (err, res) => {
  //   if (err) {
  //     console.log(err);
  //     // return res.status(500).json({
  //     //   status: 500,
  //     //   error: {
  //     //     message: 'An error occured while trying to
  // create the draft table, please try again',
  //     //   },
  //     // });
  //   }
  //   // sent table created
  //   console.log('Connection successful, draft table created');
  //   // return true;
  // });
};
export default draftQuery;
