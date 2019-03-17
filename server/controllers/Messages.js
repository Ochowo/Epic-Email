import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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
  static newMessage(req, res) {
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const senderId = decoded.userId;

    const {
      subject,
      message,
      parentMessageId,
      receiverEmail,
    } = req.body;
    const { errors, isValid } = messageValidator(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }
    const querytxt = {
      text: 'SELECT id FROM users WHERE email = $1',
      values: [`${receiverEmail}`],
    };
    db.query(querytxt, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: {
            message: 'An error occured while trying to send the message, please try again.',
          },
        });
      }
      const receiverId = result.rows[0].id;
      const query = {
        text: 'INSERT INTO messages(subject,message,parentMessageId, senderId, receiverId) VALUES($1,$2,$3,$4,$5) RETURNING *',
        values: [`${subject}`, `${message}`, `${parentMessageId}`, `${senderId}`, `${receiverId}`],
      };
      db.query(query, (error, dbresult) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: {
              message: 'An error occured while trying to send the message, please try again.',
            },
          });
        }
        const messageId = dbresult.rows[0].id;
        const newStatus = dbresult.rows[0].status;
        const receivedQuery = {
          text: 'INSERT INTO inbox(messageId,receiverId,senderId,status) VALUES($1,$2,$3,$4) RETURNING *',
          values: [`${messageId}`, `${receiverId}`, `${senderId}`, `${newStatus}`],
        };
        db.query(receivedQuery, (newerr) => {
          if (newerr) {
            return res.status(500).json({
              status: 500,
              error: {
                message: 'An error occured while trying to send the message, please try again.',
              },
            });
          }
          const {
            status,
          } = req.query;
          const sentQuery = {
            text: 'INSERT INTO sent(messageId,senderId,receiverId, status) VALUES($1,$2,$3,$4) RETURNING *',
            values: [`${messageId}`, `${senderId}`, `${receiverId}`, `${status}`],
          };
          db.query(sentQuery, (newerrr) => {
            if (newerrr) {
              return res.status(500).json({
                status: 500,
                error: {
                  message: 'An error occured while trying to send the message, please try again.',
                },
              });
            }
            const statusQuery = {
              text: `UPDATE sent SET status = 
              'sent'`,
            };
            db.query(statusQuery, (statuserr) => {
              if (statuserr) {
                return res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while trying to update the message status, please try again.',
                  },
                });
              }
              return null;
            });
            const draftQuery = {
              text: 'INSERT INTO draft(messageId,senderId,receiverId, status) VALUES($1,$2,$3,$4) RETURNING *',
              values: [`${messageId}`, `${senderId}`, `${receiverId}`, `${status}`],
            };
            db.query(draftQuery, (errorss) => {
              if (errorss) {
                return res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while trying to send the message, please try again.',
                  },
                });
              }
              const draftStatus = {
                text: `UPDATE draft SET status = 
                'draft'`,
              };
              db.query(draftStatus, (drafterror) => {
                if (drafterror) {
                  return res.status(500).json({
                    status: 500,
                    error: {
                      message: 'An error occured while trying to update the message status, please try again.',
                    },
                  });
                }
                return null;
              });
              return null;
            });
            return null;
          });
          return res.status(201).json({
            status: 201,
            data: [{
              details: dbresult.rows[0],
            }],
          });
        });
        return null;
      });
      return null;
    });
    return null;
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
  static getAllMessages(req, res) {
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
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
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An error occured while retrieving all received messages',
        });
      }
      if (result.rowCount < 1) {
        // No such order
        return res.status(404).json({
          status: 404,
          error: 'Sorry, no message found this user',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          inbox: result.rows,
        }],
      });
    });
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
  static getUnread(req, res) {
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
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
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An error occured while retrieving unread messages',
        });
      }
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'No unread messages for this user',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          unread: result.rows,
        }],
      });
    });
  }

  static getSent(req, res) {
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
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
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An error occured while retrieving sent messages',
        });
      }
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'No sent messages for this user',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          Sent: result.rows,
        }],
      });
    });
  }

  static getSpecificMessage(req, res) {
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);

    const {
      id,
    } = req.params;
    const query = {
      text: `UPDATE messages
      SET status = 'read'
      WHERE messages.id = ${id};
      UPDATE  inbox
      SET status = 'read'
      WHERE inbox.messageId = ${id} AND inbox.receiverId = ${decoded.userId};
      COMMIT;`,
    };
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An error occured while trying to get the message',
        });
      }
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Message not found',
        });
      }
      const newQuery = {
        text: `SELECT * FROM messages WHERE id = ${id}`,
      };
      db.query(newQuery, (error, newResult) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: 'An error occured while trying to get the message',
          });
        }
        if (newResult.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'Message not found',
          });
        }
        return res.status(200).json({
          status: 200,
          data: [{
            message: newResult.rows,
          }],
        });
      });
      return null;
    });
  }

  static deleteSpecificMessage(req, res) {
    // Check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    const {
      id,
    } = req.params;
    const query = {
      text: `DELETE FROM messages where id = ${id} AND senderId = ${decoded.userId} OR receiverId = ${decoded.userId}`,
    };
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'An error occured while trying to get the message',
        });
      }
      if (result.rowCount < 1) {
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
    });
  }
}
export default Messages;
