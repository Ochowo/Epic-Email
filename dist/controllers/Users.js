'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

require('babel-polyfill');

var _authHelper = require('./authHelper');

var _authHelper2 = _interopRequireDefault(_authHelper);

var _index3 = require('../validation/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();
/**
 *
 *
 * @class Users
 */

var Users = function () {
  function Users() {
    _classCallCheck(this, Users);
  }

  _createClass(Users, null, [{
    key: 'signup',

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
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, email, firstName, lastName, _checkSignupInput, errors, isValid, existingUser, encryptedPassword, query, _ref2, rows, user, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, firstName = _req$body.firstName, lastName = _req$body.lastName;
                _context.prev = 1;
                _checkSignupInput = (0, _index3.checkSignupInput)(req.body), errors = _checkSignupInput.errors, isValid = _checkSignupInput.isValid;

                if (isValid) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', res.status(400).json({
                  status: 400,
                  error: errors
                }));

              case 5:
                _context.next = 7;
                return _index2.default.query('SELECT * FROM users WHERE email=$1', [email]);

              case 7:
                existingUser = _context.sent.rowCount;

                if (!existingUser) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', res.status(409).json({
                  status: 409,
                  error: 'The email ' + email + ' already exists'
                }));

              case 10:
                encryptedPassword = _authHelper2.default.hashPassword(req.body.password);
                query = {
                  text: 'INSERT INTO users(email,firstName,lastName,password) VALUES($1,$2,$3,$4) RETURNING *',
                  values: ['' + email, '' + firstName, '' + lastName, '' + encryptedPassword]
                };
                _context.next = 14;
                return _index2.default.query(query);

              case 14:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                user = rows[0];
                token = _authHelper2.default.generateToken(user.id, user.email);
                return _context.abrupt('return', res.status(201).json({
                  status: 201,
                  data: [{
                    userToken: token,
                    email: email,
                    firstName: firstName,
                    lastName: lastName
                  }]
                }));

              case 21:
                _context.prev = 21;
                _context.t0 = _context['catch'](1);

                console.log(_context.t0);
                return _context.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while trying to sign you up, please try again.'
                  }
                }));

              case 25:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 21]]);
      }));

      function signup(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return signup;
    }()
  }, {
    key: 'signin',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, email, password, _checkSigninInput, errors, isValid, text, _ref4, rows, user, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.prev = 1;
                _checkSigninInput = (0, _index3.checkSigninInput)(req.body), errors = _checkSigninInput.errors, isValid = _checkSigninInput.isValid;

                if (isValid) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', res.status(400).json({
                  status: 400,
                  error: errors
                }));

              case 5:
                text = 'SELECT * FROM users WHERE email = $1';
                _context2.next = 8;
                return _index2.default.query(text, [req.body.email]);

              case 8:
                _ref4 = _context2.sent;
                rows = _ref4.rows;

                if (rows[0]) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('return', res.status(404).json({ status: 404, error: 'Authentication failed. User not found' }));

              case 12:
                if (_authHelper2.default.comparePassword(rows[0].password, password)) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt('return', res.status(401).json({ status: 401, error: 'Authentication failed. Wrong password' }));

              case 14:
                user = rows[0];
                token = _authHelper2.default.generateToken(user.id, user.email);
                return _context2.abrupt('return', res.status(200).json({
                  status: 200,
                  data: [{
                    message: 'Welcome, ' + user.firstname + ' ' + user.lastname,
                    token: token,
                    email: email
                  }]
                }));

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2['catch'](1);

                console.log(_context2.t0);
                return _context2.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while trying to sign you in, please try again.'
                  }
                }));

              case 23:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 19]]);
      }));

      function signin(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return signin;
    }()
  }, {
    key: 'reset',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var email, _emailVal, errors, isValid, text, _ref6, rows, user, token, mailOptions, transporter;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                email = req.body.email;
                _context3.prev = 1;
                _emailVal = (0, _index3.emailVal)(req.body), errors = _emailVal.errors, isValid = _emailVal.isValid;

                if (isValid) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt('return', res.status(400).json({
                  status: 400,
                  error: errors
                }));

              case 5:
                text = 'SELECT * FROM users WHERE email = $1';
                _context3.next = 8;
                return _index2.default.query(text, [email]);

              case 8:
                _ref6 = _context3.sent;
                rows = _ref6.rows;

                if (rows[0]) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt('return', res.status(404).json({ status: 404, error: 'Authentication failed. User not found' }));

              case 12:
                user = rows[0];
                token = _authHelper2.default.generateToken(user.id, user.email);
                mailOptions = {
                  from: 'noreply@epicmail.com',
                  to: email,
                  subject: 'EPIC MAIL Reset Password Link',
                  html: '<h1> reset link </h1>\n       <p> click on the\n      <a href= hhttps://epic-mail04.herokuapp.com/pass.html?token=' + token + '>link</a>\n      to reset your password </p>\n    '
                };
                transporter = _nodemailer2.default.createTransport({
                  service: 'gmail',
                  auth: {
                    user: process.env.SENDER_EMAIL,
                    pass: process.env.SENDER_PASSWORD
                  }
                });

                transporter.sendMail(mailOptions);
                return _context3.abrupt('return', res.status(200).json({
                  status: 200,
                  data: {
                    message: 'Check your email for reset password link',
                    email: email,
                    token: token
                  }
                }));

              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3['catch'](1);

                console.log(_context3.t0);
                return _context3.abrupt('return', res.status(500).json({
                  status: 500,
                  error: 'An error occured while trying to sign you in, please try again.'
                }));

              case 24:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 20]]);
      }));

      function reset(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: 'resetPassword',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var token, decoded, password, _passVal, errors, isValid, text, _ref8, rows, user, hashpassword, Query, _ref9, rowCount, email;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                token = req.params.token;

                console.log(token);
                decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
                password = req.body.password;
                _passVal = (0, _index3.passVal)(req.body), errors = _passVal.errors, isValid = _passVal.isValid;

                if (isValid) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt('return', res.status(400).json({
                  status: 400,
                  error: errors
                }));

              case 7:
                text = 'SELECT * FROM users WHERE email = $1';
                _context4.next = 10;
                return _index2.default.query(text, [decoded.email]);

              case 10:
                _ref8 = _context4.sent;
                rows = _ref8.rows;
                user = rows[0];

                console.log(user, 'pppp');

                if (user) {
                  _context4.next = 16;
                  break;
                }

                return _context4.abrupt('return', {
                  status: 404,
                  error: 'User not found'
                });

              case 16:
                hashpassword = _authHelper2.default.hashPassword(password);
                _context4.prev = 17;
                Query = {
                  text: 'UPDATE users SET password = $1 WHERE email= $2',
                  values: ['' + hashpassword, '' + decoded.email]
                };
                _context4.next = 21;
                return _index2.default.query(Query);

              case 21:
                _ref9 = _context4.sent;
                rowCount = _ref9.rowCount;

                console.log(rowCount, 'popopo');

                if (!(rowCount > 1)) {
                  _context4.next = 26;
                  break;
                }

                return _context4.abrupt('return', res.status(404).json({
                  status: 404,
                  error: 'Password reset unsuccesful'
                }));

              case 26:
                email = decoded.email.email;
                return _context4.abrupt('return', res.status(200).json({
                  status: 200,
                  data: {
                    message: 'password reset sucessfull',
                    email: email
                  }
                }));

              case 30:
                _context4.prev = 30;
                _context4.t0 = _context4['catch'](17);

                console.log(_context4.t0);
                return _context4.abrupt('return', res.status(500).json({
                  status: 500,
                  error: 'internal server error'
                }));

              case 34:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[17, 30]]);
      }));

      function resetPassword(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return resetPassword;
    }()
  }]);

  return Users;
}();

exports.default = Users;