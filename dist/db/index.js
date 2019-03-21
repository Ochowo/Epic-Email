'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

// database connectionstring
var connectionString = void 0;
console.log(process.env.NODE_ENV);
// Get environment
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_TEST;
} else if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DATABASE_DEVELOPMENT;
} else if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_PRODUCTION;
}
var db = new _pg.Pool({
  connectionString: connectionString
});
exports.default = db;