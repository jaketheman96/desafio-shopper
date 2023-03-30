/* eslint-disable max-lines-per-function */
const UserModel = (sequelize, DataTypes) => {
  const SaleProducts = sequelize.define(
    'SaleProducts',
    {
      saleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'sales',
          key: 'id',
        },
        field: 'sale_id',
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'products',
          key: 'id',
        },
        field: 'product_id',
      },
    },
  );

  return SaleProducts;
};

module.exports = UserModel;