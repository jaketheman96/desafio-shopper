const SaleProductModel = (sequelize, DataTypes) => {
  const SaleProducts = sequelize.define(
    'SaleProducts',
    {
      saleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Sales',
          key: 'id',
        },
        field: 'sale_id',
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Products',
          key: 'id',
        },
        field: 'product_id',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'SaleProducts',
      underscored: true,
    },
  );

  return SaleProducts;
};

module.exports = SaleProductModel;