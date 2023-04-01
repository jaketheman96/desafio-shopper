const { StatusCodes } = require('http-status-codes');
const { Products } = require('../../database/models');

class ProductsService {
  constructor() {
    this.productsModel = Products;
  }

  async getAllProducts() {
    const allProducts = await this.productsModel.findAll();
    return allProducts;
  }

  async getQtyStock(productId) {
    const product = await this.productsModel.findByPk(
      productId,
      { attributes: { exclude: ['id', 'price'] } },
    );
    if (!product) return StatusCodes.NOT_FOUND;
    return product;
  }
}

module.exports = { ProductsService };