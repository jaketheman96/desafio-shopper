const { StatusCodes } = require('http-status-codes');
const { Users, Sales } = require('../../database/models');
const { comparePassword, hashPassword } = require('../../helpers/passwordHelper');
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

  async validateByEmail(email) {
    const validation = await this.userModel.findOne({ where: { email } });
    if (validation.email === email) return StatusCodes.CONFLICT;
    return validation;
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
    const login = await this.validateByEmail(email);
    if (!login) return StatusCodes.UNAUTHORIZED;
    const comparingPasswords = await comparePassword(password, login.password);
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

  async registerUser(userInfos) {
    const { name, email, password, role, address } = userInfos;
    const isUserInDb = await this.validateByEmail(email);
    if (isUserInDb === 409) return StatusCodes.CONFLICT;
    const hashedPassword = await hashPassword(password);
    const user = await this.userModel.create(
      { name, email, password: hashedPassword, role, address },
    );
    const token = generateToken(user);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  }
}

module.exports = { UserService };