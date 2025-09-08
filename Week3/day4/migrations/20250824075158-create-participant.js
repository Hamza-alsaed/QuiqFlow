'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
await queryInterface.createTable('participants', {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
  role: { type: Sequelize.ENUM('admin', 'member'), allowNull: false, defaultValue: 'member' },
  userId: {
    type: Sequelize.INTEGER, allowNull: false,
    references: { model: 'users', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'
  },
  roomId: {
    type: Sequelize.INTEGER, allowNull: false,
    references: { model: 'rooms', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'
  },
  createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
  updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
});
await queryInterface.addConstraint('participants', {
  fields: ['userId', 'roomId'],
  type: 'unique',
  name: 'Participants_user_room_unique'
});
await queryInterface.addIndex('participants', ['roomId']);
await queryInterface.addIndex('participants', ['userId']);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('participants');
  }
};