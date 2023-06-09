'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'gender',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'users',
        'age',
        Sequelize.STRING
      )
    ]);
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
  }
};
