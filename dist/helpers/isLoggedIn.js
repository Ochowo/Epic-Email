'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var isLoggedIn = function isLoggedIn(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  _jsonwebtoken2.default.verify(token, process.env.SECRET, function (err) {
    if (token === null || token === '' || token === undefined) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized access.'
      });
      // eslint-disable-next-line no-else-return
    } else if (err) {
      return res.status(401).json({
        status: 401,
        error: 'Authentication failed'
      });
    }
    return null;
  });
  return next();
};
exports.default = isLoggedIn;