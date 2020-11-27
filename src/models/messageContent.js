module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    senderEmail: {
      allowNull: {
        args: false,
        msg: 'Please provide a valid email',
      },
      type: DataTypes.STRING,
    },
    receiverEmail: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    body: {
      type: DataTypes.STRING(1000000),
      allowNull: false,
    },
    attatchments: {
      type: DataTypes.STRING,
    },
  });
  Content.associate = (models) => {
    Content.hasMany(models.Message, {
      foreignKey: 'contentId',
      target: 'id',
      onDelete: 'CASCADE',
    });
  };
  return Content;
};
