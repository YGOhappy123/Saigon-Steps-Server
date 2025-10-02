import { staffOnly } from '@/middlewares/auth.middleware'
import { addNewShoeCategoryValidator, updateShoeCategoryValidator } from '@/validators/product.validators'
import express from 'express'
import categoryController from '@/controllers/category.controller'

const router = express.Router()

router.get('/', categoryController.getAllShoeCategories)
router.post('/', staffOnly, addNewShoeCategoryValidator, categoryController.addNewShoeCategory)
router.patch('/:categoryId', staffOnly, updateShoeCategoryValidator, categoryController.updateShoeCategory)
router.delete('/:categoryId', staffOnly, categoryController.deleteShoeCategory)

export default router
