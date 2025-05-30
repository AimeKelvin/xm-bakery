const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/me', authenticate, userController.getUser);
router.put('/me', authenticate, userController.updateUser);

module.exports = router;