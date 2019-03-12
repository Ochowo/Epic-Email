import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../db/users';

dotenv.config();
/**
 *
 *
 * @class Users
 */
class Users {
  /**
     * User Signup
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
    const {
      email,
      firstName,
      lastName,
    } = req.body;
    const user = {
      id: users.length + 1,
      password: encryptedPassword,
      firstName,
      lastName,
      email,
    };
    users.push(user);
    const token = jwt.sign({ email: `${user.email}`, userId: `${user.id}` }, process.env.SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    return res.status(201).json({
      status: 201,
      data: [{
        token,
        firstName,
        lastName,
        email,
      }],
    });
  }

  static signin(req, res) {
    const {
      email,
      password,
    } = req.body;
    const newUser = {
      email,
      password,
    };
    const result = users.map(user => user.email);
    if (result.includes(newUser.email) === false) {
      return res.status(404).json({
        status: 404,
        error: 'Authentication failed. User not found',
      });
    }
    const userDb = users.find(user => user.email === newUser.email);
    const validPassword = bcrypt.compareSync(newUser.password, userDb.password);
    if (!validPassword) {
      return res.status(401).json({
        status: 401,
        error: 'Authentication failed. Wrong password',
      });
    }
    const token = jwt.sign({ email: `${newUser.email}`, userId: `${userDb.id}` }, process.env.SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    return res.status(200).json({
      status: 200,
      data: [{
        token,
        email,
      }],
    });
  }
}
export default Users;
