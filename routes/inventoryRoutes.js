const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

router.get('/', authenticate, restrictTo('bakery_manager'), inventoryController.getInventory);
router.post('/', authenticate, restrictTo('bakery_manager'), inventoryController.updateInventory);

module.exports = router;