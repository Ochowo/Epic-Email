"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _response = _interopRequireDefault(require("../utils/response"));

var _services = require("../services");

var response = new _response["default"]();

var MessageController = /*#__PURE__*/function () {
  function MessageController() {
    (0, _classCallCheck2["default"])(this, MessageController);
  }

  (0, _createClass2["default"])(MessageController, null, [{
    key: "getAMessage",
    value: function () {
      var _getAMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var userId, id, msg;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('herme');
                userId = req.user.userId;
                id = req.params.id;
                _context.prev = 3;
                _context.next = 6;
                return _services.messageService.getAMessage(userId, id);

              case 6:
                msg = _context.sent;

                if (!msg) {
                  console.log('uuu');
                  response.setSuccess(404, 'Message not found');
                } else {
                  console.log('pppppj');
                  response.setSuccess(200, null, msg);
                }

                return _context.abrupt("return", response.send(res));

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](3);
                console.log(_context.t0, 'pppm');
                response.setError(500, _context.t0);
                return _context.abrupt("return", response.send(res));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 11]]);
      }));

      function getAMessage(_x, _x2) {
        return _getAMessage.apply(this, arguments);
      }

      return getAMessage;
    }()
  }, {
    key: "getAllMessages",
    value: function () {
      var _getAllMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var userId, messages;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = req.user.userId;
                _context2.prev = 1;
                _context2.next = 4;
                return _services.messageService.getAllMessages(userId);

              case 4:
                messages = _context2.sent;
                console.log(messages, 'afh');

                if (messages.length < 1) {
                  response.setSuccess(404, 'Message not found');
                } else {
                  response.setSuccess(200, null, messages);
                }

                return _context2.abrupt("return", response.send(res));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);
                response.setError(500, _context2.t0);
                return _context2.abrupt("return", response.send(res));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 10]]);
      }));

      function getAllMessages(_x3, _x4) {
        return _getAllMessages.apply(this, arguments);
      }

      return getAllMessages;
    }()
  }, {
    key: "getMessageByFolder",
    value: function () {
      var _getMessageByFolder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var userId, name, msgs;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('hhh');
                userId = req.user.userId;
                name = req.query.name;
                _context3.prev = 3;
                _context3.next = 6;
                return _services.messageService.getMessageByFolder(userId, name);

              case 6:
                msgs = _context3.sent;

                if (msgs.length < 1) {
                  console.log('naaaa');
                  response.setSuccess(404, 'Message not found');
                } else {
                  response.setSuccess(200, null, msgs);
                }

                return _context3.abrupt("return", response.send(res));

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](3);
                response.setError(500, _context3.t0);
                return _context3.abrupt("return", response.send(res));

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 11]]);
      }));

      function getMessageByFolder(_x5, _x6) {
        return _getMessageByFolder.apply(this, arguments);
      }

      return getMessageByFolder;
    }()
  }, {
    key: "sendDraft",
    value: function () {
      var _sendDraft = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var userId, id, msg, msgContent, contentId, _req$body, subject, body, groupId, receiverEmail, attatchments, receiver, contentBody, sentMessageBody, inboxMessage, message, contentCreation, emailArr, promises, idArray, specificUsers, createInbox;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userId = req.user.userId;
                id = req.params.id;
                _context4.prev = 2;
                _context4.next = 5;
                return _services.messageService.getAMessage(userId, id);

              case 5:
                msg = _context4.sent;
                console.log(msg, 'cv');

                if (!msg) {
                  response.setSuccess(404, 'Message not found');
                }

                msgContent = msg.dataValues.Content.dataValues;
                contentId = msgContent.id;
                _req$body = req.body, subject = _req$body.subject, body = _req$body.body, groupId = _req$body.groupId, receiverEmail = _req$body.receiverEmail, attatchments = _req$body.attatchments;
                receiver = receiverEmail != null ? receiverEmail.toString() : null;
                contentBody = {
                  receiverEmail: receiverEmail != null ? receiver : msgContent.receiverEmail,
                  subject: subject != null ? subject : msgContent.subject,
                  body: body != null ? body : msgContent.body,
                  attatchments: attatchments != null ? attatchments : msgContent.attatchments
                };
                sentMessageBody = {
                  folderName: 'sent',
                  groupId: groupId != null ? groupId : msgContent.groupId,
                  contentId: contentId
                };
                inboxMessage = {
                  folderName: 'inbox',
                  groupId: groupId != null ? groupId : msgContent.groupId,
                  contentId: contentId,
                  replyId: null,
                  parentId: null,
                  isread: false
                };
                console.log(msgContent, sentMessageBody.parentId, 'pareentsss');
                _context4.next = 18;
                return _services.messageService.updateMessage(userId, id, sentMessageBody);

              case 18:
                message = _context4.sent;
                _context4.next = 21;
                return _services.contentService.updateContent(contentId, contentBody);

              case 21:
                contentCreation = _context4.sent;

                if (!(message && contentCreation)) {
                  _context4.next = 36;
                  break;
                }

                console.log(msgContent, 'done');
                emailArr = receiverEmail != null ? receiver : contentBody.receiverEmail.split(',');
                promises = emailArr.map(function (e) {
                  var newEmail = _services.userService.findUser(e);

                  return newEmail;
                });
                console.log(promises, 'prom');
                idArray = [];
                _context4.next = 30;
                return Promise.all(promises);

              case 30:
                specificUsers = _context4.sent;
                specificUsers.map(function (el) {
                  idArray.push(el.dataValues.id);
                  return idArray;
                });
                createInbox = idArray.map(function (ms) {
                  sentMessageBody.userId = ms;

                  var sendMsg = _services.messageService.createMessage(inboxMessage);

                  return sendMsg;
                });
                _context4.next = 35;
                return Promise.all(createInbox);

              case 35:
                response.setSuccess(200, 'Message sent successfully');

              case 36:
                return _context4.abrupt("return", response.send(res));

              case 39:
                _context4.prev = 39;
                _context4.t0 = _context4["catch"](2);
                console.log(_context4.t0);
                response.setError(500, _context4.t0.message);
                return _context4.abrupt("return", response.send(res));

              case 44:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 39]]);
      }));

      function sendDraft(_x7, _x8) {
        return _sendDraft.apply(this, arguments);
      }

      return sendDraft;
    }()
  }, {
    key: "createMessage",
    value: function () {
      var _createMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var _req$user, userId, email, _req$body2, subject, body, replyId, parentId, groupId, receiverEmail, attatchments, receiver, contentBody, createContent, contentId, type, sentMessageBody, msgg, idArray, promises, specificUsers, createInbox;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _req$user = req.user, userId = _req$user.userId, email = _req$user.email;
                _req$body2 = req.body, subject = _req$body2.subject, body = _req$body2.body, replyId = _req$body2.replyId, parentId = _req$body2.parentId, groupId = _req$body2.groupId, receiverEmail = _req$body2.receiverEmail, attatchments = _req$body2.attatchments;
                receiver = receiverEmail.toString();
                contentBody = {
                  senderEmail: email,
                  receiverEmail: receiver,
                  subject: subject,
                  body: body,
                  attatchments: attatchments
                };
                _context5.prev = 4;
                _context5.next = 7;
                return _services.contentService.createContent(contentBody);

              case 7:
                createContent = _context5.sent;
                contentId = createContent.id;
                type = req.query.type;
                sentMessageBody = {
                  parentId: parentId,
                  replyId: replyId,
                  userId: userId,
                  contentId: contentId,
                  folderName: type,
                  isread: true,
                  groupId: groupId
                };

                if (!(receiverEmail.length > 0)) {
                  _context5.next = 35;
                  break;
                }

                sentMessageBody.parentId = parentId != null ? parentId : null;
                sentMessageBody.replyId = replyId != null ? replyId : null;
                sentMessageBody.groupId = groupId != null ? groupId : null;
                _context5.next = 17;
                return _services.messageService.createMessage(sentMessageBody);

              case 17:
                msgg = _context5.sent;
                console.log(msgg, 'msgf');
                idArray = [];

                if (!(type === 'sent')) {
                  _context5.next = 34;
                  break;
                }

                sentMessageBody.folderName = 'inbox';
                sentMessageBody.isread = false;

                if (!(receiverEmail.length > 0)) {
                  _context5.next = 34;
                  break;
                }

                promises = receiverEmail.map(function (e) {
                  var newEmail = _services.userService.findUser(e);

                  return newEmail;
                });
                _context5.next = 27;
                return Promise.all(promises);

              case 27:
                specificUsers = _context5.sent;
                specificUsers.map(function (el) {
                  idArray.push(el.dataValues.id);
                  return idArray;
                });
                createInbox = idArray.map(function (msg) {
                  sentMessageBody.userId = msg;

                  var sendMsg = _services.messageService.createMessage(sentMessageBody);

                  return sendMsg;
                });
                console.log(msgg, 'msg');
                _context5.next = 33;
                return Promise.all(createInbox);

              case 33:
                response.setSuccess(201, 'Message sent successfully', msgg.dataValues);

              case 34:
                if (type === 'draft') {
                  response.setSuccess(201, 'Message sent successfully', msgg.dataValues);
                }

              case 35:
                return _context5.abrupt("return", response.send(res));

              case 38:
                _context5.prev = 38;
                _context5.t0 = _context5["catch"](4);
                console.log(_context5.t0);
                response.setError(500, _context5.t0.message);
                return _context5.abrupt("return", response.send(res));

              case 43:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[4, 38]]);
      }));

      function createMessage(_x9, _x10) {
        return _createMessage.apply(this, arguments);
      }

      return createMessage;
    }()
  }, {
    key: "updateMessage",
    value: function () {
      var _updateMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var userId, id, msggg;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                userId = req.user.userId;
                id = req.params.id;
                _context6.prev = 2;
                _context6.next = 5;
                return _services.messageService.getAMessage(userId, id);

              case 5:
                msggg = _context6.sent;

                if (msggg) {
                  _context6.next = 9;
                  break;
                }

                response.setSuccess(404, 'Message not found');
                return _context6.abrupt("return", response.send(res));

              case 9:
                _context6.next = 11;
                return _services.messageService.updateMessage(userId, id, req.body);

              case 11:
                response.setSuccess(200, 'Message updated successfully', req.body);
                return _context6.abrupt("return", response.send(res));

              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](2);
                response.setError(500, _context6.t0);
                return _context6.abrupt("return", response.send(res));

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 15]]);
      }));

      function updateMessage(_x11, _x12) {
        return _updateMessage.apply(this, arguments);
      }

      return updateMessage;
    }()
  }, {
    key: "deleteMessage",
    value: function () {
      var _deleteMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var userId, id, deleted;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                userId = req.user.userId;
                id = req.params.id;
                _context7.prev = 2;
                _context7.next = 5;
                return _services.messageService.deleteMessage(userId, id);

              case 5:
                deleted = _context7.sent;
                console.log(deleted, 'deleted');

                if (!deleted) {
                  _context7.next = 10;
                  break;
                }

                response.setSuccess(200, 'Message deleted successfully');
                return _context7.abrupt("return", response.send(res));

              case 10:
                response.setSuccess(404, 'Message not found');
                return _context7.abrupt("return", response.send(res));

              case 14:
                _context7.prev = 14;
                _context7.t0 = _context7["catch"](2);
                response.setError(500, _context7.t0);
                return _context7.abrupt("return", response.send(res));

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2, 14]]);
      }));

      function deleteMessage(_x13, _x14) {
        return _deleteMessage.apply(this, arguments);
      }

      return deleteMessage;
    }()
  }]);
  return MessageController;
}();

var _default = MessageController;
exports["default"] = _default;