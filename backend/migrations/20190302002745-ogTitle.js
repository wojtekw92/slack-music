'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
    'Links',
    'ogTitle',
    Sequelize.STRING
  );
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
    'Links',
    'ogTitle',
    Sequelize.STRING
  );
  }
};
