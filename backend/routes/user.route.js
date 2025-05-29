import express from 'express'
import { registerUser, getLoggedInUser, loginUser, logoutUser, getUserProducts } from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'


const router = express.Router()

router.post('/register', registerUser)
router.get('/logged-in-user', authMiddleware, getLoggedInUser)
router.post('/logout', logoutUser)
router.post('/login', loginUser)
router.get('/loggedin-user-products', authMiddleware, getUserProducts)

export default router