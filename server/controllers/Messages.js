import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import 'babel-polyfill';
import db from '../db/index';
import { messageValidator } from '../validation/index';

dotenv.config();
/**
 *
 *
 * @class Messages
 */
class Messages {
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {aobject} res
   * @returns
   *
   * @memberOf Messages
   */
  static async newMessage(req, res) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const senderId = decoded.userId;

    const {
      subject,
      message,
      receiverEmail,
    } = req.body;
    const { errors, isValid } = messageValidator(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }
    try {
      const userExists = (await db.query('SELECT * FROM users WHERE email=$1', [receiverEmail])).rows[0];
      if (!userExists) {
        return res.status(404).json({
          status: 404,
          error: 'Sorry, the receiver email does not exist in the database',
        });
      }
      const userName = (await db.query('SELECT * FROM users WHERE email=$1', [decoded.email])).rows[0];
      console.log(userName);
      const query = {
        text: 'INSERT INTO messages(subject,message,senderId,receiverId,sfirstname,slastname,rusername,ruserlastname) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        values: [`${subject}`, `${message}`, `${senderId}`, `${userExists.id}`, `${userName.firstname}`, `${userName.lastname}`, `${userExists.firstname}`, `${userExists.lastname}`],
      };
      const { rows } = await db.query(query);
      const msg = rows[0];
      const inboxQuery = {
        text: 'INSERT INTO inbox(messageId,receiverId,senderId,status,sfirstname,slastname) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
        values: [`${msg.id}`, `${msg.receiverid}`, `${senderId}`, `${msg.status}`, `${userName.firstname}`, `${userName.lastname}`],
      };
      await db.query(inboxQuery);
      const status = 'sent';
      const sentQuery = {
        text: 'INSERT INTO sent(messageId,senderId,receiverId,status,rusername,ruserlastname) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
        values: [`${msg.id}`, `${senderId}`, `${msg.receiverid}`, `${status}`, `${userName.firstname}`, `${userName.lastname}`],
      };
      await db.query(sentQuery);
      return res.status(201).json({
        status: 201,
        data: [{
          details: rows[0],
        }],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: {
          message: 'Internal server error.',
        },
      });
    }
  }

  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 *
 * @memberOf Messages
 */
  static async getAllMessages(req, res) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const query = {
      text: `SELECT inbox.messageId, messages.createdOn, messages.subject,
      messages.message, inbox.sfirstname, inbox.slastname,inbox.senderId, inbox.receiverId,
      messages.parentMessageId, inbox.status, users.email, messages.rusername, messages.ruserlastname
      FROM ((inbox
      JOIN users ON inbox.receiverId = users.id)
      JOIN messages ON inbox.messageId = messages.id) 
      WHERE inbox.receiverId = ${decoded.userId} ORDER BY messageId DESC`,
    };
    try {
      const { rows, rowCount } = await db.query(query);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Sorry, no inbox messages for you',
        });
      }
      return res.status(200).json({
        status: 200,
        data: {
          inbox: rows,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while getting your inbox messages.',
        },
      });
    }
  }

  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   *
   * @memberOf Messages
   */
  static async getUnread(req, res) {
    const token = req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const query = {
      text: `SELECT inbox.messageId, messages.createdOn, messages.subject,
      messages.message, inbox.sfirstname, inbox.slastname,inbox.senderId, inbox.receiverId,
      messages.parentMessageId, inbox.status, users.email, messages.rusername, messages.ruserlastname
      FROM ((inbox
      JOIN users ON inbox.receiverId = users.id)
      JOIN messages ON inbox.messageId = messages.id) 
      WHERE inbox.receiverId = $1  AND inbox.status = 'unread' ORDER BY messageId DESC;`,
      values: [`${decoded.userId}`],
    };
    try {
      const { rows, rowCount } = await db.query(query);
      if (rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'No unread messages for you',
        });
      }
      return res.status(200).json({
        status: 200,
        data: {
          unread: rows,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while getting your unread messages.',
        },
      });
    }
  }

  static async getSent(req, res) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const query = {
      text: `SELECT sent.messageId, messages.createdOn, messages.subject,
        messages.message, sent.senderId, messages.receiverId,
        messages.parentMessageId, sent.status, users.email, messages.rusername, messages.ruserlastname
        FROM ((sent
        JOIN users ON sent.senderId = users.id)
        JOIN messages ON sent.messageId = messages.id) 
        WHERE sent.senderId = $1 ORDER BY messageId DESC;`,
      values: [`${decoded.userId}`],
    };
    try {
      const { rows, rowCount } = await db.query(query);
      if (rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'No sent messages for you',
        });
      }
      return res.status(200).json({
        status: 200,
        data: {
          sent: rows,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while getting your sent messages.',
        },
      });
    }
  }

  static async getSpecificMessage(req, res) {
    const token = req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);

    const {
      id,
    } = req.params;
    if (Number.isNaN(Number(id))) {
      return res.status(400).json({ status: 404, message: 'invalid route' });
    }
    try {
      const newQuery = {
        text: `SELECT inbox.messageId, messages.createdOn, messages.subject,
        messages.message, inbox.senderId, inbox.receiverId,
        messages.parentMessageId, inbox.status, users.email,inbox.sfirstname, inbox.slastname, messages.ruserlastname, messages.rusername
        FROM ((inbox
        JOIN users ON inbox.receiverId = users.id)
        JOIN messages ON inbox.messageId = messages.id)
        WHERE messageId = ${id} AND inbox.receiverId = ${decoded.userId}`,
      };
      const { rows, rowCount } = await db.query(newQuery);
      const query = {
        text: `UPDATE  inbox
      SET status = 'read'
      WHERE inbox.messageId = ${id} AND inbox.receiverId = ${decoded.userId};
      COMMIT;`,
      };
      await db.query(query);
      if (rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Message not found',
        });
      } return res.status(200).json({
        status: 200,
        data: [{
          message: rows,
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while getting the message.',
        },
      });
    }
  }

  static async getSpecificSent(req, res) {
    const token = req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);

    const {
      id,
    } = req.params;
    if (Number.isNaN(Number(id))) {
      return res.status(400).json({ status: 404, message: 'invalid route' });
    }
    try {
      const newQuery = {
        text: `SELECT sent.messageId, messages.createdOn, messages.subject,
        messages.message, sent.senderId, sent.receiverId,
        messages.parentMessageId, sent.status, users.email, messages.ruserlastname, messages.rusername
        FROM ((sent
        JOIN users ON sent.receiverId = users.id)
        JOIN messages ON sent.messageId = messages.id)
        WHERE messageId = ${id} AND sent.senderId = ${decoded.userId}`,
      };
      const query = {
        text: `UPDATE  inbox
      SET status = 'read'
      WHERE inbox.messageId = ${id} AND inbox.receiverId = ${decoded.userId};
      COMMIT;`,
      };
      await db.query(query);
      const { rows, rowCount } = await db.query(newQuery);
      if (rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Message not found',
        });
      } return res.status(200).json({
        status: 200,
        data: [{
          message: rows,
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while getting the message.',
        },
      });
    }
  }

  static async getSpecificUnread(req, res) {
    const token = req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);

    const {
      id,
    } = req.params;
    if (Number.isNaN(Number(id))) {
      return res.status(400).json({ status: 404, message: 'invalid route' });
    }
    try {
      const newQuery = {
        text: `SELECT inbox.messageId, messages.createdOn, messages.subject,
        messages.message, inbox.sfirstname, inbox.slastname,inbox.senderId, inbox.receiverId,
        messages.parentMessageId, inbox.status, users.email, messages.rusername, messages.ruserlastname
        FROM ((inbox
        JOIN users ON inbox.receiverId = users.id)
        JOIN messages ON inbox.messageId = messages.id) 
        WHERE messageId = ${id} AND inbox.status = 'unread' AND inbox.receiverId = ${decoded.userId}`,
      };
      const { rows, rowCount } = await db.query(newQuery);
      if (rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Message not found',
        });
      } return res.status(200).json({
        status: 200,
        data: [{
          message: rows,
        }],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while getting the message.',
        },
      });
    }
  }

  static async deleteSpecificMessage(req, res) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const {
      id,
    } = req.params;
    if (Number.isNaN(Number(id))) {
      return res.status(400).json({ status: 404, message: 'invalid route' });
    }
    try {
      const query = {
        text: `DELETE FROM inbox WHERE inbox.messageId = ${id}
      AND receiverId = ${decoded.userId}`,
      };
      const { rowCount } = await db.query(query);
      if (rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Message not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          message: 'message deleted succesfully',
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while deleting the inbox message.',
        },
      });
    }
  }

  static async deleteSpecificSent(req, res) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const {
      id,
    } = req.params;
    if (Number.isNaN(Number(id))) {
      return res.status(400).json({ status: 404, message: 'invalid route' });
    }
    try {
      const query = {
        text: `DELETE FROM sent WHERE sent.messageId = ${id}
        AND senderId = ${decoded.userId}`,
      };

      const { rowCount } = await db.query(query);
      if (rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Message not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          message: 'message deleted succesfully',
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: {
          message: 'An error occured while deleting the message.',
        },
      });
    }
  }
}
export default Messages;
