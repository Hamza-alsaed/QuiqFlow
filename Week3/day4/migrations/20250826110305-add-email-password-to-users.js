'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      defaultValue: ''
    });
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'email');
    await queryInterface.removeColumn('users', 'password');
  }
};
