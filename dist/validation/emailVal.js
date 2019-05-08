'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = require('./isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
var validateEmail = function validateEmail(data) {
  var errors = {};
  if (!regex.test(data.email)) {
    errors.email = 'You have entered an invalid email';
  }
  if ((0, _isEmpty2.default)(data.email)) {
    errors.email = 'Email field is empty';
  }
  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};

exports.default = validateEmail;