"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _GroupController = _interopRequireDefault(require("../../controllers/GroupController"));

var _groupValidator = _interopRequireDefault(require("../../middleware/validations/groupValidator"));

var _Authenticate = _interopRequireDefault(require("../../middleware/auth/Authenticate"));

var verifyToken = _Authenticate["default"].verifyToken;
var createGroup = _GroupController["default"].createGroup,
    getAGroup = _GroupController["default"].getAGroup,
    getAllGroups = _GroupController["default"].getAllGroups,
    updateGroup = _GroupController["default"].updateGroup,
    deleteGroup = _GroupController["default"].deleteGroup;

var router = _express["default"].Router();

router.post('/groups', _groupValidator["default"], verifyToken, createGroup);
router.get('/groups', verifyToken, getAllGroups);
router.get('/groups/:id', verifyToken, getAGroup);
router.put('/groups/:id', verifyToken, updateGroup);
router["delete"]('/groups/:id', verifyToken, deleteGroup);
var _default = router;
exports["default"] = _default;