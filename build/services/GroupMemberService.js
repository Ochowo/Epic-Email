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
var User = _models["default"].User,
    GroupMembers = _models["default"].GroupMembers,
    Group = _models["default"].Group;

var GroupMemberService = /*#__PURE__*/function () {
  function GroupMemberService() {
    (0, _classCallCheck2["default"])(this, GroupMemberService);
  }

  (0, _createClass2["default"])(GroupMemberService, null, [{
    key: "getAllGroupMembers",
    value: function () {
      var _getAllGroupMembers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId, groupId) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return GroupMembers.findAll({
                  include: [{
                    model: User
                  }, {
                    model: Group
                  }],
                  where: {
                    GroupId: groupId,
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

      function getAllGroupMembers(_x, _x2) {
        return _getAllGroupMembers.apply(this, arguments);
      }

      return getAllGroupMembers;
    }()
  }, {
    key: "createGroupMembers",
    value: function () {
      var _createGroupMembers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(newGroupMember) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                return _context2.abrupt("return", GroupMembers.create(newGroupMember));

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

      function createGroupMembers(_x3) {
        return _createGroupMembers.apply(this, arguments);
      }

      return createGroupMembers;
    }() //   static async updateGroup(id, updateGroup) {
    //     try {
    //       return Group.update(updateGroup, { where: { id } });
    //     } catch (error) {
    //       throw (error);
    //     }
    //   }

  }, {
    key: "getAMember",
    value: function () {
      var _getAMember = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(groupId, userId) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                return _context3.abrupt("return", GroupMembers.findOne({
                  include: [{
                    model: User
                  }],
                  where: {
                    GroupId: groupId,
                    UserId: userId
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

      function getAMember(_x4, _x5) {
        return _getAMember.apply(this, arguments);
      }

      return getAMember;
    }()
  }, {
    key: "deleteGroupMember",
    value: function () {
      var _deleteGroupMember = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(groupId, userId) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                return _context4.abrupt("return", GroupMembers.destroy({
                  where: {
                    GroupId: groupId,
                    UserId: userId
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

      function deleteGroupMember(_x6, _x7) {
        return _deleteGroupMember.apply(this, arguments);
      }

      return deleteGroupMember;
    }()
  }]);
  return GroupMemberService;
}();

var _default = GroupMemberService;
exports["default"] = _default;