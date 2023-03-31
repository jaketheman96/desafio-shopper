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

  async getSaleById() {
    const { id } = this.req.params;
    const response = await this.salesService.getSaleById(id);
    if (response === 404) {
      return this.res.status(StatusCodes.NOT_FOUND)
        .json({ message: 'No sale with this id' });
    }
    return this.res.status(StatusCodes.OK).json(response);
  }
}

module.exports = { SalesController };