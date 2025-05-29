module.exports = app => {
  const controller = require('../controllers/product.controller');
  const { verifyToken } = require('../middleware/authJwt');

  const router = require('express').Router();
  router.post('/', verifyToken, controller.create);
  router.get('/', controller.findAll);

  app.use('/api/products', router);
};
