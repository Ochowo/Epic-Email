"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _MessageController = _interopRequireDefault(require("../../controllers/MessageController"));

var _Authenticate = _interopRequireDefault(require("../../middleware/auth/Authenticate"));

var verifyToken = _Authenticate["default"].verifyToken;
var createMessage = _MessageController["default"].createMessage,
    sendDraft = _MessageController["default"].sendDraft,
    getAMessage = _MessageController["default"].getAMessage,
    getAllMessages = _MessageController["default"].getAllMessages,
    updateMessage = _MessageController["default"].updateMessage,
    deleteMessage = _MessageController["default"].deleteMessage,
    getMessageByFolder = _MessageController["default"].getMessageByFolder;

var router = _express["default"].Router();

router.post('/messages', verifyToken, createMessage);
router.get('/messages/folder', verifyToken, getMessageByFolder);
router.get('/messages', verifyToken, getAllMessages);
router.get('/messages/:id', verifyToken, getAMessage);
router.put('/messages/:id', verifyToken, updateMessage);
router.put('/messages/draft/:id', verifyToken, sendDraft);
router["delete"]('/messages/:id', verifyToken, deleteMessage);
var _default = router;
exports["default"] = _default;