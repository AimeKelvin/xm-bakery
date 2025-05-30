const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

router.post('/', authenticate, restrictTo('customer'), orderController.placeOrder);
router.get('/:id', authenticate, restrictTo('customer'), orderController.trackOrder);
router.get('/history', authenticate, restrictTo('customer'), orderController.getOrderHistory);
router.put('/:id/status', authenticate, restrictTo('bakery_manager'), orderController.updateOrderStatus);

module.exports = router;