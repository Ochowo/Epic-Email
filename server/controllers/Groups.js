import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import 'babel-polyfill';
import db from '../db/index';
import nameValidator from '../validation/nameValidator';
import grpValidator from '../validation/grpValidator';

dotenv.config();

class Groups {
  static async newGroup(req, res) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const {
      name,
    } = req.body;
    const { errors, isValid } = nameValidator(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    } try {
      const nameExists = (await db.query('SELECT * FROM groups WHERE name=$1 AND userid=$2', [name, decoded.userId])).rows[0];
      if (nameExists) {
        return res.status(404).json({
          status: 404,
          error: `Sorry, you have an existing group named ${name}`,
        });
      }
      const newRole = 'admin';
      const query = {
        text: 'INSERT INTO groups(name,role,userId) VALUES($1,$2,$3) RETURNING *',
        values: [`${name}`, `${newRole}`, `${decoded.userId}`],
      };
      const { rows } = await db.query(query);
      const grp = rows[0];
      const grpQuery = {
        text: 'INSERT INTO groupMembers(id,name,userId,role,email) VALUES($1,$2,$3,$4,$5) RETURNING *',
        values: [`${grp.id}`, `${grp.name}`, `${grp.userid}`, `${newRole}`, `${decoded.email}`],
      };
      await db.query(grpQuery);
      return res.status(201).json({
        status: 201,
        data: [{
          details: rows,
        }],
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while creating the group.',
        },
      });
    }
  }

  static async getGroups(req, res) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded)
    try {
      const query = {
      text:  `SELECT * from groupMembers WHERE userid = ${decoded.userId}
       ORDER BY id DESC`,
      };
      const { rows, rowCount } = await db.query(query);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Sorry, no group found for this user',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          details: rows,
        }],
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while getting the group.',
        },
      });
    }
  }

  static async updateGroup(req, res) {
    // Check header or url parameters or post parameters for token
    const token = req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const Id = decoded.userId;
    const reqId = req.params.id;
    const {
      name,
    } = req.body;
    if (Number.isNaN(Number(reqId))) {
      return res.status(400).json({ status: 404, message: 'invalid route' });
    }
    const { errors, isValid } = nameValidator(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }
    try {
      const nameExists = (await db.query('SELECT name FROM groups WHERE name=$1 AND userid=$2', [name, Id])).rows[0];
      if (nameExists) {
        return res.status(404).json({
          status: 404,
          error: `Sorry, you have an existing group named ${name}`,
        });
      }
      const query = {
        text: 'UPDATE groups SET name = $1 WHERE id = $2 AND userId =$3',
        values: [`${name}`, `${reqId}`, `${Id}`],
      };

      await db.query(query);
      const newQuery = {
        text: `SELECT * FROM groups WHERE id = $1
        AND userId =$2`,
        values: [`${reqId}`, `${Id}`],
      };
      const { rows, rowCount } = await db.query(newQuery);
      if (rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: `The Group ${name} does not exist for this user`,
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          details: rows,
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while updating the group.',
        },
      });
    }
  }

  static async deleteGroup(req, res) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const {
      id,
    } = req.params;
    try {
      if (Number.isNaN(Number(id))) {
        return res.status(400).json({ status: 404, message: 'invalid route' });
      }
      const query = {
        text: `DELETE FROM groups WHERE id = ${id} AND userId = ${decoded.userId}`,
      };
      const { rowCount } = await db.query(query);
      if (rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Sorry, requested group not found for this user',
        });
      }
      return res.status(200).json({
        status: 200,
        data: 'Group deleted successfully.',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while deleting the group.',
        },
      });
    }
  }

  static async createUser(req, res) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const {
      id,
    } = req.params;
    const {
      email,
    } = req.body;
    try {
      if (Number.isNaN(Number(id))) {
        return res.status(400).json({ status: 404, message: 'invalid route' });
      }
      const userExists = (await db.query('SELECT * FROM users WHERE email=$1', [email])).rows[0];
      if (!userExists) {
        return res.status(404).json({
          status: 404,
          error: 'Sorry, the email does not exist in the database',
        });
      }
      const userAdmin = (await db.query('SELECT * FROM groups WHERE userId = $1 AND id = $2 AND role = $3', [decoded.userId, id, 'admin'])).rows[0];
      if (!userAdmin) {
        return res.status(400).json({
          status: 400,
          error: {
            message: 'only an admin can add a user to a group.',
          },
        });
      }
      console.log(userExists);
      const { rowCount} = (await db.query('SELECT * FROM groupMembers WHERE userId=$1 AND id=$2', [userExists.userid, id]));
      if (rowCount > 0) {
        return res.status(404).json({
          status: 404,
          error: 'the user is already a member of the group',
        });
      }
      const userQuery = {
        text: 'INSERT INTO groupMembers(id,name,userId,email) VALUES($1,$2,$3,$4) RETURNING *',
        values: [`${userAdmin.id}`, `${userAdmin.name}`, `${userExists.id}`, `${email}`],
      };
      const { rows } = await db.query(userQuery);
      return res.status(200).json({
        status: 200,
        data: [{
          details: rows[0],
        }],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while adding the user to the group.',
        },
      });
    }
  }

  static async deleteUser(req, res) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const {
      userId,
      id,
    } = req.params;
    try {
      if (Number.isNaN(Number(id))) {
        return res.status(400).json({ status: 404, message: 'invalid route' });
      }
      const userAdmin = (await db.query('SELECT * FROM groups WHERE userId = $1 AND id = $2 AND role = $3', [decoded.userId, id, 'admin'])).rows[0];

      if (!userAdmin) {
        return res.status(400).json({
          status: 400,
          error: {
            message: 'only an admin can delete a user from a group.',
          },
        });
      }
      const query = {
        text: `DELETE FROM groupMembers WHERE id=${id} AND userId=${userId}`,
      };
      db.query(query);
      return res.status(200).json({
        status: 200,
        data: `User  with id => ${id}, deleted from the group ${userAdmin.name} successfully.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while adding the user to the group.',
        },
      });
    }
  }

  static async newMessage(req, res) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const senderId = decoded.userId;

    const {
      subject,
      message,
      parentMessageId,
    } = req.body;
    const reqId = req.params.id;
    try {
      const { errors, Valid } = grpValidator(req.body);
      if (!Valid) {
        return res.status(400).json({
          status: 400,
          error: errors,
        });
      }
      const userExists = (await db.query('SELECT * FROM groupMembers WHERE id =$1 AND UserId=$2', [reqId, decoded.userId ])).rows[0];
        if (!userExists) {
          return res.status(404).json({
            status: 404,
            error: 'Sorry, no group for this user',
          });
        }
        const receiverId = userExists.id;
        const query = {
          text: 'INSERT INTO groupMessages(subject,message,parentMessageId, senderId, groupId) VALUES($1,$2,$3,$4,$5) RETURNING *',
          values: [`${subject}`, `${message}`, `${parentMessageId}`, `${senderId}`, `${receiverId}`],
        };
        const { rows } = await db.query(query);
          return res.status(201).json({
            status: 201,
            data: [{
              details: rows[0],
            }],
          });
    }catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while adding the user to the group.',
        },
      });
    }
  }
  }
export default Groups;
