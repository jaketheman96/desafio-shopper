'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Sales', [
      {
        user_id: 3,
        sale_notes: 'Teste',
        sale_date: new Date(),
        status: 'Pendente',
        total_price: 245.10,
      },
      {
        user_id: 2,
        sale_notes: '',
        sale_date: new Date(),
        status: 'Recebido',
        total_price: 47.11,
      },
      {
        user_id: 3,
        sale_notes: '',
        sale_date: new Date(),
        status: 'Pendente',
        total_price: 39.95,
      },
      {
        user_id: 3,
        sale_notes: '',
        sale_date: new Date(),
        status: 'Pendente',
        total_price: 11.29,
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Sales', null, {});
  }
};
