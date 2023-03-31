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
}

module.exports = { SalesService };