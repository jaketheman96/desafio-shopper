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
    const response = await this.userService.getAllUsers();
    return this.res.status(StatusCodes.OK).json(response);
  }

  async getUserById() {
    const { id } = this.req.params;
    const response = await this.userService.getUserById(id);
    if (response === 404) {
      return this.res.status(StatusCodes.NOT_FOUND)
        .json({ message: 'No such user with this id' });
    }
    return this.res.status(StatusCodes.OK).json(response);
  }

  async loginUser() {
    const response = await this.userService.loginUser(this.req.body);
    if (response === 401) {
      return this.res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Email or password is invalid' });
    }
    return this.res.status(StatusCodes.OK).json(response);
  }

  async registerUser() {
    const response = await this.userService.registerUser(this.req.body);
    if (response === 409) {
      return this.res.status(StatusCodes.CONFLICT)
        .json({ message: 'Email already used' });
    }
    return this.res.status(StatusCodes.CREATED).json(response);
  }

  async deleteUser() {
    const { id } = this.req.params;
    const response = await this.userService.deleteUser(id);
    if (response === 404) {
      return this.res.status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    return this.res.status(StatusCodes.OK).json({ message: 'User deleted' });
  }
}

module.exports = { UserController };