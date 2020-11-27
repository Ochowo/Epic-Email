"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your firstname'
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your lastname'
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    },
    email: {
      allowNull: {
        args: false,
        msg: 'Please provide a valid email'
      },
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already exists'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please provide a password'
      }
    },
    sex: {
      type: DataTypes.STRING
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dateOfBirth: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: false,
    scopes: {
      withoutPassword: {
        attributes: {
          exclude: ['password']
        }
      }
    }
  });
  /**
   * compares if the passed arguments are equal
   * @param {string} password
   * @param {object} user
   * @returns {boolean} true or false
   */

  User.prototype.comparePassword = function (password, user) {
    return _bcrypt["default"].compareSync(password, user.password);
  };
  /**
   * encrypt a user's password
   * @param {string} password
   * @returns {string} hashed password
   *
   */


  User.prototype.encryptPassword = function (password) {
    return _bcrypt["default"].hashSync(password, _bcrypt["default"].genSaltSync(6));
  };

  User.beforeCreate(function (user) {
    user.password = user.encryptPassword(user.password);
  });

  User.associate = function (models) {
    User.hasMany(models.Message, {
      onDelete: 'CASCADE',
      foreignKey: 'userId',
      target: 'id'
    });
    User.belongsToMany(models.Group, {
      onDelete: 'CASCADE',
      through: 'GroupMembers'
    });
  };

  return User;
};