const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../service/user.service');

class UserController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.userService = new UserService();
  }

  async getAllUsers() {
    try {
      const response = await this.userService.getAllUsers();
      return this.res.status(StatusCodes.OK).json(response);
    } catch (error) {
      this.next(error);
    }
  }
}

module.exports = { UserController };