import { body } from 'express-validator'
import { PHONE_NUMBER_REGEX_PATTERN } from '@/validators/user.validator'
import { HEX_COLOR_CODE_REGEX_PATTERN } from '@/validators/product.validator'

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

export const processOrderValidator = [body('statusId').isInt({ min: 1 }), body('explanation').optional().trim().isString()]

export const addNewOrderStatusValidator = [
    body('name').trim().isString().notEmpty(),
    body('description').trim().isString().notEmpty(),
    body('color').trim().matches(HEX_COLOR_CODE_REGEX_PATTERN),
    body('isExplanationRequired').isBoolean(),
    body('explanationLabel').if(body('isExplanationRequired').equals('true')).trim().isString(),
    body('shouldReserveStock').isBoolean(),
    body('shouldReleaseStock').isBoolean(),
    body('shouldReduceStock').isBoolean(),
    body('shouldIncreaseStock').isBoolean(),
    body('shouldMarkAsDelivered').isBoolean(),
    body('shouldMarkAsRefunded').isBoolean(),
    body('shouldSendNotification').isBoolean()
]

export const updateOrderStatusValidator = [
    body('name').trim().isString().notEmpty(),
    body('description').trim().isString().notEmpty(),
    body('color').trim().matches(HEX_COLOR_CODE_REGEX_PATTERN),
    body('isExplanationRequired').isBoolean(),
    body('explanationLabel').if(body('isExplanationRequired').equals('true')).trim().isString(),
    body('shouldReserveStock').isBoolean(),
    body('shouldReleaseStock').isBoolean(),
    body('shouldReduceStock').isBoolean(),
    body('shouldIncreaseStock').isBoolean(),
    body('shouldMarkAsDelivered').isBoolean(),
    body('shouldMarkAsRefunded').isBoolean(),
    body('shouldSendNotification').isBoolean()
]

export const addNewTransitionValidator = [
    body('fromStatusId').isInt({ min: 1 }),
    body('toStatusId').isInt({ min: 1 }),
    body('label').trim().isString().notEmpty(),
    body('isScanningRequired').isBoolean()
]
