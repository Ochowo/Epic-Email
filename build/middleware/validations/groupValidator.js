"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var groupValidator = [body('name').isAlphanumeric().withMessage('Name should not be an alphabeth or a number'), body('description').optional({
  checkFalsy: true
}).isAlphanumeric().withMessage('Description should be an alpabeth or a number'), function groupValidation(req, res, next) {
  var errorValidation = validationResult(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 422,
      error: errorValidation.array()
    });
  }

  return next();
}];
var _default = groupValidator;
exports["default"] = _default;