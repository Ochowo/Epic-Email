"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserData = exports.unknownUser = exports.emptyUserData = exports.goodUserData = exports.newUser = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Authenticate = _interopRequireDefault(require("../middleware/auth/Authenticate"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var newUser = {
  email: 'user@gmail.com',
  userName: 'user',
  firstName: 'User',
  lastName: 'Test',
  password: 'password'
};
exports.newUser = newUser;
var goodUserData = {
  email: 'test@gmail.com',
  userName: 'Test',
  lastName: 'Test',
  firstName: 'User',
  password: 'testing123'
};
exports.goodUserData = goodUserData;
var emptyUserData = {
  email: '',
  username: '',
  lastName: '',
  firstName: '',
  password: ''
};
exports.emptyUserData = emptyUserData;

var unknownUser = _Authenticate["default"].generateToken(2000, 'unknown@mail.com', 'unknown');

exports.unknownUser = unknownUser;

var getUserData = function getUserData(args) {
  return _objectSpread(_objectSpread({}, goodUserData), args);
};

exports.getUserData = getUserData;