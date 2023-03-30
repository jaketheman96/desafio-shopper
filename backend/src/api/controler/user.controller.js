const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../service/user.service');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(_req, res, next) {
    try {
      const response = await this.userService.getAllUsers();
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.export = UserController;