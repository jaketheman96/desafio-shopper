const ProductModel = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'Products',
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
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
      },
      qtyStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'qty_stock',
      },
    },
    {
      timestamps: false,
      tableName: 'Products',
      underscored: true,
    },
  );

  return Products;
};

module.exports = ProductModel;