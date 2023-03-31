const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateToken = (userInfos) => {
  const token = jwt.sign(JSON.stringify(userInfos.id), secret);
  return token;
};

module.exports = { generateToken };
