'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
await queryInterface.createTable('messages', {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
  text: { type: Sequelize.TEXT, allowNull: false },
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
await queryInterface.addIndex('messages', ['roomId', 'createdAt']);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  }
};