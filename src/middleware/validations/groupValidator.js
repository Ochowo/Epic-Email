const { body, validationResult } = require('express-validator');

const groupValidator = [
  body('name')
    .isAlphanumeric()
    .withMessage('Name should not be an alphabeth or a number'),
  body('description')
    .optional({ checkFalsy: true })
    .isAlphanumeric()
    .withMessage('Description should be an alpabeth or a number'),

  function groupValidation(req, res, next) {
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
export default groupValidator;
