"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.createTable('Messages', {
                id: {
                  allowNull: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.UUIDV4
                },
                parentId: {
                  type: Sequelize.UUID,
                  onDelete: 'CASCADE',
                  references: {
                    model: 'Messages',
                    key: 'id'
                  }
                },
                userId: {
                  type: Sequelize.UUID,
                  onDelete: 'CASCADE',
                  references: {
                    model: 'Users',
                    key: 'id'
                  }
                },
                contentId: {
                  type: Sequelize.UUID,
                  allowNull: false,
                  onDelete: 'CASCADE',
                  references: {
                    model: 'Contents',
                    key: 'id'
                  }
                },
                replyId: {
                  type: Sequelize.UUID,
                  references: {
                    model: 'Messages',
                    key: 'id'
                  }
                },
                groupId: {
                  type: Sequelize.UUID,
                  onDelete: 'CASCADE',
                  references: {
                    model: 'Groups',
                    key: 'id'
                  }
                },
                folderName: {
                  type: Sequelize.STRING,
                  allowNull: false
                },
                isdeleted: {
                  type: Sequelize.BOOLEAN,
                  defaultValue: false
                },
                isFlagged: {
                  type: Sequelize.BOOLEAN,
                  defaultValue: false
                },
                isread: {
                  type: Sequelize.BOOLEAN,
                  defaultValue: false
                },
                isgroupMessage: {
                  type: Sequelize.BOOLEAN,
                  defaultValue: false
                },
                createdAt: {
                  allowNull: false,
                  type: Sequelize.DATE,
                  defaultValue: new Date()
                },
                updatedAt: {
                  allowNull: false,
                  type: Sequelize.DATE,
                  defaultValue: new Date()
                }
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryInterface) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return queryInterface.dropTable('Messages');

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function down(_x3) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};