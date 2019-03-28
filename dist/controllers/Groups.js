'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

require('babel-polyfill');

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

var _nameValidator3 = require('../validation/nameValidator');

var _nameValidator4 = _interopRequireDefault(_nameValidator3);

var _grpValidator2 = require('../validation/grpValidator');

var _grpValidator3 = _interopRequireDefault(_grpValidator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var Groups = function () {
  function Groups() {
    _classCallCheck(this, Groups);
  }

  _createClass(Groups, null, [{
    key: 'newGroup',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var token, decoded, name, _nameValidator, errors, isValid, nameExists, newRole, query, _ref2, rows, grp, grpQuery;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = req.headers['x-access-token'];
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                name = req.body.name;
                _nameValidator = (0, _nameValidator4.default)(req.body), errors = _nameValidator.errors, isValid = _nameValidator.isValid;

                if (isValid) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({
                  status: 400,
                  error: errors
                }));

              case 6:
                _context.prev = 6;
                _context.next = 9;
                return _index2.default.query('SELECT * FROM groups WHERE name=$1 AND userid=$2', [name, decoded.userId]);

              case 9:
                nameExists = _context.sent.rows[0];

                if (!nameExists) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Sorry, you have an existing group named ' + name
                }));

              case 12:
                newRole = 'admin';
                query = {
                  text: 'INSERT INTO groups(name,role,userId) VALUES($1,$2,$3) RETURNING *',
                  values: ['' + name, '' + newRole, '' + decoded.userId]
                };
                _context.next = 16;
                return _index2.default.query(query);

              case 16:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                grp = rows[0];
                grpQuery = {
                  text: 'INSERT INTO groupMembers(id,name,userId,role,email) VALUES($1,$2,$3,$4,$5) RETURNING *',
                  values: ['' + grp.id, '' + grp.name, '' + grp.userid, '' + newRole, '' + decoded.email]
                };
                _context.next = 22;
                return _index2.default.query(grpQuery);

              case 22:
                return _context.abrupt('return', res.status(201).json({
                  status: 201,
                  data: [{
                    details: rows
                  }]
                }));

              case 25:
                _context.prev = 25;
                _context.t0 = _context['catch'](6);

                console.log(_context.t0);
                return _context.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while creating the group.'
                  }
                }));

              case 29:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 25]]);
      }));

      function newGroup(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return newGroup;
    }()
  }, {
    key: 'getGroups',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var token, decoded, query, _ref4, rows, rowCount;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                token = req.headers['x-access-token'];
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);

                console.log(decoded);
                _context2.prev = 3;
                query = {
                  text: 'SELECT * from groupMembers WHERE userid = ' + decoded.userId + '\n       ORDER BY id DESC'
                };
                _context2.next = 7;
                return _index2.default.query(query);

              case 7:
                _ref4 = _context2.sent;
                rows = _ref4.rows;
                rowCount = _ref4.rowCount;

                if (!(rowCount === 0)) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Sorry, no group found for this user'
                }));

              case 12:
                return _context2.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    details: rows
                  }]
                }));

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2['catch'](3);

                console.log(_context2.t0);
                return _context2.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while getting the group.'
                  }
                }));

              case 19:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 15]]);
      }));

      function getGroups(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return getGroups;
    }()
  }, {
    key: 'updateGroup',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var token, decoded, Id, reqId, name, _nameValidator2, errors, isValid, nameExists, query, newQuery, _ref6, rows, rowCount;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // Check header or url parameters or post parameters for token
                token = req.headers['x-access-token'];
                // Decode token

                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                Id = decoded.userId;
                reqId = req.params.id;
                name = req.body.name;

                if (!Number.isNaN(Number(reqId))) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('return', res.status(400).json({ status: 404, message: 'invalid route' }));

              case 7:
                _nameValidator2 = (0, _nameValidator4.default)(req.body), errors = _nameValidator2.errors, isValid = _nameValidator2.isValid;

                if (isValid) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt('return', res.status(400).json({
                  status: 400,
                  error: errors
                }));

              case 10:
                _context3.prev = 10;
                _context3.next = 13;
                return _index2.default.query('SELECT name FROM groups WHERE name=$1 AND userid=$2', [name, Id]);

              case 13:
                nameExists = _context3.sent.rows[0];

                if (!nameExists) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Sorry, you have an existing group named ' + name
                }));

              case 16:
                query = {
                  text: 'UPDATE groups SET name = $1 WHERE id = $2 AND userId =$3',
                  values: ['' + name, '' + reqId, '' + Id]
                };
                _context3.next = 19;
                return _index2.default.query(query);

              case 19:
                newQuery = {
                  text: 'SELECT * FROM groups WHERE id = $1\n        AND userId =$2',
                  values: ['' + reqId, '' + Id]
                };
                _context3.next = 22;
                return _index2.default.query(newQuery);

              case 22:
                _ref6 = _context3.sent;
                rows = _ref6.rows;
                rowCount = _ref6.rowCount;

                if (!(rowCount < 1)) {
                  _context3.next = 27;
                  break;
                }

                return _context3.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'The Group ' + name + ' does not exist for this user'
                }));

              case 27:
                return _context3.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    details: rows
                  }]
                }));

              case 30:
                _context3.prev = 30;
                _context3.t0 = _context3['catch'](10);
                return _context3.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while updating the group.'
                  }
                }));

              case 33:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[10, 30]]);
      }));

      function updateGroup(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return updateGroup;
    }()
  }, {
    key: 'deleteGroup',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var token, decoded, id, query, _ref8, rowCount;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                token = req.headers['x-access-token'];
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                id = req.params.id;
                _context4.prev = 3;

                if (!Number.isNaN(Number(id))) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt('return', res.status(400).json({ status: 404, message: 'invalid route' }));

              case 6:
                query = {
                  text: 'DELETE FROM groups WHERE id = ' + id + ' AND userId = ' + decoded.userId
                };
                _context4.next = 9;
                return _index2.default.query(query);

              case 9:
                _ref8 = _context4.sent;
                rowCount = _ref8.rowCount;

                if (!(rowCount < 1)) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Sorry, requested group not found for this user'
                }));

              case 13:
                return _context4.abrupt('return', res.status(200).json({
                  status: 200,
                  data: 'Group deleted successfully.'
                }));

              case 16:
                _context4.prev = 16;
                _context4.t0 = _context4['catch'](3);
                return _context4.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while deleting the group.'
                  }
                }));

              case 19:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 16]]);
      }));

      function deleteGroup(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return deleteGroup;
    }()
  }, {
    key: 'createUser',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var token, decoded, id, email, userExists, userAdmin, _ref10, rowCount, userQuery, _ref11, rows;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                token = req.headers['x-access-token'];
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                id = req.params.id;
                email = req.body.email;
                _context5.prev = 4;

                if (!Number.isNaN(Number(id))) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt('return', res.status(400).json({ status: 404, message: 'invalid route' }));

              case 7:
                _context5.next = 9;
                return _index2.default.query('SELECT * FROM users WHERE email=$1', [email]);

              case 9:
                userExists = _context5.sent.rows[0];

                if (userExists) {
                  _context5.next = 12;
                  break;
                }

                return _context5.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Sorry, the email does not exist in the database'
                }));

              case 12:
                _context5.next = 14;
                return _index2.default.query('SELECT * FROM groups WHERE userId = $1 AND id = $2 AND role = $3', [decoded.userId, id, 'admin']);

              case 14:
                userAdmin = _context5.sent.rows[0];

                if (userAdmin) {
                  _context5.next = 17;
                  break;
                }

                return _context5.abrupt('return', res.status(400).json({
                  status: 400,
                  error: {
                    message: 'only an admin can add a user to a group.'
                  }
                }));

              case 17:
                console.log(userExists);
                _context5.next = 20;
                return _index2.default.query('SELECT * FROM groupMembers WHERE userId=$1 AND id=$2', [userExists.userid, id]);

              case 20:
                _ref10 = _context5.sent;
                rowCount = _ref10.rowCount;

                if (!(rowCount > 0)) {
                  _context5.next = 24;
                  break;
                }

                return _context5.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'the user is already a member of the group'
                }));

              case 24:
                userQuery = {
                  text: 'INSERT INTO groupMembers(id,name,userId,email) VALUES($1,$2,$3,$4) RETURNING *',
                  values: ['' + userAdmin.id, '' + userAdmin.name, '' + userExists.id, '' + email]
                };
                _context5.next = 27;
                return _index2.default.query(userQuery);

              case 27:
                _ref11 = _context5.sent;
                rows = _ref11.rows;
                return _context5.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    details: rows[0]
                  }]
                }));

              case 32:
                _context5.prev = 32;
                _context5.t0 = _context5['catch'](4);

                console.log(_context5.t0);
                return _context5.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while adding the user to the group.'
                  }
                }));

              case 36:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[4, 32]]);
      }));

      function createUser(_x9, _x10) {
        return _ref9.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: 'deleteUser',
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var token, decoded, _req$params, userId, id, userAdmin, query;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                token = req.headers['x-access-token'];
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                _req$params = req.params, userId = _req$params.userId, id = _req$params.id;
                _context6.prev = 3;

                if (!Number.isNaN(Number(id))) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt('return', res.status(400).json({ status: 404, message: 'invalid route' }));

              case 6:
                _context6.next = 8;
                return _index2.default.query('SELECT * FROM groups WHERE userId = $1 AND id = $2 AND role = $3', [decoded.userId, id, 'admin']);

              case 8:
                userAdmin = _context6.sent.rows[0];

                if (userAdmin) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt('return', res.status(400).json({
                  status: 400,
                  error: {
                    message: 'only an admin can delete a user from a group.'
                  }
                }));

              case 11:
                query = {
                  text: 'DELETE FROM groupMembers WHERE id=' + id + ' AND userId=' + userId
                };

                _index2.default.query(query);
                return _context6.abrupt('return', res.status(200).json({
                  status: 200,
                  data: 'User  with id => ' + id + ', deleted from the group ' + userAdmin.name + ' successfully.'
                }));

              case 16:
                _context6.prev = 16;
                _context6.t0 = _context6['catch'](3);

                console.log(_context6.t0);
                return _context6.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while adding the user to the group.'
                  }
                }));

              case 20:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[3, 16]]);
      }));

      function deleteUser(_x11, _x12) {
        return _ref12.apply(this, arguments);
      }

      return deleteUser;
    }()
  }, {
    key: 'newMessage',
    value: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var token, decoded, senderId, _req$body, subject, message, parentMessageId, reqId, _grpValidator, errors, Valid, userExists, receiverId, query, _ref14, rows;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                token = req.body.token || req.query.token || req.headers['x-access-token'];
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                senderId = decoded.userId;
                _req$body = req.body, subject = _req$body.subject, message = _req$body.message, parentMessageId = _req$body.parentMessageId;
                reqId = req.params.id;
                _context7.prev = 5;
                _grpValidator = (0, _grpValidator3.default)(req.body), errors = _grpValidator.errors, Valid = _grpValidator.Valid;

                if (Valid) {
                  _context7.next = 9;
                  break;
                }

                return _context7.abrupt('return', res.status(400).json({
                  status: 400,
                  error: errors
                }));

              case 9:
                _context7.next = 11;
                return _index2.default.query('SELECT * FROM groupMembers WHERE id =$1 AND UserId=$2', [reqId, decoded.userId]);

              case 11:
                userExists = _context7.sent.rows[0];

                if (userExists) {
                  _context7.next = 14;
                  break;
                }

                return _context7.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Sorry, no group for this user'
                }));

              case 14:
                receiverId = userExists.id;
                query = {
                  text: 'INSERT INTO groupMessages(subject,message,parentMessageId, senderId, groupId) VALUES($1,$2,$3,$4,$5) RETURNING *',
                  values: ['' + subject, '' + message, '' + parentMessageId, '' + senderId, '' + receiverId]
                };
                _context7.next = 18;
                return _index2.default.query(query);

              case 18:
                _ref14 = _context7.sent;
                rows = _ref14.rows;
                return _context7.abrupt('return', res.status(201).json({
                  status: 201,
                  data: [{
                    details: rows[0]
                  }]
                }));

              case 23:
                _context7.prev = 23;
                _context7.t0 = _context7['catch'](5);

                console.log(_context7.t0);
                return _context7.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while adding the user to the group.'
                  }
                }));

              case 27:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[5, 23]]);
      }));

      function newMessage(_x13, _x14) {
        return _ref13.apply(this, arguments);
      }

      return newMessage;
    }()
  }]);

  return Groups;
}();

exports.default = Groups;