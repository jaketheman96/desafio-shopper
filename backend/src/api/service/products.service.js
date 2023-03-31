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

  async getProductById(productId) {
    const product = await this.productsModel.findByPk(productId);
    if (!product) return StatusCodes.NOT_FOUND;
    return product;
  }
}

module.exports = { ProductsService };