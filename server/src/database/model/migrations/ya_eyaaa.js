'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('user', 'admin'),
      defaultValue: 'user',
      allowNull: false
    });
    await queryInterface.addColumn('users', 'status', {
      type: Sequelize.ENUM('wating for confirmation', 'active', 'blocked'),
      defaultValue: 'wating for confirmation',
      allowNull: false
    });
    await queryInterface.addColumn('users', 'numPodcasts', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    });
    await queryInterface.addColumn('users', 'alert', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'role');
    await queryInterface.removeColumn('users', 'status');
    await queryInterface.removeColumn('users', 'numPodcasts');
    await queryInterface.removeColumn('users', 'alert');
  }
};
