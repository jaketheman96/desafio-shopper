const express = require('express');
const { UserController } = require('../api/controller/user.controller');

const userRoutes = express.Router();

userRoutes.get('/', (req, res, next) => new UserController(req, res, next).getAllUsers());

module.exports = { userRoutes };