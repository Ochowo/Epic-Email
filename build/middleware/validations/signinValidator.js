"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var signInValidator = [body('email').isEmail().withMessage('email should not be empty and should be a valid email').normalizeEmail(), body('password').trim().isLength({
  min: 8
}).withMessage('password should not be empty and should be more than 8 characters'), function signInValidation(req, res, next) {
  var errorValidation = validationResult(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 422,
      error: errorValidation.array()
    });
  }

  return next();
}];
var _default = signInValidator;
exports["default"] = _default;