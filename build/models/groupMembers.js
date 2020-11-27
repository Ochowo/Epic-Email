"use strict";

module.exports = function (sequelize, DataTypes) {
  var GroupMembers = sequelize.define('GroupMembers', {
    UserId: {
      type: DataTypes.UUID,
      validate: {
        isUUID: 4
      }
    },
    GroupId: {
      type: DataTypes.UUID,
      validate: {
        isUUID: 4
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  GroupMembers.associate = function (models) {
    GroupMembers.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
    GroupMembers.belongsTo(models.Group, {
      foreignKey: 'GroupId'
    });
  };

  return GroupMembers;
};