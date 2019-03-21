'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

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
    value: function signup(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          password = _req$body.password;

      var _checkSignupInput = (0, _index3.checkSignupInput)(req.body),
          errors = _checkSignupInput.errors,
          isValid = _checkSignupInput.isValid;

      if (!isValid) {
        return res.status(400).json({
          status: 400,
          error: errors
        });
      }
      var saltRounds = 10;
      var encryptedPassword = _bcrypt2.default.hashSync(password, saltRounds);
      var query = {
        text: 'INSERT INTO users(email,firstName,lastName,password) VALUES($1,$2,$3,$4) RETURNING *',
        values: ['' + email, '' + firstName, '' + lastName, '' + encryptedPassword]
      };
      _index2.default.query(query, function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            status: 500,
            error: 'An error occured while trying to sign you up, please try again.'
          });
        }
        var user = result.rows[0];
        var token = _jsonwebtoken2.default.sign({ email: '' + user.email, userId: '' + user.id }, process.env.SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });
        return res.status(201).json({
          status: 201,
          data: [{
            userToken: token,
            email: email,
            firstName: firstName,
            lastName: lastName
          }]
        });
      });
      return null;
    }
  }, {
    key: 'signin',
    value: function signin(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      var _checkSigninInput = (0, _index3.checkSigninInput)(req.body),
          errors = _checkSigninInput.errors,
          isValid = _checkSigninInput.isValid;

      if (!isValid) {
        return res.status(400).json({
          status: 400,
          error: errors
        });
      }
      var query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: ['' + email]
      };
      _index2.default.query(query, function (err, result) {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: 'An error occured while trying to sign you in, please try again.'
          });
        }
        if (result.rowCount === 0) {
          return res.status(404).json({
            status: 404,
            error: 'Authentication failed. User not found'

          });
        }
        var crypticPassword = result.rows[0].password;
        var validPassword = _bcrypt2.default.compareSync(password, crypticPassword);
        if (!validPassword) {
          return res.status(401).json({
            status: 401,
            error: 'Authentication failed. Wrong password'
          });
        }
        var user = result.rows[0];
        var token = _jsonwebtoken2.default.sign({ email: '' + email, userId: '' + user.id }, process.env.SECRET, {
          expiresIn: 86400
        });
        var _result$rows$ = result.rows[0],
            firstName = _result$rows$.firstName,
            lastName = _result$rows$.lastName;

        return res.status(200).json({
          status: 200,
          data: [{
            message: 'Welcome, ' + firstName + ' ' + lastName,
            token: token,
            email: email
          }]
        });
      });
      return null;
    }
  }]);

  return Users;
}();

exports.default = Users;