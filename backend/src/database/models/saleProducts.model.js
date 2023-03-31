const SaleProductModel = (sequelize, DataTypes) => {
  const saleProducts = sequelize.define(
    'saleProducts',
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

  saleProducts.associate = (models) => {
    models.Products.belongsToMany(models.Sales, {
      as: 'sales',
      through: saleProducts,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
    models.Sales.belongsToMany(models.Products, {
      as: 'products',
      through: saleProducts,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
  }

  return saleProducts;
};

module.exports = SaleProductModel;