module.exports = app => {
  const controller = require('../controllers/order.controller');
  const { verifyToken } = require('../middleware/authJwt');

  const router = require('express').Router();
  router.post('/', verifyToken, controller.placeOrder);
  router.get('/', verifyToken, controller.getOrders);

  app.use('/api/orders', router);
};
