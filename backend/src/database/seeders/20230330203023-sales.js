'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Sales', [
      {
        user_id: 3,
        sale_notes: 'Teste',
        sale_date: new Date(),
        status: 'Pendente',
      },
      {
        user_id: 2,
        sale_notes: '',
        sale_date: new Date(),
        status: 'Recebido',
      },
      {
        user_id: 3,
        sale_notes: '',
        sale_date: new Date(),
        status: 'Pendente',
      },
      {
        user_id: 3,
        sale_notes: '',
        sale_date: new Date(),
        status: 'Pendente',
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Sales', null, {});
  }
};
