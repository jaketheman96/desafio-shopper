const express = require('express');
const { ProductsController } = require('../controller/products.controller');

const productsRoute = express.Router();

productsRoute.get(
  '/',
  (req, res, next) => new ProductsController(req, res, next).getAllProducts(),
);

module.exports = { productsRoute };