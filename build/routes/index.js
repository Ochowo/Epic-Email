"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _v = _interopRequireDefault(require("./v1"));

var router = _express["default"].Router();

router.use('/api', _v["default"]);
var _default = router;
exports["default"] = _default;