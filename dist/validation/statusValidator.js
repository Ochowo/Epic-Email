'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = require('./isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isIncorrect = require('./isIncorrect');

var _isIncorrect2 = _interopRequireDefault(_isIncorrect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var statusValidator = function statusValidator(data) {
  var error = {};

  if (!(0, _isIncorrect2.default)(data.status)) {
    error.status = 'incorrect status format';
  }

  return {
    error: error,
    isVeryValid: (0, _isEmpty2.default)(error)
  };
};

exports.default = statusValidator;