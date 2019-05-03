'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrate = undefined;

var _draft = require('./draft');

var _draft2 = _interopRequireDefault(_draft);

var _groupMembers = require('./groupMembers');

var _groupMembers2 = _interopRequireDefault(_groupMembers);

var _groupMessages = require('./groupMessages');

var _groupMessages2 = _interopRequireDefault(_groupMessages);

var _groups = require('./groups');

var _groups2 = _interopRequireDefault(_groups);

var _inbox = require('./inbox');

var _inbox2 = _interopRequireDefault(_inbox);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _sent = require('./sent');

var _sent2 = _interopRequireDefault(_sent);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var migrate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('heyyy');
            _context.next = 3;
            return (0, _users2.default)();

          case 3:
            _context.next = 5;
            return (0, _groups2.default)();

          case 5:
            _context.next = 7;
            return (0, _messages2.default)();

          case 7:
            _context.next = 9;
            return (0, _inbox2.default)();

          case 9:
            _context.next = 11;
            return (0, _sent2.default)();

          case 11:
            _context.next = 13;
            return (0, _draft2.default)();

          case 13:
            _context.next = 15;
            return (0, _groupMessages2.default)();

          case 15:
            _context.next = 17;
            return (0, _groupMembers2.default)();

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function migrate() {
    return _ref.apply(this, arguments);
  };
}();
exports.migrate = migrate;


require('make-runnable');