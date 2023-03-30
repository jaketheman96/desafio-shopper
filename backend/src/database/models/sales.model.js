/* eslint-disable max-lines-per-function */
const UserModel = (sequelize, DataTypes) => {
  const Sales = sequelize.define(
    'Sales',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      saleNotes: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'sale_notes',
      },
      saleDate: {
        type: DataTypes.DATE,
        field: 'sale_date',
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );

  return Sales;
};

module.exports = UserModel;