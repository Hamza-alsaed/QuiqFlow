'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
await queryInterface.createTable('Participants', {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
  role: { type: Sequelize.ENUM('admin', 'member'), allowNull: false, defaultValue: 'member' },
  userId: {
    type: Sequelize.INTEGER, allowNull: false,
    references: { model: 'Users', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'
  },
  roomId: {
    type: Sequelize.INTEGER, allowNull: false,
    references: { model: 'Rooms', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'
  },
  createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
  updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
});
await queryInterface.addConstraint('Participants', {
  fields: ['userId', 'roomId'],
  type: 'unique',
  name: 'Participants_user_room_unique'
});
await queryInterface.addIndex('Participants', ['roomId']);
await queryInterface.addIndex('Participants', ['userId']);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Participants');
  }
};