"use strict";

module.exports = function (sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  });

  Group.associate = function (models) {
    Group.belongsToMany(models.User, {
      onDelete: 'CASCADE',
      through: 'GroupMembers',
      as: 'members'
    });
    Group.hasMany(models.Message, {
      onDelete: 'CASCADE',
      foreignKey: 'groupId',
      target: 'id'
    });
  };

  return Group;
};