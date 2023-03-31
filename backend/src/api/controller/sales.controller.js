const { StatusCodes } = require('http-status-codes');
const { SalesService } = require('../service/sales.service');

class SalesController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.salesService = new SalesService();
  }

  async getAllSales() {
    const response = await this.salesService.getAllSales();
    return this.res.status(StatusCodes.OK).json(response);
  }
}

module.exports = { SalesController };