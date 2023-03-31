'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('SaleProducts', [
      {
        sale_id: 1,
        product_id: 16,
        quantity: 5,
      },
      {
        sale_id: 1,
        product_id: 42,
        quantity: 5,
      },
      {
        sale_id: 1,
        product_id: 23,
        quantity: 3,
      },
      {
        sale_id: 2,
        product_id: 25,
        quantity: 4,
      },
      {
        sale_id: 2,
        product_id: 30,
        quantity: 5,
      },
      {
        sale_id: 3,
        product_id: 32,
        quantity: 5,
      },
      {
        sale_id: 4,
        product_id: 16,
        quantity: 1,
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('SaleProducts', null, {});
  }
};
