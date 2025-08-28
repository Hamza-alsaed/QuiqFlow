'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('messages', 'content');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('messages', 'content', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
