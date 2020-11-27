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

var GroupController = /*#__PURE__*/function () {
  function GroupController() {
    (0, _classCallCheck2["default"])(this, GroupController);
  }

  (0, _createClass2["default"])(GroupController, null, [{
    key: "createGroup",
    value: function () {
      var _createGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var userId, _req$body, name, description, newGroup, _createGroup2, newMember, ggr;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = req.user.userId;
                _req$body = req.body, name = _req$body.name, description = _req$body.description;
                newGroup = {
                  name: name,
                  description: description
                };
                _context.prev = 3;
                console.log('xz');
                _context.next = 7;
                return _services.groupService.createGroup(newGroup);

              case 7:
                _createGroup2 = _context.sent;
                newMember = {
                  UserId: userId,
                  GroupId: _createGroup2.dataValues.id,
                  isAdmin: true
                };
                console.log(newMember);
                _context.next = 12;
                return _services.groupMemberService.createGroupMembers(newMember);

              case 12:
                ggr = _context.sent;
                console.log(ggr);

                if (ggr.dataValues != null) {
                  response.setSuccess(201, 'success', _createGroup2.dataValues);
                }

                return _context.abrupt("return", response.send(res));

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](3);
                response.setError(500, _context.t0.message);
                return _context.abrupt("return", response.send(res));

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 18]]);
      }));

      function createGroup(_x, _x2) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
  }, {
    key: "getAllGroups",
    value: function () {
      var _getAllGroups = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var userId, grps, groupArr, grr;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = req.user.userId;
                _context2.prev = 1;
                _context2.next = 4;
                return _services.groupService.getAllGroups(userId);

              case 4:
                grps = _context2.sent;

                if (grps.length < 1) {
                  response.setSuccess(404, 'Group not found');
                } else {
                  groupArr = [];
                  grr = grps.map(function (grp) {
                    groupArr.push(grp.Group.dataValues);
                    return groupArr;
                  });
                  response.setSuccess(200, null, grr);
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

      function getAllGroups(_x3, _x4) {
        return _getAllGroups.apply(this, arguments);
      }

      return getAllGroups;
    }()
  }, {
    key: "getAGroup",
    value: function () {
      var _getAGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var id, userId, grp, group;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                userId = req.user.userId;
                _context3.prev = 2;
                _context3.next = 5;
                return _services.groupService.getAGroup(id, userId);

              case 5:
                grp = _context3.sent;

                if (!grp) {
                  response.setSuccess(404, 'Group not found');
                } else {
                  group = grp.dataValues;
                  response.setSuccess(200, null, group);
                }

                return _context3.abrupt("return", response.send(res));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);
                console.log(_context3.t0, 'epp');
                response.setError(500, _context3.t0);
                return _context3.abrupt("return", response.send(res));

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 10]]);
      }));

      function getAGroup(_x5, _x6) {
        return _getAGroup.apply(this, arguments);
      }

      return getAGroup;
    }()
  }, {
    key: "updateGroup",
    value: function () {
      var _updateGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, userId, grp, updated;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log('ooooooooooooooooooooooooooooooooooooooooooooooo');
                id = req.params.id;
                userId = req.user.userId;
                _context4.prev = 3;
                _context4.next = 6;
                return _services.groupService.getAGroup(id, userId);

              case 6:
                grp = _context4.sent;
                console.log(grp, 'eeeeeeeeeeeeeeeeeeeeeee');

                if (grp) {
                  _context4.next = 12;
                  break;
                }

                response.setSuccess(404, 'Group not found');
                _context4.next = 19;
                break;

              case 12:
                _context4.next = 14;
                return _services.groupService.updateGroup(id, req.body);

              case 14:
                updated = _context4.sent;
                console.log(updated, 'ffff');

                if (!updated) {
                  _context4.next = 19;
                  break;
                }

                response.setSuccess(200, 'Group updated successfully', req.body);
                return _context4.abrupt("return", response.send(res));

              case 19:
                return _context4.abrupt("return", response.send(res));

              case 22:
                _context4.prev = 22;
                _context4.t0 = _context4["catch"](3);
                response.setError(500, _context4.t0);
                return _context4.abrupt("return", response.send(res));

              case 26:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[3, 22]]);
      }));

      function updateGroup(_x7, _x8) {
        return _updateGroup.apply(this, arguments);
      }

      return updateGroup;
    }()
  }, {
    key: "deleteGroup",
    value: function () {
      var _deleteGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, userId, adminUser, isAdmin;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log('deleer');
                id = req.params.id;
                userId = req.user.userId;
                _context5.next = 5;
                return _services.groupMemberService.getAMember(id, userId);

              case 5:
                adminUser = _context5.sent;
                console.log(adminUser, 'usrrrrrrrrrrrrrrrrrrr');
                _context5.prev = 7;

                if (!adminUser) {
                  _context5.next = 17;
                  break;
                }

                isAdmin = adminUser.dataValues.isAdmin;

                if (isAdmin) {
                  _context5.next = 13;
                  break;
                }

                response.setError(401, 'Only an an admin can delete a group');
                return _context5.abrupt("return", response.send(res));

              case 13:
                _context5.next = 15;
                return _services.groupService.deleteGroup(id);

              case 15:
                response.setSuccess(200, 'Group deleted successfully');
                return _context5.abrupt("return", response.send(res));

              case 17:
                response.setSuccess(404, 'Group not found');
                return _context5.abrupt("return", response.send(res));

              case 21:
                _context5.prev = 21;
                _context5.t0 = _context5["catch"](7);
                response.setError(500, _context5.t0);
                return _context5.abrupt("return", response.send(res));

              case 25:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[7, 21]]);
      }));

      function deleteGroup(_x9, _x10) {
        return _deleteGroup.apply(this, arguments);
      }

      return deleteGroup;
    }()
  }]);
  return GroupController;
}();

var _default = GroupController;
exports["default"] = _default;