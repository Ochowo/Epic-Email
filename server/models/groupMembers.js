import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

let sqlQuery = `CREATE TABLE IF NOT EXISTS groupMembers
(groupId NOT NULL PRIMARY KEY, memberId NOT NULL
email VARCHAR(255) NOT NULL UNIQUE, role VARCHAR(255) DEFAULT 'member' NOT NULL
FOREIGN KEY(groupId) REFERENCES groups(id) ON DELETE CASCADE,
FOREIGN KEY(memberId) REFERENCES users(id) ON DELETE CASCADE)`;

if (process.env.NODE_ENV === 'test') {
  sqlQuery = `DROP TABLE IF EXISTS groups CASCADE;
  CREATE TABLE IF NOT EXISTS groupMembers
  (groupId NOT NULL PRIMARY KEY, memberId NOT NULL
  email VARCHAR(255) NOT NULL UNIQUE, role VARCHAR(255) DEFAULT 'member' NOT NULL
  FOREIGN KEY(groupId) REFERENCES groups(id) ON DELETE CASCADE,
  FOREIGN KEY(memberId) REFERENCES users(id) ON DELETE CASCADE)`;
}
// Create groupMember table in the database
db.query(sqlQuery, (err, res) => {
  if (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      error: {
        message: 'An error occured while trying to create the groupMember table, please try again',
      },
    });
  }
  // sent table created
  console.log('Connection successful, groupMember table created');
  return true;
});
