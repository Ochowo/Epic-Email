import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

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
db.query(sqlQuery, (err, res) => {
  if (err) {
    return res.status(500).json({
      status: 500,
      error: {
        message: 'An error occured while trying to create the sent table, please try again',
      },
    });
  }
  // sent table created
  console.log('Connection successful, sent table created');
  return true;
});