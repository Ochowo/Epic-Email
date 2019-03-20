import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

const grpMsgQuery = async () => {
  let sqlQuery = `CREATE TABLE IF NOT EXISTS groupMessages
    (id SERIAL NOT NULL PRIMARY KEY, createdOn TIMESTAMPTZ DEFAULT NOW(), subject VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL, parentMessageId INT NULL, status VARCHAR(255) DEFAULT 'unread' NOT NULL,
    senderId INT NOT NULL, groupId INT NOT NULL,
   FOREIGN KEY(groupId) REFERENCES groups(id) ON DELETE CASCADE)`;

  if (process.env.NODE_ENV === 'test') {
    sqlQuery = `DROP TABLE IF EXISTS messages CASCADE;
  CREATE TABLE IF NOT EXISTS messages
    (id SERIAL NOT NULL PRIMARY KEY, createdOn TIMESTAMPTZ DEFAULT NOW(), subject VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL, parentMessageId INT NULL, status VARCHAR(255) DEFAULT 'unread' NOT NULL, senderId INT NOT NULL, receiverId INT NOT NULL)`;
  }
  // Create groupMessage table in the database
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
  //     return res.status(500).json({
  //       status: 500,
  //       error: {
  //         message: 'An error occured while trying to create the groupMessages table,
  // please try again',
  //       },
  //     });
  //   }
  //   // sent table created
  //   console.log('Connection successful, groupMessages table created');
  //   // return true;
  // });
};
export default grpMsgQuery;
