"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _groupMembersController = _interopRequireDefault(require("../../controllers/groupMembersController"));

var _Authenticate = _interopRequireDefault(require("../../middleware/auth/Authenticate"));

var verifyToken = _Authenticate["default"].verifyToken;
var createGroupMember = _groupMembersController["default"].createGroupMember,
    getAllGroupMembers = _groupMembersController["default"].getAllGroupMembers,
    getAMember = _groupMembersController["default"].getAMember,
    deleteMember = _groupMembersController["default"].deleteMember;

var router = _express["default"].Router();

router.post('/groups/members/:groupId', verifyToken, createGroupMember);
router.get('/groups/members/:groupId', verifyToken, getAllGroupMembers);
router.get('/groups/members/:groupId/:userId', verifyToken, getAMember);
router["delete"]('/groups/members/:groupId/:userId', verifyToken, deleteMember);
var _default = router;
exports["default"] = _default;