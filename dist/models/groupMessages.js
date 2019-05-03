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

var grpMsgQuery = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var sqlQuery;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sqlQuery = 'CREATE TABLE IF NOT EXISTS groupMessages\n    (id SERIAL NOT NULL PRIMARY KEY, createdOn TIMESTAMPTZ DEFAULT NOW(), subject VARCHAR(255) NOT NULL,\n    message VARCHAR(255) NOT NULL, parentMessageId INT, status VARCHAR(255) DEFAULT \'unread\' NOT NULL,\n    senderId INT NOT NULL, groupId INT NOT NULL, messageId INT NOT NULL,\n   FOREIGN KEY(groupId) REFERENCES groups(id) ON DELETE CASCADE)';


            if (process.env.NODE_ENV === 'test') {
              sqlQuery = 'DROP TABLE IF EXISTS groupMessages CASCADE;\n  CREATE TABLE IF NOT EXISTS groupMessages\n   (id SERIAL NOT NULL PRIMARY KEY, createdOn TIMESTAMPTZ DEFAULT NOW(), subject VARCHAR(255) NOT NULL,\n    message VARCHAR(255) NOT NULL, parentMessageId INT, status VARCHAR(255) DEFAULT \'unread\' NOT NULL,\n    senderId INT NOT NULL, groupId INT NOT NULL, messageId INT NOT NULL,\n   FOREIGN KEY(groupId) REFERENCES groups(id) ON DELETE CASCADE)';
            }
            // Create groupMessage table in the database
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

  return function grpMsgQuery() {
    return _ref.apply(this, arguments);
  };
}();
exports.default = grpMsgQuery;