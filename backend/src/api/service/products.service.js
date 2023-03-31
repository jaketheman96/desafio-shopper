const { Products } = require('../../database/models');

class ProductsService {
  constructor() {
    this.productsModel = Products;
  }

  async getAllProducts() {
    const allProducts = await this.productsModel.findAll();
    return allProducts;
  }
}

module.exports = { ProductsService };