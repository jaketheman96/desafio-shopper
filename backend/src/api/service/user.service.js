const { StatusCodes } = require('http-status-codes');
const { Users, Sales } = require('../../database/models');
const { comparePassword } = require('../../helpers/passwordHelper');
const { generateToken } = require('../../helpers/tokenGenerator');

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

  async loginUser(userInfos) {
    const { email, password } = userInfos;
    const login = await this.userModel.findOne({ where: { email } });
    if (!login) return StatusCodes.UNAUTHORIZED;
    const comparingPasswords = await comparePassword(password, login.password);
    console.log(comparingPasswords);
    if (!comparingPasswords) return StatusCodes.UNAUTHORIZED;
    const token = generateToken(login);
    return {
      id: login.id,
      name: login.name,
      email: login.email,
      role: login.role,
      token,
    };
  }
}

module.exports = { UserService };