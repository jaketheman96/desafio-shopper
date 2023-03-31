const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { Users } = require('../database/models');

const secret = process.env.JWT_SECRET;

class TokenValidator {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async validator() {
    const { authorization: token } = this.req.headers;
    if (!token) {
      return this.res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Token must be provided!' });
    }
    try {
      const decoded = jwt.verify(token, secret);
      const user = await Users.findOne({ where: { id: decoded } });
      if (!user) {
        return this.res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Invalid token!' });
      }
      return this.next();
    } catch (error) {
      return this.res.status(500).json({ message: 'Invalid token!' });
    }
  }
}

module.exports = { TokenValidator };