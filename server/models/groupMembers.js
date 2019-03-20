import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

const grpMemberQuery = async () => {
  let sqlQuery = `CREATE TABLE IF NOT EXISTS groupMembers
(id INT NOT NULL PRIMARY KEY,
userId INT NOT NULL, role VARCHAR(255) DEFAULT 'member' NOT NULL,
FOREIGN KEY(id) REFERENCES groups(id) ON DELETE CASCADE,
FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE)`;

  if (process.env.NODE_ENV === 'test') {
    sqlQuery = `DROP TABLE IF EXISTS groupMembers CASCADE;
  CREATE TABLE IF NOT EXISTS groupMembers
  (id INT NOT NULL PRIMARY KEY, 
    userId INT NOT NULL, role VARCHAR(255) DEFAULT 'member' NOT NULL,
    FOREIGN KEY(id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE)`;
  }
  // Create groupMember tablen in the database
  await db.query(sqlQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export default grpMemberQuery;
