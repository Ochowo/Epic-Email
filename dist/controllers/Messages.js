'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../validation/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();
/**
 *
 *
 * @class Messages
 */

var Messages = function () {
  function Messages() {
    _classCallCheck(this, Messages);
  }

  _createClass(Messages, null, [{
    key: 'newMessage',

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
    value: function newMessage(req, res) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var senderId = decoded.userId;

      var _req$body = req.body,
          subject = _req$body.subject,
          message = _req$body.message,
          receiverEmail = _req$body.receiverEmail;

      var _messageValidator = (0, _index3.messageValidator)(req.body),
          errors = _messageValidator.errors,
          isValid = _messageValidator.isValid;

      if (!isValid) {
        return res.status(400).json({
          status: 400,
          error: errors
        });
      }
      var querytxt = {
        text: 'SELECT id FROM users WHERE email = $1',
        values: ['' + receiverEmail]
      };
      _index2.default.query(querytxt, function (err, result) {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: {
              message: 'An error occured while trying to send the message, please try again.'
            }
          });
        }
        if (result.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'Sorry, the receiver email does not exist in the database'
          });
        }
        var receiverId = result.rows[0].id;
        var query = {
          text: 'INSERT INTO messages(subject,message,senderId, receiverId) VALUES($1,$2,$3,$4) RETURNING *',
          values: ['' + subject, '' + message, '' + senderId, '' + receiverId]
        };
        _index2.default.query(query, function (error, dbresult) {
          if (error) {
            console.log(error);
            return res.status(500).json({
              status: 500,
              error: {
                message: 'An error occured while trying to send the message, please try again.'
              }
            });
          }
          var messageId = dbresult.rows[0].id;
          var newStatus = dbresult.rows[0].status;
          var receivedQuery = {
            text: 'INSERT INTO inbox(messageId,receiverId,senderId,status) VALUES($1,$2,$3,$4) RETURNING *',
            values: ['' + messageId, '' + receiverId, '' + senderId, '' + newStatus]
          };
          _index2.default.query(receivedQuery, function (newerr) {
            if (newerr) {
              return res.status(500).json({
                status: 500,
                error: {
                  message: 'An error occured while trying to send the message, please try again.'
                }
              });
            }
            var status = req.query.status;

            var sentQuery = {
              text: 'INSERT INTO sent(messageId,senderId,receiverId, status) VALUES($1,$2,$3,$4) RETURNING *',
              values: ['' + messageId, '' + senderId, '' + receiverId, '' + status]
            };
            _index2.default.query(sentQuery, function (newerrr) {
              if (newerrr) {
                return res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while trying to send the message, please try again.'
                  }
                });
              }
              var statusQuery = {
                text: 'UPDATE sent SET status = \n              \'sent\''
              };
              _index2.default.query(statusQuery, function (statuserr) {
                if (statuserr) {
                  return res.status(500).json({
                    status: 500,
                    error: {
                      message: 'An error occured while trying to update the message status, please try again.'
                    }
                  });
                }
                return null;
              });
              var draftQuery = {
                text: 'INSERT INTO draft(messageId,senderId,receiverId, status) VALUES($1,$2,$3,$4) RETURNING *',
                values: ['' + messageId, '' + senderId, '' + receiverId, '' + status]
              };
              _index2.default.query(draftQuery, function (errorss) {
                if (errorss) {
                  return res.status(500).json({
                    status: 500,
                    error: {
                      message: 'An error occured while trying to send the message, please try again.'
                    }
                  });
                }
                var draftStatus = {
                  text: 'UPDATE draft SET status = \n                \'draft\''
                };
                _index2.default.query(draftStatus, function (drafterror) {
                  if (drafterror) {
                    return res.status(500).json({
                      status: 500,
                      error: {
                        message: 'An error occured while trying to update the message status, please try again.'
                      }
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
                details: dbresult.rows[0]
              }]
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

  }, {
    key: 'getAllMessages',
    value: function getAllMessages(req, res) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var query = {
        text: 'SELECT inbox.messageId, messages.createdOn, messages.subject,\n      messages.message, inbox.senderId, inbox.receiverId,\n      messages.parentMessageId, inbox.status, users.email \n      FROM ((inbox\n      JOIN users ON inbox.receiverId = users.id)\n      JOIN messages ON inbox.messageId = messages.id) \n      WHERE inbox.receiverId = ' + decoded.userId + ' ORDER BY messageId DESC'
      };
      _index2.default.query(query, function (err, result) {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: 'An error occured while retrieving all received messages'
          });
        }
        if (result.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'Sorry, no received messages for you'
          });
        }
        return res.status(200).json({
          status: 200,
          data: [{
            inbox: result.rows
          }]
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

  }, {
    key: 'getUnread',
    value: function getUnread(req, res) {
      // Check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      // Decode token
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var query = {
        text: 'SELECT inbox.messageId, messages.createdOn, messages.subject,\n      messages.message, inbox.senderId, inbox.receiverId,\n      messages.parentMessageId, inbox.status, users.email \n      FROM ((inbox\n      JOIN users ON inbox.receiverId = users.id)\n      JOIN messages ON inbox.messageId = messages.id) \n      WHERE inbox.receiverId = $1  AND inbox.status = \'unread\' ORDER BY messageId DESC;',
        values: ['' + decoded.userId]
      };
      _index2.default.query(query, function (err, result) {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: 'An error occured while retrieving unread messages'
          });
        }
        if (result.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'No unread messages for you'
          });
        }
        return res.status(200).json({
          status: 200,
          data: [{
            unread: result.rows
          }]
        });
      });
    }
  }, {
    key: 'getSent',
    value: function getSent(req, res) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var query = {
        text: 'SELECT sent.messageId, messages.createdOn, messages.subject,\n        messages.message, messages.senderId, messages.receiverId,\n        messages.parentMessageId, sent.status, users.email \n        FROM ((sent\n        JOIN users ON sent.receiverId = users.id)\n        JOIN messages ON sent.messageId = messages.id) \n        WHERE sent.receiverId = $1 ORDER BY messageId DESC;',
        values: ['' + decoded.userId]
      };
      _index2.default.query(query, function (err, result) {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: 'An error occured while retrieving sent messages'
          });
        }
        if (result.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'No sent messages for you'
          });
        }
        return res.status(200).json({
          status: 200,
          data: [{
            Sent: result.rows
          }]
        });
      });
    }
  }, {
    key: 'getSpecificMessage',
    value: function getSpecificMessage(req, res) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      // Decode token
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);

      var id = req.params.id;

      var query = {
        text: 'UPDATE messages\n      SET status = \'read\'\n      WHERE messages.id = ' + id + ';\n      UPDATE  inbox\n      SET status = \'read\'\n      WHERE inbox.messageId = ' + id + ' AND inbox.receiverId = ' + decoded.userId + ';\n      COMMIT;'
      };
      _index2.default.query(query, function (err, result) {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: 'An error occured while trying to get the message'
          });
        }
        if (result.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'Message not found'
          });
        }
        var newQuery = {
          text: 'SELECT * FROM messages WHERE id = ' + id + ' AND messages.receiverId = ' + decoded.userId
        };
        _index2.default.query(newQuery, function (error, newResult) {
          if (error) {
            return res.status(500).json({
              status: 500,
              error: 'An error occured while trying to get the message'
            });
          }
          if (newResult.rowCount < 1) {
            return res.status(404).json({
              status: 404,
              error: 'The message does not exist'
            });
          }
          return res.status(200).json({
            status: 200,
            data: [{
              message: newResult.rows
            }]
          });
        });
        return null;
      });
    }
  }, {
    key: 'deleteSpecificMessage',
    value: function deleteSpecificMessage(req, res) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var id = req.params.id;

      var query = {
        text: 'DELETE FROM messages where id = ' + id + ' AND senderId = ' + decoded.userId + ' OR receiverId = ' + decoded.userId
      };
      _index2.default.query(query, function (err, result) {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: 'An error occured while trying to get the message'
          });
        }
        if (result.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'The message does not exist'
          });
        }
        return res.status(200).json({
          status: 200,
          data: [{
            message: 'message deleted succesfully'
          }]
        });
      });
    }
  }]);

  return Messages;
}();

exports.default = Messages;