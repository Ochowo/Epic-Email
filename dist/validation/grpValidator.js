'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = require('./isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
var grpValidator = function grpValidator(data) {
  var errors = {};
  if ((0, _isEmpty2.default)(data.subject)) {
    errors.subject = 'subject field is empty';
  }
  if ((0, _isEmpty2.default)(data.message)) {
    errors.message = 'message field is empty';
  }
  return {
    errors: errors,
    Valid: (0, _isEmpty2.default)(errors)
  };
};

exports.default = grpValidator;