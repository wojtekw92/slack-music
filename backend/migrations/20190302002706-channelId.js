'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
    'Links',
    'channelId',
    Sequelize.STRING
  );
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
    'Links',
    'channelId',
    Sequelize.STRING
  );
  }
};
