'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../controllers/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/signup', _index.users.signup);
router.post('/login', _index.users.signin);
router.post('/reset', _index.users.reset);
router.post('/:x-access-token/reset-password', _index.users.resetPassword);

exports.default = router;