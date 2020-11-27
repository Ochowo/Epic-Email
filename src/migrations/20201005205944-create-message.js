module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      parentId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Messages',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      contentId: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Contents',
          key: 'id',
        },
      },
      replyId: {
        type: Sequelize.UUID,
        references: {
          model: 'Messages',
          key: 'id',
        },
      },
      groupId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Groups',
          key: 'id',
        },
      },
      folderName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isdeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isFlagged: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isread: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isgroupMessage: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Messages');
  },
};
