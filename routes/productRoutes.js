const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

router.post('/', authenticate, restrictTo('bakery_manager'), productController.addProduct);
router.get('/search', productController.searchProducts);
router.put('/:id', authenticate, restrictTo('bakery_manager'), productController.updateProduct);
router.delete('/:id', authenticate, restrictTo('bakery_manager'), productController.deleteProduct);

module.exports = router;