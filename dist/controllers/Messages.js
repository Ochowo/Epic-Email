'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('babel-polyfill');

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../validation/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var token, decoded, senderId, _req$body, subject, message, receiverEmail, _messageValidator, errors, isValid, userExists, query, _ref2, rows, msg, inboxQuery, status, sentQuery;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = req.headers['x-access-token'];
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                senderId = decoded.userId;
                _req$body = req.body, subject = _req$body.subject, message = _req$body.message, receiverEmail = _req$body.receiverEmail;
                _messageValidator = (0, _index3.messageValidator)(req.body), errors = _messageValidator.errors, isValid = _messageValidator.isValid;

                if (isValid) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({
                  status: 400,
                  error: errors
                }));

              case 7:
                _context.prev = 7;
                _context.next = 10;
                return _index2.default.query('SELECT * FROM users WHERE email=$1', [receiverEmail]);

              case 10:
                userExists = _context.sent.rows[0];

                if (userExists) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Sorry, the receiver email does not exist in the database'
                }));

              case 13:
                query = {
                  text: 'INSERT INTO messages(subject,message,senderId, receiverId) VALUES($1,$2,$3,$4) RETURNING *',
                  values: ['' + subject, '' + message, '' + senderId, '' + userExists.id]
                };
                _context.next = 16;
                return _index2.default.query(query);

              case 16:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                msg = rows[0];
                inboxQuery = {
                  text: 'INSERT INTO inbox(messageId,receiverId,senderId,status) VALUES($1,$2,$3,$4) RETURNING *',
                  values: ['' + msg.id, '' + msg.receiverid, '' + senderId, '' + msg.status]
                };
                _context.next = 22;
                return _index2.default.query(inboxQuery);

              case 22:
                status = 'sent';
                sentQuery = {
                  text: 'INSERT INTO sent(messageId,senderId,receiverId, status) VALUES($1,$2,$3,$4) RETURNING *',
                  values: ['' + msg.id, '' + senderId, '' + msg.receiverid, '' + status]
                };
                _context.next = 26;
                return _index2.default.query(sentQuery);

              case 26:
                return _context.abrupt('return', res.status(201).json({
                  status: 201,
                  data: [{
                    details: rows[0]
                  }]
                }));

              case 29:
                _context.prev = 29;
                _context.t0 = _context['catch'](7);
                return _context.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'Internal server error.'
                  }
                }));

              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 29]]);
      }));

      function newMessage(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return newMessage;
    }()

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
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var token, decoded, query, _ref4, rows, rowCount;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                token = req.body.token || req.query.token || req.headers['x-access-token'];
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                query = {
                  text: 'SELECT inbox.messageId, messages.createdOn, messages.subject,\n      messages.message, inbox.senderId, inbox.receiverId,\n      messages.parentMessageId, inbox.status, users.email \n      FROM ((inbox\n      JOIN users ON inbox.receiverId = users.id)\n      JOIN messages ON inbox.messageId = messages.id) \n      WHERE inbox.receiverId = ' + decoded.userId + ' ORDER BY messageId DESC'
                };
                _context2.prev = 3;
                _context2.next = 6;
                return _index2.default.query(query);

              case 6:
                _ref4 = _context2.sent;
                rows = _ref4.rows;
                rowCount = _ref4.rowCount;

                if (!(rowCount === 0)) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Sorry, no inbox messages for you'
                }));

              case 11:
                return _context2.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    inbox: rows
                  }]
                }));

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](3);
                return _context2.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while getting your inbox messages.'
                  }
                }));

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 14]]);
      }));

      function getAllMessages(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return getAllMessages;
    }()

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
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var token, decoded, query, _ref6, rows, rowCount;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                token = req.headers['x-access-token'];
                // Decode token

                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                query = {
                  text: 'SELECT inbox.messageId, messages.createdOn, messages.subject,\n      messages.message, inbox.senderId, inbox.receiverId,\n      messages.parentMessageId, inbox.status, users.email \n      FROM ((inbox\n      JOIN users ON inbox.receiverId = users.id)\n      JOIN messages ON inbox.messageId = messages.id) \n      WHERE inbox.receiverId = $1  AND inbox.status = \'unread\' ORDER BY messageId DESC;',
                  values: ['' + decoded.userId]
                };
                _context3.prev = 3;
                _context3.next = 6;
                return _index2.default.query(query);

              case 6:
                _ref6 = _context3.sent;
                rows = _ref6.rows;
                rowCount = _ref6.rowCount;

                if (!(rowCount < 1)) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'No unread messages for you'
                }));

              case 11:
                return _context3.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    unread: rows
                  }]
                }));

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3['catch'](3);
                return _context3.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while getting your unread messages.'
                  }
                }));

              case 17:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 14]]);
      }));

      function getUnread(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return getUnread;
    }()
  }, {
    key: 'getSent',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var token, decoded, query, _ref8, rows, rowCount;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                token = req.headers['x-access-token'];
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                query = {
                  text: 'SELECT sent.messageId, messages.createdOn, messages.subject,\n        messages.message, messages.senderId, messages.receiverId,\n        messages.parentMessageId, sent.status, users.email \n        FROM ((sent\n        JOIN users ON sent.receiverId = users.id)\n        JOIN messages ON sent.messageId = messages.id) \n        WHERE sent.receiverId = $1 ORDER BY messageId DESC;',
                  values: ['' + decoded.userId]
                };
                _context4.prev = 3;
                _context4.next = 6;
                return _index2.default.query(query);

              case 6:
                _ref8 = _context4.sent;
                rows = _ref8.rows;
                rowCount = _ref8.rowCount;

                if (!(rowCount < 1)) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'No sent messages for you'
                }));

              case 11:
                return _context4.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    sent: rows
                  }]
                }));

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4['catch'](3);
                return _context4.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while getting your sent messages.'
                  }
                }));

              case 17:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 14]]);
      }));

      function getSent(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return getSent;
    }()
  }, {
    key: 'getSpecificMessage',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var token, decoded, id, newQuery, _ref10, rows, rowCount, query;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                token = req.headers['x-access-token'];
                // Decode token

                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                id = req.params.id;

                if (!Number.isNaN(Number(id))) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt('return', res.status(400).json({ status: 404, message: 'invalid route' }));

              case 5:
                _context5.prev = 5;
                newQuery = {
                  text: 'SELECT inbox.messageId, messages.createdOn, messages.subject,\n        messages.message, inbox.senderId, inbox.receiverId,\n        messages.parentMessageId, inbox.status, users.email \n        FROM ((inbox\n        JOIN users ON inbox.receiverId = users.id)\n        JOIN messages ON inbox.messageId = messages.id)\n        WHERE messageId = ' + id + ' AND inbox.receiverId = ' + decoded.userId
                };
                _context5.next = 9;
                return _index2.default.query(newQuery);

              case 9:
                _ref10 = _context5.sent;
                rows = _ref10.rows;
                rowCount = _ref10.rowCount;
                query = {
                  text: 'UPDATE  inbox\n      SET status = \'read\'\n      WHERE inbox.messageId = ' + id + ' AND inbox.receiverId = ' + decoded.userId + ';\n      COMMIT;'
                };
                _context5.next = 15;
                return _index2.default.query(query);

              case 15:
                if (!(rowCount < 1)) {
                  _context5.next = 17;
                  break;
                }

                return _context5.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Message not found'
                }));

              case 17:
                return _context5.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    message: rows
                  }]
                }));

              case 20:
                _context5.prev = 20;
                _context5.t0 = _context5['catch'](5);
                return _context5.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while getting the message.'
                  }
                }));

              case 23:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[5, 20]]);
      }));

      function getSpecificMessage(_x9, _x10) {
        return _ref9.apply(this, arguments);
      }

      return getSpecificMessage;
    }()
  }, {
    key: 'deleteSpecificMessage',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var token, decoded, id, query, query2;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                token = req.headers['x-access-token'];
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                id = req.params.id;
                _context6.prev = 3;
                query = {
                  text: 'DELETE FROM inbox WHERE inbox.messageId = ' + id + '\n      AND receiverId = ' + decoded.userId
                };
                _context6.next = 7;
                return _index2.default.query(query);

              case 7:
                query2 = {
                  text: 'DELETE FROM sent WHERE sent.messageId = ' + id + '\n      AND senderId = ' + decoded.userId
                };
                _context6.next = 10;
                return _index2.default.query(query2);

              case 10:
                return _context6.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    message: 'message deleted succesfully'
                  }]
                }));

              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6['catch'](3);
                return _context6.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while deleting the message.'
                  }
                }));

              case 16:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[3, 13]]);
      }));

      function deleteSpecificMessage(_x11, _x12) {
        return _ref11.apply(this, arguments);
      }

      return deleteSpecificMessage;
    }()
  }]);

  return Messages;
}();

exports.default = Messages;