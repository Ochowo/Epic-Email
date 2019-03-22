'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();
var groupQuery = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var sqlQuery;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sqlQuery = 'CREATE TABLE IF NOT EXISTS groups\n(id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(255) NULL,\nrole VARCHAR(255) DEFAULT \'member\' NOT NULL, userId INT NOT NULL,\nFOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE)';


            if (process.env.NODE_ENV === 'test') {
              sqlQuery = 'DROP TABLE IF EXISTS groups CASCADE;\n    CREATE TABLE IF NOT EXISTS groups\n    (id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(255) NULL,\n    role VARCHAR(255) DEFAULT \'member\' NOT NULL, userId INT NOT NULL,\n    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE)';
            }
            _context.next = 4;
            return _index2.default.query(sqlQuery).then(function (res) {
              // console.log(res);
            }).catch(function (err) {
              // console.log(err);
            });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function groupQuery() {
    return _ref.apply(this, arguments);
  };
}();
exports.default = groupQuery;