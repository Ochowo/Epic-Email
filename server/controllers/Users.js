import dotenv from 'dotenv';
import db from '../db/index';
import 'babel-polyfill';
import authHelper from './authHelper';
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
  static async signup(req, res) {
    const {
      email,
      firstName,
      lastName,
    } = req.body;
    try {
      const { errors, isValid } = checkSignupInput(req.body);
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          error: errors,
        });
      }
      // Check if a user with the provided email already exists
      const existingUser = (await db.query('SELECT * FROM users WHERE email=$1', [email])).rowCount;
      if (existingUser) {
        return res.status(409).json({
          status: 409,
          error: `The email ${email} already exists`,
        });
      }
      const encryptedPassword = authHelper.hashPassword(req.body.password);
      const query = {
        text: 'INSERT INTO users(email,firstName,lastName,password) VALUES($1,$2,$3,$4) RETURNING *',
        values: [`${email}`, `${firstName}`, `${lastName}`, `${encryptedPassword}`],
      };
      const { rows } = await db.query(query);
      const user = rows[0];
      const token = authHelper.generateToken(user.id, user.email);
      return res.status(201).json({
        status: 201,
        data: [{
          userToken: token,
          email,
          firstName,
          lastName,
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while trying to sign you up, please try again.',
        },
      });
    }
  }

  static async signin(req, res) {
    const {
      email,
      password,
    } = req.body;
    try {
      const { errors, isValid } = checkSigninInput(req.body);
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          error: errors,
        });
      }
      const text = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, error: 'Authentication failed. User not found'  });
      }
      if (!authHelper.comparePassword(rows[0].password, password)) {
        return res.status(401).json({ status: 401, error: 'Authentication failed. Wrong password'  });
      }
      const user = rows[0];
      const token = authHelper.generateToken(user.id, user.email);
      return res.status(200).json({
        status: 200,
        data: [{
          message: `Welcome, ${user.firstname} ${user.lastname}`,
          token,
          email,
        }],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while trying to sign you in, please try again.',
        },
      });
    }
  }
}
export default Users;
