import { staffOnly } from '@/middlewares/verifyLogin'
import { addNewProductValidator, updateProductInfoValidator, updateProductPriceValidator } from '@/validators/product.validators'
import express from 'express'
import productController from '@/controllers/product.controller'

const router = express.Router()

router.get('/', productController.getAllProducts)
router.get('/id/:productId', productController.getProductById)
router.get('/slug/:slug', productController.getProductBySlug)
router.get('/search', productController.searchProductsByName)
router.get('/detailed-items', productController.getDetailedProductItems)
router.post('/', staffOnly, addNewProductValidator, productController.addNewProduct)
router.patch('/:productId/info', staffOnly, updateProductInfoValidator, productController.updateProductInfo)
router.patch('/:productId/price', staffOnly, updateProductPriceValidator, productController.updateProductPrice)
router.delete('/:productId', staffOnly, productController.deleteProduct)

export default router
