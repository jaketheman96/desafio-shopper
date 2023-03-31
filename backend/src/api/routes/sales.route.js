const express = require('express');
const { SalesController } = require('../controller/sales.controller');

const salesRoutes = express.Router();

salesRoutes.get(
  '/',
  (req, res, next) => new SalesController(req, res, next).getAllSales(),
);

salesRoutes.get(
  '/:id',
  (req, res, next) => new SalesController(req, res, next).getSaleById(),
);

module.exports = { salesRoutes };