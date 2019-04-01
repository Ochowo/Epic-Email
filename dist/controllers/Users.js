'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

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
                return _context.abrupt('return', res.status(500).json({
                  status: 500,
                  error: {
                    message: 'An error occured while trying to sign you up, please try again.'
                  }
                }));

              case 24:
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
  }]);

  return Users;
}();

exports.default = Users;