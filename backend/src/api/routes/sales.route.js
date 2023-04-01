const express = require('express');
const { HandleSubtractQtyStock } = require('../../middlewares/HandleSubtractQtyStock');
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

salesRoutes.post(
  '/',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new HandleSubtractQtyStock(req, res, next).handleProductQuantity(),
  (req, res, next) => new SalesController(req, res, next).postSale(),
);

salesRoutes.put(
  '/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new SalesController(req, res, next).editSaleStatusById(),
);

salesRoutes.delete(
  '/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new SalesController(req, res, next).deleteSale(),
);

module.exports = { salesRoutes };