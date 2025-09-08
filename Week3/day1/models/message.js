'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: { type: DataTypes.TEXT, allowNull: false },
    userId:  { type: DataTypes.INTEGER, allowNull: false },
    roomId:  { type: DataTypes.INTEGER, allowNull: false }
  }, { tableName: 'Messages' });

  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Message.belongsTo(models.Room, { foreignKey: 'roomId', onDelete: 'CASCADE' });
  };

  return Message;
};
