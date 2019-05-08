import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import db from '../db/index';
import 'babel-polyfill';
import authHelper from './authHelper';
import {
  checkSigninInput, checkSignupInput, emailVal, passVal,
} from '../validation/index';

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
      console.log(error);
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
        return res.status(404).json({ status: 404, error: 'Authentication failed. User not found' });
      }
      if (!authHelper.comparePassword(rows[0].password, password)) {
        return res.status(401).json({ status: 401, error: 'Authentication failed. Wrong password' });
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

  static async reset(req, res) {
    const {
      email,
    } = req.body;
    try {
      const { errors, isValid } = emailVal(req.body);
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          error: errors,
        });
      }
      const text = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await db.query(text, [email]);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, error: 'Authentication failed. User not found' });
      }
      const user = rows[0];
      const token = authHelper.generateToken(user.id, user.email);
      const mailOptions = {
        from: 'noreply@epicmail.com',
        to: email,
        subject: 'EPIC MAIL Reset Password Link',
        html: `<h1> reset link </h1>
       <p> click on the
      <a href= hhttps://epic-mail04.herokuapp.com/pass.html?token=${token}>link</a>
      to reset your password </p>
    `,
      };
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_PASSWORD,
        },
      });
      transporter.sendMail(mailOptions);
      return res.status(200).json({
        status: 200,
        data: {
          message: 'Check your email for reset password link',
          email,
          token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: 'An error occured while trying to sign you in, please try again.',
      });
    }
  }

  static async resetPassword(req, res) {
    const {
      token,
    } = req.params;
    console.log(token)
    const decoded = jwt.verify(token, process.env.SECRET);
    const {
      password,
    } = req.body;
    const { errors, isValid } = passVal(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(text, [decoded.email]);
    const user = rows[0];
    console.log(user, 'pppp');
    if (!user) {
      return {
        status: 404,
        error: 'User not found',
      };
    }
    const hashpassword = authHelper.hashPassword(password);
    try {
      const Query = {
        text: 'UPDATE users SET password = $1 WHERE email= $2',
        values: [`${hashpassword}`, `${decoded.email}`],
      };
      const { rowCount } = await db.query(Query);
      console.log(rowCount, 'popopo');
      if (rowCount > 1) {
        return res.status(404).json({
          status: 404,
          error: 'Password reset unsuccesful',
        });
      }
      const {
        email,
      } = decoded.email;
      return res.status(200).json({
        status: 200,
        data: {
          message: 'password reset sucessfull',
          email,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: 'internal server error',
      });
    }
  }
}
export default Users;
