import { customerOnly, staffOnly } from '@/middlewares/auth.middleware'
import { verifyCouponValidator, placeNewOrderValidator } from '@/validators/order.validator'
import express from 'express'
import orderController from '@/controllers/order.controller'

const router = express.Router()

router.post('/verify-coupon', customerOnly, verifyCouponValidator, orderController.verifyCoupon)
router.get('/', staffOnly, orderController.getAllOrders)
router.get('/my-orders', customerOnly, orderController.getCustomerOrders)
router.post('/', customerOnly, placeNewOrderValidator, orderController.placeNewOrder)
router.patch('/:orderId/status', staffOnly, orderController.updateOrderStatus)

export default router
