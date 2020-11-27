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
var Group = _models["default"].Group,
    GroupMembers = _models["default"].GroupMembers,
    User = _models["default"].User;

var GroupService = /*#__PURE__*/function () {
  function GroupService() {
    (0, _classCallCheck2["default"])(this, GroupService);
  }

  (0, _createClass2["default"])(GroupService, null, [{
    key: "getAllGroups",
    value: function () {
      var _getAllGroups = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return GroupMembers.findAll({
                  include: [{
                    model: Group
                  }],
                  where: {
                    UserId: userId
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

      function getAllGroups(_x) {
        return _getAllGroups.apply(this, arguments);
      }

      return getAllGroups;
    }()
  }, {
    key: "createGroup",
    value: function () {
      var _createGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(newGroup) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                return _context2.abrupt("return", Group.create(newGroup));

              case 4:
                _context2.prev = 4;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 4]]);
      }));

      function createGroup(_x2) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
  }, {
    key: "updateGroup",
    value: function () {
      var _updateGroup2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, _updateGroup) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                return _context3.abrupt("return", Group.update(_updateGroup, {
                  where: {
                    id: id
                  }
                }));

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

      function updateGroup(_x3, _x4) {
        return _updateGroup2.apply(this, arguments);
      }

      return updateGroup;
    }()
  }, {
    key: "getAGroup",
    value: function () {
      var _getAGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, userId) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                return _context4.abrupt("return", GroupMembers.findOne({
                  include: [{
                    model: Group
                  }, {
                    model: User
                  }],
                  where: {
                    GroupId: id,
                    UserId: userId
                  }
                }));

              case 4:
                _context4.prev = 4;
                _context4.t0 = _context4["catch"](0);
                console.log(_context4.t0);
                throw _context4.t0;

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 4]]);
      }));

      function getAGroup(_x5, _x6) {
        return _getAGroup.apply(this, arguments);
      }

      return getAGroup;
    }()
  }, {
    key: "deleteGroup",
    value: function () {
      var _deleteGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                return _context5.abrupt("return", Group.destroy({
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

      function deleteGroup(_x7) {
        return _deleteGroup.apply(this, arguments);
      }

      return deleteGroup;
    }()
  }]);
  return GroupService;
}();

var _default = GroupService;
exports["default"] = _default;