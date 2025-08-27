'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('messages', 'text', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('messages', 'text');
  }
};

