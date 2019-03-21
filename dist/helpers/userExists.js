'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userExists = function userExists(req, res, next) {
  var email = req.body.email;

  var query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: ['' + email]
  };
  _index2.default.query(query, function (err, result) {
    if (err) {
      res.status(409).json({
        status: 409,
        error: 'The email ' + email + ' already exists'
      });
    }
    if (result.rowCount > 0) {
      return res.status(409).json({
        status: 409,
        error: 'the email ' + email + ' is already in use'
      });
    }
    return next();
  });
};
exports.default = userExists;