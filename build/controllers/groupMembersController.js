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

var _response = _interopRequireDefault(require("../utils/response"));

var _services = require("../services");

var response = new _response["default"]();

var GroupMembersController = /*#__PURE__*/function () {
  function GroupMembersController() {
    (0, _classCallCheck2["default"])(this, GroupMembersController);
  }

  (0, _createClass2["default"])(GroupMembersController, null, [{
    key: "createGroupMember",
    value: function () {
      var _createGroupMember = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var userId, reqUser, groupId, grp, member, createMembers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                userId = req.body.userId;
                reqUser = req.user.userId;
                groupId = req.params.groupId;
                _context.next = 6;
                return _services.groupMemberService.getAMember(groupId, reqUser);

              case 6:
                grp = _context.sent;

                if (grp) {
                  _context.next = 11;
                  break;
                }

                response.setSuccess(404, 'Member not found');
                _context.next = 16;
                break;

              case 11:
                member = {
                  UserId: userId,
                  GroupId: groupId
                };
                _context.next = 14;
                return _services.groupMemberService.createGroupMembers(member);

              case 14:
                createMembers = _context.sent;
                response.setSuccess(201, 'success', createMembers);

              case 16:
                return _context.abrupt("return", response.send(res));

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](0);
                response.setError(500, _context.t0);
                return _context.abrupt("return", response.send(res));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 19]]);
      }));

      function createGroupMember(_x, _x2) {
        return _createGroupMember.apply(this, arguments);
      }

      return createGroupMember;
    }()
  }, {
    key: "getAMember",
    value: function () {
      var _getAMember = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$params, groupId, userId, grp, groupMember;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$params = req.params, groupId = _req$params.groupId, userId = _req$params.userId;
                _context2.prev = 1;
                _context2.next = 4;
                return _services.groupMemberService.getAMember(groupId, userId);

              case 4:
                grp = _context2.sent;

                if (!grp) {
                  response.setSuccess(404, 'Member not found');
                } else {
                  console.log(grp, 'cccccccccccc');
                  groupMember = grp.dataValues;
                  response.setSuccess(200, null, groupMember);
                }

                return _context2.abrupt("return", response.send(res));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);
                response.setError(500, _context2.t0);
                return _context2.abrupt("return", response.send(res));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 9]]);
      }));

      function getAMember(_x3, _x4) {
        return _getAMember.apply(this, arguments);
      }

      return getAMember;
    }()
  }, {
    key: "getAllGroupMembers",
    value: function () {
      var _getAllGroupMembers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var groupId, userId, grps;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                groupId = req.params.groupId;
                userId = req.user.userId;
                _context3.prev = 2;
                console.log(groupId, userId);
                _context3.next = 6;
                return _services.groupMemberService.getAllGroupMembers(userId, groupId);

              case 6:
                grps = _context3.sent;
                console.log(grps, 'eeeeeeeeeeeeeeeeeeee');

                if (grps.length === 0) {
                  response.setSuccess(404, 'Members not found');
                } else {
                  response.setSuccess(200, null, grps);
                }

                return _context3.abrupt("return", response.send(res));

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](2);
                response.setError(500, _context3.t0);
                return _context3.abrupt("return", response.send(res));

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 12]]);
      }));

      function getAllGroupMembers(_x5, _x6) {
        return _getAllGroupMembers.apply(this, arguments);
      }

      return getAllGroupMembers;
    }() //   static async updateGroup(req, res) {
    //     const { id } = req.params;
    //     try {
    //       const [updated] = await groupService.updateGroup(req.body, id);
    //       if (updated) {
    //         groupService.getAGroup(id);
    //         response.setSuccess(200, 'success', updated);
    //         return response.send(res);
    //       }
    //       response.setSuccess(404, 'Group not found');
    //       return response.send(res);
    //     } catch (error) {
    //       response.setError(500, error);
    //       return response.send(res);
    //     }
    //   }

  }, {
    key: "deleteMember",
    value: function () {
      var _deleteMember = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var groupId, userId, adminUser, isAdmin, id, deleted;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                groupId = req.params.groupId;
                userId = req.user.userId;
                _context4.next = 4;
                return _services.groupMemberService.getAMember(groupId, userId);

              case 4:
                adminUser = _context4.sent;
                console.log(adminUser, 'hhhhhhhhhhhhhh');
                isAdmin = adminUser.dataValues.isAdmin;
                id = adminUser.dataValues.userId;

                if (!isAdmin) {
                  response.setError(401, 'Only an admin can delete a group member');
                }

                _context4.prev = 9;
                _context4.next = 12;
                return _services.groupMemberService.deleteGroupMember(groupId, userId);

              case 12:
                deleted = _context4.sent;

                if (!deleted) {
                  _context4.next = 16;
                  break;
                }

                response.setSuccess(200, 'success');
                return _context4.abrupt("return", response.send(res));

              case 16:
                response.setSuccess(404, 'Member not found');
                return _context4.abrupt("return", response.send(res));

              case 20:
                _context4.prev = 20;
                _context4.t0 = _context4["catch"](9);
                console.log(_context4.t0, 'vvvvvvvvvv');
                response.setError(500, _context4.t0);
                return _context4.abrupt("return", response.send(res));

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[9, 20]]);
      }));

      function deleteMember(_x7, _x8) {
        return _deleteMember.apply(this, arguments);
      }

      return deleteMember;
    }()
  }]);
  return GroupMembersController;
}();

var _default = GroupMembersController;
exports["default"] = _default;