/* eslint-disable max-lines-per-function */
const UserModel = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qtyStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'qty_stock',
      },
    },
  );

  return Users;
};

module.exports = UserModel;