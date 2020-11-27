"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var messageValidator = [body('receiverEmail').isEmail().withMessage('Receiver email should not be empty and should be a valid email').normalizeEmail(), function messageValidation(req, res, next) {
  var errorValidation = validationResult(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 422,
      error: errorValidation.array()
    });
  }

  return next();
}];
var _default = messageValidator;
exports["default"] = _default;