'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Shopper',
        email: 'shopper@admin.com',
        password: '$2b$10$V3H2ctCc72KHmzOLAgZVOeZ7sqZUTchaaB7hPzhK3OAtpHjSOhOaC',
        role: 'admin',
        address: 'Rua shopper 200',
      },
      {
        name: 'Jake Chien',
        email: 'jakechien@email.com',
        password: '$2b$10$9eEATgO5xpDuSyYNqg4eneGEsWOcrLNh0XCy2puQzvjwseVxTCefW',
        role: 'employee',
        address: 'Rua admin 992'
      },
      {
        name: 'Bruno Mars',
        email: 'brunomars@email.com',
        password: '$2b$10$y.rCw3.4ZRVXJnhHImFGGeG858W8.1tQiOkBmqQQOqXvA1QpbBUb.',
        role: 'customer',
        address: 'Rua bruno mars 23',
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
