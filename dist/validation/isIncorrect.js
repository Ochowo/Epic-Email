'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isIncorrect = function isIncorrect(value) {
  return value === 'read' || value === 'draft' || value === 'sent';
};
exports.default = isIncorrect;