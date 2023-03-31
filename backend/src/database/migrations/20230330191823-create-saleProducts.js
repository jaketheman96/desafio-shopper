'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SaleProducts', {
      saleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        primaryKey: true,
        field: 'sale_id',
        references: {
          model: 'Sales',
          key: 'id',
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        primaryKey: true,
        field: 'product_id',
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('SaleProducts');
  },
};
