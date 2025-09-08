'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rooms', {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
  name: { type: Sequelize.STRING, allowNull: false },
  isPrivate: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
  updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
});
await queryInterface.addIndex('rooms', ['name']);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rooms');
  }
};