import express from 'express'
import { createProduct, getAllProducts, getSingleProduct, updateSingleProduct, deleteSingleProduct } from '../controllers/product.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/create-product', authMiddleware, createProduct)
router.get('/products/all', getAllProducts)
router.get('/products/:id', getSingleProduct)
router.put('/products/edit/:id', updateSingleProduct)
router.delete('/products/delete/:id', deleteSingleProduct)


export default router