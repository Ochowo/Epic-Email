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
        var token, decoded, senderId, _req$body, subject, message, receiverEmail, _messageValidator, errors, isValid, userExists, userName, query, _ref2, rows, msg, inboxQuery, status, sentQuery;

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
                _context.next = 15;
                return _index2.default.query('SELECT * FROM users WHERE email=$1', [decoded.email]);

              case 15:
                userName = _context.sent.rows[0];

                console.log(userName);
                query = {
                  text: 'INSERT INTO messages(subject,message,senderId,receiverId,sfirstname,slastname,rusername,ruserlastname) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
                  values: ['' + subject, '' + message, '' + senderId, '' + userExists.id, '' + userName.firstname, '' + userName.lastname, '' + userExists.firstname, '' + userExists.lastname]
                };
                _context.next = 20;
                return _index2.default.query(query);

              case 20:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                msg = rows[0];
                inboxQuery = {
                  text: 'INSERT INTO inbox(messageId,receiverId,senderId,status,sfirstname,slastname) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
                  values: ['' + msg.id, '' + msg.receiverid, '' + senderId, '' + msg.status, '' + userName.firstname, '' + userName.lastname]
                };
                _context.next = 26;
                return _index2.default.query(inboxQuery);

              case 26:
                status = 'sent';
                sentQuery = {
                  text: 'INSERT INTO sent(messageId,senderId,receiverId,status,rusername,ruserlastname) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
                  values: ['' + msg.id, '' + senderId, '' + msg.receiverid, '' + status, '' + userName.firstname, '' + userName.lastname]
                };
                _context.next = 30;
                return _index2.default.query(sentQuery);

              case 30:
                return _context.abrupt('return', res.status(201).json({
                  status: 201,
                  data: [{
                    details: rows[0]
                  }]
                }));

              case 33:
                _context.prev = 33;
                _context.t0 = _context['catch'](7);

                console.log(_context.t0);
                return _context.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'Internal server error.'
                  }
                }));

              case 37:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 33]]);
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
                  text: 'SELECT inbox.messageId, messages.createdOn, messages.subject,\n      messages.message, inbox.sfirstname, inbox.slastname,inbox.senderId, inbox.receiverId,\n      messages.parentMessageId, inbox.status, users.email, messages.rusername, messages.ruserlastname\n      FROM ((inbox\n      JOIN users ON inbox.receiverId = users.id)\n      JOIN messages ON inbox.messageId = messages.id) \n      WHERE inbox.receiverId = ' + decoded.userId + ' ORDER BY messageId DESC'
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
                  data: {
                    inbox: rows
                  }
                }));

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](3);

                console.log(_context2.t0);
                return _context2.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while getting your inbox messages.'
                  }
                }));

              case 18:
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
                  text: 'SELECT inbox.messageId, messages.createdOn, messages.subject,\n      messages.message, inbox.sfirstname, inbox.slastname,inbox.senderId, inbox.receiverId,\n      messages.parentMessageId, inbox.status, users.email, messages.rusername, messages.ruserlastname\n      FROM ((inbox\n      JOIN users ON inbox.receiverId = users.id)\n      JOIN messages ON inbox.messageId = messages.id) \n      WHERE inbox.receiverId = $1  AND inbox.status = \'unread\' ORDER BY messageId DESC;',
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
                  data: {
                    unread: rows
                  }
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
                  text: 'SELECT sent.messageId, messages.createdOn, messages.subject,\n        messages.message, sent.senderId, messages.receiverId,\n        messages.parentMessageId, sent.status, users.email, messages.rusername, messages.ruserlastname\n        FROM ((sent\n        JOIN users ON sent.senderId = users.id)\n        JOIN messages ON sent.messageId = messages.id) \n        WHERE sent.senderId = $1 ORDER BY messageId DESC;',
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
                  data: {
                    sent: rows
                  }
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
                  text: 'SELECT inbox.messageId, messages.createdOn, messages.subject,\n        messages.message, inbox.senderId, inbox.receiverId,\n        messages.parentMessageId, inbox.status, users.email,inbox.sfirstname, inbox.slastname, messages.ruserlastname, messages.rusername\n        FROM ((inbox\n        JOIN users ON inbox.receiverId = users.id)\n        JOIN messages ON inbox.messageId = messages.id)\n        WHERE messageId = ' + id + ' AND inbox.receiverId = ' + decoded.userId
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
    key: 'getSpecificSent',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var token, decoded, id, newQuery, query, _ref12, rows, rowCount;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                token = req.headers['x-access-token'];
                // Decode token

                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                id = req.params.id;

                if (!Number.isNaN(Number(id))) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt('return', res.status(400).json({ status: 404, message: 'invalid route' }));

              case 5:
                _context6.prev = 5;
                newQuery = {
                  text: 'SELECT sent.messageId, messages.createdOn, messages.subject,\n        messages.message, sent.senderId, sent.receiverId,\n        messages.parentMessageId, sent.status, users.email, messages.ruserlastname, messages.rusername\n        FROM ((sent\n        JOIN users ON sent.receiverId = users.id)\n        JOIN messages ON sent.messageId = messages.id)\n        WHERE messageId = ' + id + ' AND sent.senderId = ' + decoded.userId
                };
                query = {
                  text: 'UPDATE  inbox\n      SET status = \'read\'\n      WHERE inbox.messageId = ' + id + ' AND inbox.receiverId = ' + decoded.userId + ';\n      COMMIT;'
                };
                _context6.next = 10;
                return _index2.default.query(query);

              case 10:
                _context6.next = 12;
                return _index2.default.query(newQuery);

              case 12:
                _ref12 = _context6.sent;
                rows = _ref12.rows;
                rowCount = _ref12.rowCount;

                if (!(rowCount < 1)) {
                  _context6.next = 17;
                  break;
                }

                return _context6.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Message not found'
                }));

              case 17:
                return _context6.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    message: rows
                  }]
                }));

              case 20:
                _context6.prev = 20;
                _context6.t0 = _context6['catch'](5);
                return _context6.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while getting the message.'
                  }
                }));

              case 23:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[5, 20]]);
      }));

      function getSpecificSent(_x11, _x12) {
        return _ref11.apply(this, arguments);
      }

      return getSpecificSent;
    }()
  }, {
    key: 'getSpecificUnread',
    value: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var token, decoded, id, newQuery, _ref14, rows, rowCount;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                token = req.headers['x-access-token'];
                // Decode token

                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                id = req.params.id;

                if (!Number.isNaN(Number(id))) {
                  _context7.next = 5;
                  break;
                }

                return _context7.abrupt('return', res.status(400).json({ status: 404, message: 'invalid route' }));

              case 5:
                _context7.prev = 5;
                newQuery = {
                  text: 'SELECT inbox.messageId, messages.createdOn, messages.subject,\n        messages.message, inbox.sfirstname, inbox.slastname,inbox.senderId, inbox.receiverId,\n        messages.parentMessageId, inbox.status, users.email, messages.rusername, messages.ruserlastname\n        FROM ((inbox\n        JOIN users ON inbox.receiverId = users.id)\n        JOIN messages ON inbox.messageId = messages.id) \n        WHERE messageId = ' + id + ' AND inbox.status = \'unread\' AND inbox.receiverId = ' + decoded.userId
                };
                _context7.next = 9;
                return _index2.default.query(newQuery);

              case 9:
                _ref14 = _context7.sent;
                rows = _ref14.rows;
                rowCount = _ref14.rowCount;

                if (!(rowCount < 1)) {
                  _context7.next = 14;
                  break;
                }

                return _context7.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Message not found'
                }));

              case 14:
                return _context7.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    message: rows
                  }]
                }));

              case 17:
                _context7.prev = 17;
                _context7.t0 = _context7['catch'](5);

                console.log(_context7.t0);
                return _context7.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while getting the message.'
                  }
                }));

              case 21:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[5, 17]]);
      }));

      function getSpecificUnread(_x13, _x14) {
        return _ref13.apply(this, arguments);
      }

      return getSpecificUnread;
    }()
  }, {
    key: 'deleteSpecificMessage',
    value: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var token, decoded, id, query, _ref16, rowCount;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                token = req.headers['x-access-token'];
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                id = req.params.id;

                if (!Number.isNaN(Number(id))) {
                  _context8.next = 5;
                  break;
                }

                return _context8.abrupt('return', res.status(400).json({ status: 404, message: 'invalid route' }));

              case 5:
                _context8.prev = 5;
                query = {
                  text: 'DELETE FROM inbox WHERE inbox.messageId = ' + id + '\n      AND receiverId = ' + decoded.userId
                };
                _context8.next = 9;
                return _index2.default.query(query);

              case 9:
                _ref16 = _context8.sent;
                rowCount = _ref16.rowCount;

                if (!(rowCount < 1)) {
                  _context8.next = 13;
                  break;
                }

                return _context8.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Message not found'
                }));

              case 13:
                return _context8.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    message: 'message deleted succesfully'
                  }]
                }));

              case 16:
                _context8.prev = 16;
                _context8.t0 = _context8['catch'](5);
                return _context8.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while deleting the inbox message.'
                  }
                }));

              case 19:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[5, 16]]);
      }));

      function deleteSpecificMessage(_x15, _x16) {
        return _ref15.apply(this, arguments);
      }

      return deleteSpecificMessage;
    }()
  }, {
    key: 'deleteSpecificSent',
    value: function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var token, decoded, id, query, _ref18, rowCount;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                token = req.headers['x-access-token'];
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                id = req.params.id;

                if (!Number.isNaN(Number(id))) {
                  _context9.next = 5;
                  break;
                }

                return _context9.abrupt('return', res.status(400).json({ status: 404, message: 'invalid route' }));

              case 5:
                _context9.prev = 5;
                query = {
                  text: 'DELETE FROM sent WHERE sent.messageId = ' + id + '\n        AND senderId = ' + decoded.userId
                };
                _context9.next = 9;
                return _index2.default.query(query);

              case 9:
                _ref18 = _context9.sent;
                rowCount = _ref18.rowCount;

                if (!(rowCount < 1)) {
                  _context9.next = 13;
                  break;
                }

                return _context9.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Message not found'
                }));

              case 13:
                return _context9.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    message: 'message deleted succesfully'
                  }]
                }));

              case 16:
                _context9.prev = 16;
                _context9.t0 = _context9['catch'](5);
                return _context9.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while deleting the message.'
                  }
                }));

              case 19:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[5, 16]]);
      }));

      function deleteSpecificSent(_x17, _x18) {
        return _ref17.apply(this, arguments);
      }

      return deleteSpecificSent;
    }()
  }]);

  return Messages;
}();

exports.default = Messages;