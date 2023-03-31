const express = require('express');
const { SalesController } = require('../controller/sales.controller');

const salesRoutes = express.Router();

salesRoutes.get(
  '/',
  (req, res, next) => new SalesController(req, res, next).getAllSales(),
);

module.exports = { salesRoutes };