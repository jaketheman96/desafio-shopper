'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Shopper',
        email: 'shopper@admin.com',
        password: '$2y$10$v05uWE91VPF3Hp/YhGJVGe.1s.pG7X02nZS/rquuusE.LkB76SBYe',
        role: 'admin',
        address: 'Rua shopper 200',
      },
      {
        name: 'Jake Chien',
        email: 'jakechien@email.com',
        password: '$2y$10$9Hiv51DPVN9USw0H7yJCZuJOQDvXt0EppjavU/v9cJ1/54t0iN5de',
        role: 'employee',
        address: 'Rua admin 992'
      },
      {
        name: 'Bruno Mars',
        email: 'brunomars@email.com',
        password: '$2y$10$qsLBTk39C7M4MegZqEZMHuxJNpd9UXdEnjXuauqT5PnfWH0quOnJe',
        role: 'customer',
        address: 'Rua bruno mars 23',
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
