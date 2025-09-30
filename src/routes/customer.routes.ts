import { customerOnly, staffOnly } from '@/middlewares/verifyLogin'
import { addCartItemValidator, updateCartItemValidator, addCustomerAddressValidator, updateUserProfileValidator } from '@/validators/user.validators'
import express from 'express'
import customerController from '@/controllers/customer.controller'

const router = express.Router()

router.get('/', staffOnly, customerController.getAllCustomers)
router.post('/:customerId/deactivate-account', staffOnly, customerController.deactivateCustomerAccount)

router.get('/cart', customerOnly, customerController.getCustomerActiveCart)
router.post('/cart', customerOnly, addCartItemValidator, customerController.addCartItem)
router.post('/cart/reset', customerOnly, customerController.resetCustomerCart)
router.patch('/cart/:productItemId', customerOnly, updateCartItemValidator, customerController.updateCartItem)
router.delete('/cart/:productItemId', customerOnly, customerController.deleteCartItem)

router.patch('/', customerOnly, updateUserProfileValidator, customerController.updateCustomerInfo)
router.get('/address', customerOnly, customerController.getCustomerAddresses)
router.post('/address', customerOnly, addCustomerAddressValidator, customerController.addCustomerAddress)
router.patch('/address/:addressId', customerOnly, customerController.setCustomerAddressAsDefault)
router.delete('/address/:addressId', customerOnly, customerController.deleteCustomerAddress)

export default router
