'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = require('./isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passwordVal = function passwordVal(data) {
  var errors = {};
  if ((0, _isEmpty2.default)(data.password) || data.password.length <= 5) {
    errors.password = 'Password must contain a min of 5 characters';
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

exports.default = passwordVal;