import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db/index';
import { checkSigninInput, checkSignupInput } from '../validation/index';

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
      email,
      firstName,
      lastName,
      password,
    } = req.body;
    const { errors, isValid } = checkSignupInput(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }
    const saltRounds = 10;
    const encryptedPassword = bcrypt.hashSync(password, saltRounds);
    const query = {
      text: 'INSERT INTO users(email,firstName,lastName,password) VALUES($1,$2,$3,$4) RETURNING *',
      values: [`${email}`, `${firstName}`, `${lastName}`, `${encryptedPassword}`],
    };
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An error occured while trying to sign you up, please try again.',
        });
      }
      const user = result.rows[0];
      const token = jwt.sign({ email: `${user.email}`, userId: `${user.id}` }, process.env.SECRET, {
        expiresIn: 86400, // expires in 24 hours
      });
      return res.status(201).json({
        status: 201,
        data: [{
          token,
          email,
          firstName,
          lastName,
        }],
      });
    });
    return null;
  }

  static signin(req, res) {
    const {
      email,
      password,
    } = req.body;
    const { errors, isValid } = checkSigninInput(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [`${email}`],
    };
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An error occured while trying to sign you in, please try again.',
        });
      }
      if (result.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Authentication failed. User not found',

        });
      }
      const crypticPassword = result.rows[0].password;
      const validPassword = bcrypt.compareSync(password, crypticPassword);
      if (!validPassword) {
        return res.status(401).json({
          status: 401,
          error: 'Authentication failed. Wrong password',
        });
      }
      const user = result.rows[0];
      const token = jwt.sign({ email: `${email}`, userId: `${user.id}` }, process.env.SECRET, {
        expiresIn: 86400, // expires in 24 hours
      });
      const {
        firstName,
      } = result.rows[0];
      return res.status(200).json({
        status: 200,
        data: [{
          message: `Welcome, ${firstName}`,
          token,
          email,
        }],
      });
    });
    return null;
  }
}
export default Users;
