'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    name:      { type: DataTypes.STRING, allowNull: false },
    isPrivate: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, { tableName: 'Rooms' });

  Room.associate = (models) => {
    Room.belongsToMany(models.User, { through: models.Participant, foreignKey: 'roomId', otherKey: 'userId' });
    Room.hasMany(models.Message, { foreignKey: 'roomId', onDelete: 'CASCADE' });
  };

  return Room;
};
