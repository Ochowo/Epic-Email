import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../db/index';
import nameValidator from '../validation/nameValidator';

dotenv.config();

class Groups {
  static newGroup(req, res) {
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
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
    }
    const newRole = 'admin';
    const query = {
      text: 'INSERT INTO groups(name,role,userId) VALUES($1,$2,$3) RETURNING *',
      values: [`${name}`, `${newRole}`, `${decoded.userId}`],
    };
    db.query(query, (error, result) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: {
            message: 'An error occured while trying to create the group, please try again.',
          },
        });
      }
      return res.status(201).json({
        status: 201,
        data: [{
          details: result.rows[0],
        }],
      });
    });
    return null;
  }

  static getGroups(req, res) {
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const query = {
      text: `SELECT * FROM groups WHERE userId = ${decoded.userId}`,
    };
    db.query(query, (err, newResult) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: {
            message: 'An error occured while trying to get the group, please try again.',
          },
        });
      }
      if (newResult.rowCount < 1) {
        // No such order
        return res.status(404).json({
          status: 404,
          error: 'Sorry, no group found for this user',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          details: newResult.rows,
        }],
      });
    });
  }

  static updateGroup(req, res) {
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const Id = decoded.userId;
    const reqId = req.params.id;
    const {
      name,
    } = req.body;
    const { errors, isValid } = nameValidator(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }
    const query = {
      text: 'UPDATE groups SET name = $1 WHERE id = $2',
      values: [`${name}`, `${reqId}`],
    };

    db.query(query, (errr, Ress) => {
      if (errr) {
        return res.status(500).json({
          status: 500,
          error: 'An error occured while trying to update the name of the group, please try again.',
        });
      }
      if (Ress.rowCount < 1) {
        // No such order
        return res.status(404).json({
          status: 404,
          error: 'Sorry, group not found',
        });
      }
      const newQuery = {
        text: `SELECT * FROM groups WHERE id = $1
        AND userId =$2`,
        values: [`${reqId}`, `${Id}`],
      };
      db.query(newQuery, (er, newRes) => {
        if (er) {
          return res.status(500).json({
            status: 500,
            error: {
              message: 'An error occured while trying to get the group, please try again.',
            },
          });
        }
        return res.status(200).json({
          status: 200,
          data: [{
            details: newRes.rows,
          }],
        });
      });
      return null;
    });
    return null;
  }

  static deleteGroup(req, res) {
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const {
      id,
    } = req.params;

    const query = {
      text: `DELETE FROM groups WHERE id = ${id} AND userId = ${decoded.userId}`,
    };

    db.query(query, (errorrs, newestRes) => {
      if (errorrs) {
        return res.status(500).json({
          status: 500,
          error: 'An error occured while trying to delete the group please try again.',
        });
      }
      if (newestRes.rowCount < 1) {
        // No such order
        return res.status(404).json({
          status: 404,
          error: 'Sorry, requested group not found for this user',
        });
      }
      return res.status(200).json({
        status: 200,
        data: `Group  with id => ${id}, deleted successfully.`,
      });
    });
  }
}
export default Groups;
