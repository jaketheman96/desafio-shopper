const { StatusCodes } = require('http-status-codes');
const { Sales, Users, Products, saleProducts } = require('../../database/models');

class SalesService {
  constructor() {
    this.salesModel = Sales;
    this.salesProductsModel = saleProducts;
  }

  async getAllSales() {
    const allSales = await this.salesModel.findAll({
      include: [
        {
          model: Users,
          as: 'user',
          attributes: { exclude: ['password', 'email', 'role'] },
        },
        {
          model: Products,
          as: 'products',
          attributes: { exclude: ['qtyStock'] },
          through: { attributes: ['quantity'] },
        },
      ],
    });
    return allSales;
  }

  async getSaleById(saleId) {
    const sale = await this.salesModel.findByPk(saleId, {
      include: [
        {
          model: Users,
          as: 'user',
          attributes: { exclude: ['password', 'email', 'role'] },
        },
        {
          model: Products,
          as: 'products',
          attributes: { exclude: ['qtyStock'] },
          through: { attributes: ['quantity'] },
        },
      ],
    });
    if (!sale) return StatusCodes.NOT_FOUND;
    return sale;
  }

  async postSale(saleInfos) {
    const arrayOfProducts = saleInfos.products;
    await this.salesModel.create(saleInfos).then(async (newOrder) => {
      const newProducts = arrayOfProducts.map((product) => ({
        saleId: newOrder.id,
        productId: product.productId,
        quantity: product.quantity,
      }));
      await this.salesProductsModel.bulkCreate(newProducts);
    });
  }
}

module.exports = { SalesService };