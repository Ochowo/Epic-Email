const { body, validationResult } = require('express-validator');

const messageValidator = [
  body('receiverEmail')
    .isEmail()
    .withMessage('Receiver email should not be empty and should be a valid email')
    .normalizeEmail(),

  function messageValidation(req, res, next) {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: errorValidation.array(),
      });
    }
    return next();
  },
];
export default messageValidator;
