const { StatusCodes } = require('http-status-codes');
const { ProductsService } = require('../service/products.service');

class ProductsController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.productsService = new ProductsService();
  }

  async getAllProducts() {
    const response = await this.productsService.getAllProducts();
    return this.res.status(StatusCodes.OK).json(response);
  }
}

module.exports = { ProductsController };