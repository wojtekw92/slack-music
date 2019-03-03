'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
    'Links',
    'ogDescription',
    Sequelize.STRING
  );
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
    'Links',
    'ogDescription',
    Sequelize.STRING
  );
  }
};
