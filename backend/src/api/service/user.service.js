const { StatusCodes } = require('http-status-codes');
const { Users, Sales } = require('../../database/models');

class UserService {
  constructor() {
    this.userModel = Users;
  }

  async getAllUsers() {
    const users = await this.userModel.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  }

  async getUserById(userId) {
    const user = await this.userModel.findByPk(userId, {
      include: [{ model: Sales, as: 'sales', attributes: { exclude: ['userId'] } }],
      attributes: { exclude: ['password'] },
    });
    if (!user) return StatusCodes.NOT_FOUND;
    return user;
  }
}

module.exports = { UserService };