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

router.post('/', _helpers.isLoggedIn, _index.groups.newGroup);
router.get('/', _helpers.isLoggedIn, _index.groups.getGroups);
router.patch('/:id/name', _helpers.isLoggedIn, _index.groups.updateGroup);
router.delete('/:id', _helpers.isLoggedIn, _index.groups.deleteGroup);
router.post('/:id/users', _helpers.isLoggedIn, _helpers.validEmail, _index.groups.createUser);
router.get('/:id/users', _helpers.isLoggedIn, _index.groups.getUsers);
router.delete('/:id/users/:userId', _helpers.isLoggedIn, _index.groups.deleteUser);
router.post('/:id/messages', _helpers.isLoggedIn, _index.groups.newMessage);
router.get('/:id/messages', _helpers.isLoggedIn, _index.groups.getMessage);

exports.default = router;