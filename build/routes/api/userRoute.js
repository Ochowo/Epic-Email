"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _UserController = _interopRequireDefault(require("../../controllers/UserController"));

var _signupvalidator = _interopRequireDefault(require("../../middleware/validations/signupvalidator"));

var _signinValidator = _interopRequireDefault(require("../../middleware/validations/signinValidator"));

var router = (0, _express.Router)();
router.post('/auth/signup', _signupvalidator["default"], _UserController["default"].registerUser);
router.post('/auth/signin', _signinValidator["default"], _UserController["default"].login);
var _default = router;
exports["default"] = _default;