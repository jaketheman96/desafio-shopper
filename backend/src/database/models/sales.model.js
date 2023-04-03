const SaleModel = (sequelize, DataTypes) => {
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
          model: 'Users',
          key: 'id',
        },
      },
      deliveryDate: {
        type: DataTypes.DATE,
        field: 'delivery_date',
        allowNull: false,
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
      totalPrice: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
        field: 'total_price',
      }
    },
    {
      timestamps: false,
      tableName: 'Sales',
      underscored: true,
    },
  );

  Sales.associate = (models) => {
    Sales.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  }

  return Sales;
};

module.exports = SaleModel;