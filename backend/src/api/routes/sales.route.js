const express = require('express');
const { TokenValidator } = require('../../middlewares/TokenValidator');
const { SalesController } = require('../controller/sales.controller');

const salesRoutes = express.Router();

salesRoutes.get(
  '/',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new SalesController(req, res, next).getAllSales(),
);

salesRoutes.get(
  '/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new SalesController(req, res, next).getSaleById(),
);

module.exports = { salesRoutes };