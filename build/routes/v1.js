"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userRoute = _interopRequireDefault(require("./api/userRoute"));

var _groupRoute = _interopRequireDefault(require("./api/groupRoute"));

var _messageRoute = _interopRequireDefault(require("./api/messageRoute"));

var _groupMemberRoute = _interopRequireDefault(require("./api/groupMemberRoute"));

var router = _express["default"].Router();

router.use('/v1', _userRoute["default"]);
router.use('/v1', _messageRoute["default"]);
router.use('/v1', _groupRoute["default"]);
router.use('/v1', _groupMemberRoute["default"]);
var _default = router;
exports["default"] = _default;