'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

var _nameValidator3 = require('../validation/nameValidator');

var _nameValidator4 = _interopRequireDefault(_nameValidator3);

var _grpValidator2 = require('../validation/grpValidator');

var _grpValidator3 = _interopRequireDefault(_grpValidator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var Groups = function () {
  function Groups() {
    _classCallCheck(this, Groups);
  }

  _createClass(Groups, null, [{
    key: 'newGroup',
    value: function newGroup(req, res) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var name = req.body.name;

      var _nameValidator = (0, _nameValidator4.default)(req.body),
          errors = _nameValidator.errors,
          isValid = _nameValidator.isValid;

      if (!isValid) {
        return res.status(400).json({
          status: 400,
          error: errors
        });
      }
      var newRole = 'admin';
      var query = {
        text: 'INSERT INTO groups(name,role,userId) VALUES($1,$2,$3) RETURNING *',
        values: ['' + name, '' + newRole, '' + decoded.userId]
      };
      _index2.default.query(query, function (error, result) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: {
              message: 'An error occured while trying to create the group, please try again.'
            }
          });
        }
        return res.status(201).json({
          status: 201,
          data: [{
            details: result.rows[0]
          }]
        });
      });
      return null;
    }
  }, {
    key: 'getGroups',
    value: function getGroups(req, res) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var query = {
        text: 'SELECT * FROM groups WHERE userId = ' + decoded.userId
      };
      _index2.default.query(query, function (eerr, newResult) {
        if (eerr) {
          return res.status(500).json({
            status: 500,
            error: {
              message: 'An error occured while trying to get the group, please try again.'
            }
          });
        }
        if (newResult.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'Sorry, no group found for this user'
          });
        }
        return res.status(200).json({
          status: 200,
          data: [{
            details: newResult.rows
          }]
        });
      });
    }
  }, {
    key: 'updateGroup',
    value: function updateGroup(req, res) {
      // Check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      // Decode token
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var Id = decoded.userId;
      var reqId = req.params.id;
      var name = req.body.name;

      var _nameValidator2 = (0, _nameValidator4.default)(req.body),
          errors = _nameValidator2.errors,
          isValid = _nameValidator2.isValid;

      if (!isValid) {
        return res.status(400).json({
          status: 400,
          error: errors
        });
      }
      var query = {
        text: 'UPDATE groups SET name = $1 WHERE id = $2 AND userId =$3',
        values: ['' + name, '' + reqId, '' + Id]
      };

      _index2.default.query(query, function (errr, Ress) {
        if (errr) {
          return res.status(500).json({
            status: 500,
            error: 'An error occured while trying to update the name of the group, please try again.'
          });
        }
        if (Ress.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'The Group ' + name + ' does not exist for this user'
          });
        }
        var newQuery = {
          text: 'SELECT * FROM groups WHERE id = $1\n        AND userId =$2',
          values: ['' + reqId, '' + Id]
        };
        _index2.default.query(newQuery, function (er, newRes) {
          if (er) {
            return res.status(500).json({
              status: 500,
              error: {
                message: 'An error occured while trying to get the group, please try again.'
              }
            });
          }
          return res.status(200).json({
            status: 200,
            data: [{
              details: newRes.rows
            }]
          });
        });
        return null;
      });
      return null;
    }
  }, {
    key: 'deleteGroup',
    value: function deleteGroup(req, res) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var id = req.params.id;


      var query = {
        text: 'DELETE FROM groups WHERE id = ' + id + ' AND userId = ' + decoded.userId
      };

      _index2.default.query(query, function (errorrs, newestRes) {
        if (errorrs) {
          return res.status(500).json({
            status: 500,
            error: 'An error occured while trying to delete the group please try again.'
          });
        }
        if (newestRes.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'Sorry, requested group not found for this user'
          });
        }
        return res.status(200).json({
          status: 200,
          data: 'Group deleted successfully.'
        });
      });
    }
  }, {
    key: 'createUser',
    value: function createUser(req, res) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var id = req.params.id;
      var email = req.body.email;

      var query = {
        text: 'SELECT * FROM groups WHERE userId = ' + decoded.userId + ' AND id = ' + id
      };
      _index2.default.query(query, function (newesterr, newestResult) {
        if (newesterr) {
          return res.status(500).json({
            status: 500,
            error: {
              message: 'An error occured while trying to get the user, please try again.'
            }
          });
        }
        var gres = newestResult.rows[0].id;
        var newQuery = {
          text: 'SELECT * FROM users WHERE email = $1',
          values: ['' + email]
        };
        _index2.default.query(newQuery, function (newesterror, newesttRes) {
          if (newesterror) {
            return res.status(500).json({
              status: 500,
              error: {
                message: 'An error occured while trying to get the group, please try again.'
              }
            });
          }
          var memberId = newesttRes.rows[0].id;
          var userQuery = {
            text: 'INSERT INTO groupMembers(id,userId,email) VALUES($1,$2,$3) RETURNING *',
            values: ['' + gres, '' + memberId, '' + email]
          };
          _index2.default.query(userQuery, function (memberErr, memberRes) {
            if (memberErr) {
              console.log(memberErr);
              return res.status(500).json({
                status: 500,
                error: 'An error occured while creating this user please try again.'
              });
            }
            return res.status(200).json({
              status: 200,
              data: [{
                details: memberRes.rows[0]
              }]
            });
          });
          return null;
        });
        return null;
      });
    }
  }, {
    key: 'deleteUser',
    value: function deleteUser(req, res) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var id = req.params.id;


      var dquery = {
        text: 'SELECT * FROM groups WHERE UserId = ' + decoded.userId + ' AND id = ' + id
      };

      _index2.default.query(dquery, function (dellError, dResult) {
        if (dellError) {
          console.log(dellError);
          return res.status(500).json({
            status: 500,
            error: 'An error occured while trying to delete the user please try again.'
          });
        }
        var pId = dResult.rows[0].name;
        var gId = dResult.rows[0].id;
        var query = {
          text: 'DELETE FROM groupMembers WHERE id=' + gId + ' AND userId=' + decoded.userId
        };

        _index2.default.query(query, function (delError) {
          if (delError) {
            return res.status(500).json({
              status: 500,
              error: 'An error occured while trying to delete the user please try again.'
            });
          }
          return res.status(200).json({
            status: 200,
            data: 'User  with id => ' + id + ', deleted from the group ' + pId + ' successfully.'
          });
        });
        return null;
      });
    }
  }, {
    key: 'newMessage',
    value: function newMessage(req, res) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var senderId = decoded.userId;

      var _req$body = req.body,
          subject = _req$body.subject,
          message = _req$body.message,
          parentMessageId = _req$body.parentMessageId;

      var reqId = req.params.id;

      var _grpValidator = (0, _grpValidator3.default)(req.body),
          errors = _grpValidator.errors,
          Valid = _grpValidator.Valid;

      if (!Valid) {
        return res.status(400).json({
          status: 400,
          error: errors
        });
      }
      var querytxt = {
        text: 'SELECT * FROM groups WHERE UserId = ' + decoded.userId + ' AND id = ' + reqId
      };
      _index2.default.query(querytxt, function (ertr, result) {
        if (ertr) {
          console.log(ertr);
          return res.status(500).json({
            status: 500,
            error: {
              message: 'An error occured while trying to send the message, please try again.'
            }
          });
        }
        var receiverId = result.rows[0].id;
        var query = {
          text: 'INSERT INTO groupMessages(subject,message,parentMessageId, senderId, groupId) VALUES($1,$2,$3,$4,$5) RETURNING *',
          values: ['' + subject, '' + message, '' + parentMessageId, '' + senderId, '' + receiverId]
        };
        _index2.default.query(query, function (error2, dbresult) {
          if (error2) {
            console.log(error2);
            return res.status(500).json({
              status: 500,
              error: {
                message: 'An error occured while trying to send the message, please try again.'
              }
            });
          }
          return res.status(201).json({
            status: 201,
            data: [{
              details: dbresult.rows[0]
            }]
          });
        });
      });
    }
  }]);

  return Groups;
}();

exports.default = Groups;