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

  async getSaleByUserId() {
    const { userId } = this.req.params;
    const response = await this.salesService.getSaleByUserId(userId);
    if (response === 404) {
      return this.res.status(StatusCodes.NOT_FOUND)
        .json({ message: 'User id is invalid' });
    }
    return this.res.status(StatusCodes.OK).json(response);
  }

  async postSale() {
    await this.salesService.postSale(this.req.body);
    return this.res.status(StatusCodes.CREATED).json({ message: 'Sale created' });
  }

  async editSaleStatusById() {
    const { body, params: { id } } = this.req;
    const saleStatus = await this.salesService.editSaleStatusById(id, body.status);
    if (saleStatus === 404) {
      return this.res.status(StatusCodes.NOT_FOUND)
        .json({ message: 'Id not found' });
    }
    return this.res.status(StatusCodes.OK)
      .json({ message: `Status alterado para ${saleStatus}` });
  }

  async deleteSale() {
    const { id } = this.req.params;
    const destroySale = await this.salesService.deleteSale(id);
    if (destroySale === 404) {
      return this.res.status(StatusCodes.NOT_FOUND)
        .json({ message: 'Id not found' });
    }
    return this.res.status(StatusCodes.OK).json({ message: 'Sale deleted' });
  }
}

module.exports = { SalesController };