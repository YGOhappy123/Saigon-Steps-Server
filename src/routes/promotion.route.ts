import { staffOnly } from '@/middlewares/auth.middleware'
import { addNewPromotionValidator, updatePromotionValidator, addNewCouponValidator } from '@/validators/promotion.validator'
import express from 'express'
import promotionController from '@/controllers/promotion.controller'

const router = express.Router()

router.get('/', promotionController.getAllPromotions)
router.post('/', staffOnly, addNewPromotionValidator, promotionController.addNewPromotion)
router.patch('/:promotionId', staffOnly, updatePromotionValidator, promotionController.updatePromotion)
router.post('/:promotionId/disable-promotion', staffOnly, promotionController.disablePromotion)

router.get('/coupons', staffOnly, promotionController.getAllCoupons)
router.post('/coupons', staffOnly, addNewCouponValidator, promotionController.addNewCoupon)
router.post('/coupons/:couponId/disable-coupon', staffOnly, promotionController.disableCoupon)

export default router
