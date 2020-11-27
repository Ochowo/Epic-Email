module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    parentId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    userId: {
      type: DataTypes.UUID,
      validate: {
        isUUID: 4,
      },
    },
    contentId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
    },
    replyId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    groupId: {
      type: DataTypes.UUID,
      validate: {
        isUUID: 4,
      },
    },
    folderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isdeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isFlagged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isread: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isgroupMessage: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Message.associate = (models) => {
    Message.belongsTo(models.Content, {
      through: 'contentId',
      onDelete: 'SET NULL',
      foreignKey: 'contentId',
      target: 'id',
    });
    Message.belongsTo(models.User, {
      through: 'userId',
      onDelete: 'CASCADE',
      foreignKey: 'userId',
      target: 'id',
    });
    Message.belongsTo(models.Message, {
      onDelete: 'CASCADE',
      as: 'reply',
      foreignKey: 'replyId',
    });
    Message.belongsTo(models.Message, {
      onDelete: 'CASCADE',
      as: 'parent',
      foreignKey: 'parentId',
      target: 'id',
    });
    Message.belongsTo(models.Group, {
      through: 'groupId',
      onDelete: 'CASCADE',
      foreignKey: 'groupId',
      target: 'id',
    });
  };
  return Message;
};
