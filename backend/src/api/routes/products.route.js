const express = require('express');
const { ProductsController } = require('../controller/products.controller');

const productsRoute = express.Router();

productsRoute.get(
  '/',
  (req, res, next) => new ProductsController(req, res, next).getAllProducts(),
);

productsRoute.get(
  '/:id',
  (req, res, next) => new ProductsController(req, res, next).getQtyStock(),
);

module.exports = { productsRoute };