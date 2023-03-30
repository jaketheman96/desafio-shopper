const { Users } = require('../../database/models');

class UserService {
  constructor() {
    this.userModel = Users;
  }

  async getAllUsers() {
    const users = await this.userModel.findAll(
      { attributes: { exclude: ['password'] } },
    );
    return users;
  }
}

module.exports = { UserService };