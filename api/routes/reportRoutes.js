const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

router.get('/sales', authenticate, restrictTo('bakery_manager'), reportController.generateSalesReport);
router.get('/inventory', authenticate, restrictTo('bakery_manager'), reportController.generateInventoryReport);

module.exports = router;