const { StatusCodes } = require('http-status-codes');
const { ProductsService } = require('../api/service/products.service');
const { Products } = require('../database/models');

class HandleSubtractQtyStock {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.productsModel = Products;
    this.productService = new ProductsService();
  }

  async subtractQtyStock(productId, quantity) {
    let result = 0;
    const { qtyStock } = await this.productService.getQtyStock(productId);
    result = qtyStock - quantity;
    return { id: productId, quantity: result };
  }

  async handleProductQuantity() {
    const { products } = this.req.body;
    const operationResult = products.map(async ({ productId, quantity }) => {
      const operation = await this.subtractQtyStock(productId, quantity);
      return operation;
    });
    const arrayOfResults = await Promise.all(operationResult);
    if (arrayOfResults.some((item) => item.quantity < 0)) {
      return this.res.status(StatusCodes.BAD_REQUEST)
        .json({ message: 'No valid quantity to Product' });
    }
    arrayOfResults.forEach(async ({ id, quantity }) => {
      await this.productsModel.update(
        { qtyStock: quantity },
        { where: { id } },
      );
    });
    return this.next();
  }
}

module.exports = { HandleSubtractQtyStock };