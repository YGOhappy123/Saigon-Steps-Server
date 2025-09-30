import { staffOnly } from '@/middlewares/verifyLogin'
import { addNewProductBrandValidator, updateProductBrandValidator } from '@/validators/product.validators'
import express from 'express'
import brandController from '@/controllers/brand.controller'

const router = express.Router()

router.get('/', brandController.getAllProductBrands)
router.post('/', staffOnly, addNewProductBrandValidator, brandController.addNewProductBrand)
router.patch('/:brandId', staffOnly, updateProductBrandValidator, brandController.updateProductBrand)
router.delete('/:brandId', staffOnly, brandController.deleteProductBrand)

export default router
