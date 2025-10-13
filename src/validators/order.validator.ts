import { body } from 'express-validator'
import { PHONE_NUMBER_REGEX_PATTERN } from '@/validators/user.validator'

export const verifyCouponValidator = [body('code').trim().isString()]

export const placeNewOrderValidator = [
    body('note').optional().trim().isString(),
    body('coupon').optional().trim().isString(),
    body('recipientName').optional().trim().isString(),
    body('deliveryAddress').optional().trim().isString(),
    body('deliveryPhone').optional().trim().matches(PHONE_NUMBER_REGEX_PATTERN),
    body('items').isArray({ min: 1 }),
    body('items.*.productItemId').isInt({ min: 1 }),
    body('items.*.quantity').isInt({ min: 1 })
]

export const updateOrderValidator = [
    body('status').isIn(['PENDING', 'ACCEPTED', 'PACKED', 'DISPATCHED', 'DELIVERY_SUCCESS', 'DELIVERY_FAILED', 'CANCELLED', 'RETURNED'])
]
