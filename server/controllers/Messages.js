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
      } const query = {
        text: 'INSERT INTO messages(subject,message,senderId, receiverId) VALUES($1,$2,$3,$4) RETURNING *',
        values: [`${subject}`, `${message}`, `${senderId}`, `${userExists.id}`],
      };
      const { rows } = await db.query(query);
      const msg = rows[0];
      const inboxQuery = {
        text: 'INSERT INTO inbox(messageId,receiverId,senderId,status) VALUES($1,$2,$3,$4) RETURNING *',
        values: [`${msg.id}`, `${msg.receiverid}`, `${senderId}`, `${msg.status}`],
      };
      await db.query(inboxQuery);
      const status = 'sent';
      const sentQuery = {
        text: 'INSERT INTO sent(messageId,senderId,receiverId, status) VALUES($1,$2,$3,$4) RETURNING *',
        values: [`${msg.id}`, `${senderId}`, `${msg.receiverid}`, `${status}`],
      };
      await db.query(sentQuery);
      return res.status(201).json({
        status: 201,
        data: [{
          details: rows[0],
        }],
      });
    } catch (error) {
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
      messages.message, inbox.senderId, inbox.receiverId,
      messages.parentMessageId, inbox.status, users.email 
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
        data: [{
          inbox: rows,
        }],
      });
    } catch (error) {
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
      messages.message, inbox.senderId, inbox.receiverId,
      messages.parentMessageId, inbox.status, users.email 
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
        data: [{
          unread: rows,
        }],
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
        messages.message, messages.senderId, messages.receiverId,
        messages.parentMessageId, sent.status, users.email 
        FROM ((sent
        JOIN users ON sent.receiverId = users.id)
        JOIN messages ON sent.messageId = messages.id) 
        WHERE sent.receiverId = $1 ORDER BY messageId DESC;`,
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
        data: [{
          sent: rows,
        }],
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
        messages.parentMessageId, inbox.status, users.email 
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

  static async deleteSpecificMessage(req, res) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const {
      id,
    } = req.params;
    try {
      const query = {
        text: `DELETE FROM inbox WHERE inbox.messageId = ${id}
      AND receiverId = ${decoded.userId}`,
      };

      await db.query(query);
      const query2 = {
        text: `DELETE FROM sent WHERE sent.messageId = ${id}
      AND senderId = ${decoded.userId}`,
      };

      await db.query(query2);

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
