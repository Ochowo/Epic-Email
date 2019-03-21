'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../controllers/index');

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/messages', _helpers.isLoggedIn, _index.message.newMessage);
router.get('/messages', _helpers.isLoggedIn, _index.message.getAllMessages);
router.get('/messages/unread', _helpers.isLoggedIn, _index.message.getUnread);
router.get('/messages/sent', _helpers.isLoggedIn, _index.message.getSent);
router.get('/messages/:id', _helpers.isLoggedIn, _index.message.getSpecificMessage);
router.delete('/messages/:id', _helpers.isLoggedIn, _index.message.deleteSpecificMessage);
exports.default = router;