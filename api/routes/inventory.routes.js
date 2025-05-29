module.exports = app => {
  const controller = require('../controllers/inventory.controller');
  const { verifyToken } = require('../middleware/authJwt');

  const router = require('express').Router();
  router.get('/', verifyToken, controller.trackInventory);

  app.use('/api/inventory', router);
};
