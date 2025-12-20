import { staffOnly } from '@/middlewares/auth.middleware'
import { addNewProductValidator, updateProductInfoValidator, updateProductPriceValidator } from '@/validators/product.validator'
import express from 'express'
import productController from '@/controllers/product.controller'

const router = express.Router()

router.get('/', productController.getAllProducts)
router.get('/slug/:slug', productController.getProductBySlug)
router.get('/search', productController.searchProductsByName)
router.get('/detailed-items', productController.getDetailedProductItems)

export default router
