const { StatusCodes } = require('http-status-codes');
const { Sales, Users, Products, saleProducts } = require('../../database/models');
const { ProductsService } = require('./products.service');

class SalesService {
  constructor() {
    this.salesModel = Sales;
    this.salesProductsModel = saleProducts;
    this.productsService = new ProductsService();
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

  async getSaleByUserId(userId) {
    const sales = await this.salesModel.findAll({
      where: { userId },
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
    if (!sales) return StatusCodes.NOT_FOUND;
    return sales;
  }

  async postSale(saleInfos) {
    const arrayOfProducts = saleInfos.products;
    await this.salesModel.create(saleInfos).then(async (newOrder) => {
      const newProducts = arrayOfProducts.map(({ productId, quantity }) => ({
        saleId: newOrder.id,
        productId,
        quantity,
      }));
      await this.salesProductsModel.bulkCreate(newProducts);
    });
  }

  async editSaleStatusById(saleId, saleStatus) {
    const saleIdValidation = await this.getSaleById(saleId);
    if (saleIdValidation === 404) return StatusCodes.NOT_FOUND;
    await this.salesModel.update(
      { status: saleStatus },
      { where: { id: saleId } },
    );
    return saleStatus;
  }

  async deleteSale(saleId) {
    const saleIdValidation = await this.getSaleById(saleId);
    if (saleIdValidation === 404) return StatusCodes.NOT_FOUND;
    await this.salesModel.destroy({ where: { id: Number(saleId) } });
  }
}

module.exports = { SalesService };