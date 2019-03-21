'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validEmail = function validEmail(req, res, next) {
  var email = req.body.email;

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid email address'
    });
  }
  return next();
};
exports.default = validEmail;