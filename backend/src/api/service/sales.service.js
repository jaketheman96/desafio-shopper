const { StatusCodes } = require('http-status-codes');
const { Sales, Users, Products } = require('../../database/models');

class SalesService {
  constructor() {
    this.salesModel = Sales;
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
}

module.exports = { SalesService };