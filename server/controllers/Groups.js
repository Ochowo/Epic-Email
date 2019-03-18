import dotenv from 'dotenv';
import db from '../db/index';
import nameValidator from '../validation/nameValidator';

dotenv.config();

class Groups {
  static newGroup(req, res) {
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
      text: 'INSERT INTO groups(name,role) VALUES($1,$2) RETURNING *',
      values: [`${name}`, `${newRole}`],
    };
    db.query(query, (error, result) => {
      if (error) {
        console.log(error);
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
}
export default Groups;
