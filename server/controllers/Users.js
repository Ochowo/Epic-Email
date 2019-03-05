import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../db/index';

dotenv.config();
/**
 *
 *
 * @class Users
 */
class Users {
  /**
     * Signup
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @returns
     *
     * @memberOf Users
     */
  static signup(req, res) {
    const {
      password,
    } = req.body;
    const saltRounds = 10;
    const encryptedPassword = bcrypt.hashSync(password, saltRounds);
    const user = {
      id: users.length + 1,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: encryptedPassword,
    };
    users.push(user);
    const token = jwt.sign({ email: `${user.email}` }, process.env.SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    return res.status(201).json({
      status: 201,
      data: [{
        token,
        user,
      }],
    });
  }
}
export default Users;
