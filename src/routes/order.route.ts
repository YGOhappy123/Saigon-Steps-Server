import { customerOnly, staffOnly } from '@/middlewares/auth.middleware'
import { verifyCouponValidator, placeNewOrderValidator, processOrderValidator } from '@/validators/order.validator'
import express from 'express'
import orderController from '@/controllers/order.controller'

const router = express.Router()

router.post('/verify-coupon', customerOnly, verifyCouponValidator, orderController.verifyCoupon)
router.get('/', staffOnly, orderController.getAllOrders)
router.post('/', customerOnly, placeNewOrderValidator, orderController.placeNewOrder)
router.patch('/:orderId/status', staffOnly, processOrderValidator, orderController.processOrder)

export default router
