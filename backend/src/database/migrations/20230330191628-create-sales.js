'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      deliveryDate: {
        type: Sequelize.DATE,
        field: 'delivery_date',
        allowNull: false,
      },
      saleDate: {
        type: Sequelize.DATE,
        field: 'sale_date',
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.DECIMAL(7,2),
        allowNull: false,
        field: 'total_price',
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Sales');
  },
};
