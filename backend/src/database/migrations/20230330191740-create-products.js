/* eslint-disable max-lines-per-function */
/* eslint-disable lines-around-directive */
/* eslint-disable strict */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      qtyStock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'qty_stock',
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Products');
  },
};
