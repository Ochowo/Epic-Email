"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var signUpValidator = [body('firstName').isLength({
  min: 3
}).withMessage('firstName should not be empty and should be more than three characters').isAlpha().withMessage('firstName should be an alpabet').trim(), body('lastName').isAlpha().withMessage('lastName should be an alphabet').isLength({
  min: 3
}).withMessage('lastName should not be empty and should be more than three characters'), body('userName').optional({
  checkFalsy: true
}).isAlphanumeric().withMessage('username should be an alphanumeric').trim(), body('email').isEmail().withMessage('email should not be empty and should be a valid email').normalizeEmail(), body('password').trim().isLength({
  min: 6
}).withMessage('password should not be empty and should be more than 8 characters'), body('dateOfBirth').optional({
  checkFalsy: true
}).trim().isDate().withMessage('Invalid date'), function signUpValidation(req, res, next) {
  var errorValidation = validationResult(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 422,
      error: errorValidation.array()
    });
  }

  return next();
}];
var _default = signUpValidator;
exports["default"] = _default;