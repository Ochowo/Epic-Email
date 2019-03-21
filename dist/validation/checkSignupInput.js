'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = require('./isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reg = /^[a-zA-Z]+$/;
var regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
var validateSigninInput = function validateSigninInput(data) {
  var errors = {};
  if ((0, _isEmpty2.default)(data.firstName) || data.firstName.trim().length < 2) {
    errors.firstName = 'First name must contain a minimum of 2 characters';
  }
  if (!reg.test(data.firstName)) {
    errors.firstName = 'Invalid input for firstname';
  }
  if ((0, _isEmpty2.default)(data.firstName)) {
    errors.firstName = 'First name field is empty';
  }
  if ((0, _isEmpty2.default)(data.lastName) || data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must contain a min of 2';
  }
  if (!reg.test(data.lastName)) {
    errors.lastName = 'Invalid input for last name';
  }
  if ((0, _isEmpty2.default)(data.lastName)) {
    errors.lastName = 'Last name field is empty';
  }

  if (!regex.test(data.email)) {
    errors.email = 'You have entered an invalid email';
  }
  if ((0, _isEmpty2.default)(data.email)) {
    errors.email = 'Email field is empty';
  }

  if ((0, _isEmpty2.default)(data.password) || data.password.length <= 5) {
    errors.password = 'Password name must contain a min of 5 characters';
  }
  if ((0, _isEmpty2.default)(data.password)) {
    errors.password = 'Password field is empty';
  }
  if ((0, _isEmpty2.default)(data.confirmPassword)) {
    errors.confirmPassword = 'Please confirm password';
  }
  if (data.password !== data.confirmPassword) {
    errors.password = 'passwords do not match';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};

exports.default = validateSigninInput;