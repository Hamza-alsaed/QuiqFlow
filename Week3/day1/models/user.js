'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { len: [3, 50] } },
    email:    { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } }
  }, { tableName: 'Users' });

  User.associate = (models) => {
    User.belongsToMany(models.Room, { through: models.Participant, foreignKey: 'userId', otherKey: 'roomId' });
    User.hasMany(models.Message, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return User;
};
