'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    role:   { type: DataTypes.ENUM('admin', 'member'), allowNull: false, defaultValue: 'member' },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    roomId: { type: DataTypes.INTEGER, allowNull: false }
  }, { tableName: 'Participants' });

  Participant.associate = (models) => {
    Participant.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Participant.belongsTo(models.Room, { foreignKey: 'roomId', onDelete: 'CASCADE' });
  };

  return Participant;
};
