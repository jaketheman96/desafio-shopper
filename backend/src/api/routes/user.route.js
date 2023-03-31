const express = require('express');
const { UserController } = require('../controller/user.controller');

const userRoutes = express.Router();

userRoutes.get(
  '/',
  (req, res, next) => new UserController(req, res, next).getAllUsers(),
);

userRoutes.get(
  '/:id',
  (req, res, next) => new UserController(req, res, next).getUserById(),
);

userRoutes.post(
  '/login',
  (req, res, next) => new UserController(req, res, next).loginUser(),
);

userRoutes.post(
  '/register',
  (req, res, next) => new UserController(req, res, next).registerUser(),
);

module.exports = { userRoutes };