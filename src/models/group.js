module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    description: {
      type: DataTypes.STRING,
    },
  });
  Group.associate = (models) => {
    Group.belongsToMany(models.User, {
      onDelete: 'CASCADE',
      through: 'GroupMembers',
      as: 'members',
    });
    Group.hasMany(models.Message, {
      onDelete: 'CASCADE',
      foreignKey: 'groupId',
      target: 'id',
    });
  };
  return Group;
};
