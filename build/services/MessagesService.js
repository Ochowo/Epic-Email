"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = _interopRequireDefault(require("../models"));

/* eslint-disable no-useless-catch */
var Message = _models["default"].Message,
    Content = _models["default"].Content;

var MessageService = /*#__PURE__*/function () {
  function MessageService() {
    (0, _classCallCheck2["default"])(this, MessageService);
  }

  (0, _createClass2["default"])(MessageService, null, [{
    key: "getAllMessages",
    value: function () {
      var _getAllMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Message.findAll({
                  include: [{
                    model: Content
                  }],
                  where: {
                    userId: userId
                  }
                });

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function getAllMessages(_x) {
        return _getAllMessages.apply(this, arguments);
      }

      return getAllMessages;
    }()
  }, {
    key: "getMessageByFolder",
    value: function () {
      var _getMessageByFolder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId, folderName) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                return _context2.abrupt("return", Message.findAll({
                  include: [{
                    model: Content
                  }],
                  where: {
                    userId: userId,
                    folderName: folderName
                  }
                }));

              case 4:
                _context2.prev = 4;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0, 'error');
                throw _context2.t0;

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 4]]);
      }));

      function getMessageByFolder(_x2, _x3) {
        return _getMessageByFolder.apply(this, arguments);
      }

      return getMessageByFolder;
    }()
  }, {
    key: "createMessage",
    value: function () {
      var _createMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(newMessage) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                return _context3.abrupt("return", Message.create(newMessage));

              case 4:
                _context3.prev = 4;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 4]]);
      }));

      function createMessage(_x4) {
        return _createMessage.apply(this, arguments);
      }

      return createMessage;
    }()
  }, {
    key: "updateMessage",
    value: function () {
      var _updateMessage2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userId, id, _updateMessage) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                return _context4.abrupt("return", Message.update(_updateMessage, {
                  where: {
                    userId: userId,
                    id: id
                  }
                }));

              case 4:
                _context4.prev = 4;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 4]]);
      }));

      function updateMessage(_x5, _x6, _x7) {
        return _updateMessage2.apply(this, arguments);
      }

      return updateMessage;
    }()
  }, {
    key: "getAMessage",
    value: function () {
      var _getAMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userId, id) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                return _context5.abrupt("return", Message.findOne({
                  include: [{
                    model: Content
                  }],
                  where: {
                    id: id
                  }
                }));

              case 4:
                _context5.prev = 4;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 4]]);
      }));

      function getAMessage(_x8, _x9) {
        return _getAMessage.apply(this, arguments);
      }

      return getAMessage;
    }()
  }, {
    key: "deleteMessage",
    value: function () {
      var _deleteMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userId, id) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                return _context6.abrupt("return", Message.destroy({
                  where: {
                    userId: userId,
                    id: id
                  }
                }));

              case 4:
                _context6.prev = 4;
                _context6.t0 = _context6["catch"](0);
                throw _context6.t0;

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 4]]);
      }));

      function deleteMessage(_x10, _x11) {
        return _deleteMessage.apply(this, arguments);
      }

      return deleteMessage;
    }()
  }]);
  return MessageService;
}();

var _default = MessageService;
exports["default"] = _default;