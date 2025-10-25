import { body } from 'express-validator'

export const addNewPromotionValidator = [
    body('name').trim().isString().notEmpty(),
    body('description').optional().trim().isString(),
    body('discountRate').isFloat({ min: 1, max: 100 }),
    body('startDate')
        .trim()
        .isISO8601()
        .custom(value => {
            const today = new Date()
            const start = new Date(value)

            today.setHours(0, 0, 0, 0)
            if (start < today) throw new Error('Start date must be greater than or equal to today')
            return true
        }),
    body('endDate')
        .trim()
        .isISO8601()
        .custom((value, { req }) => {
            const start = new Date(req.body.startDate)
            const end = new Date(value)

            if (end < start) throw new Error('End date must be greater than or equal to start date')
            return true
        }),
    body('products').isArray({ min: 1 }),
    body('products.*').isInt({ min: 1 })
]

export const updatePromotionValidator = [
    body('name').trim().isString().notEmpty(),
    body('description').optional().trim().isString(),
    body('discountRate').isFloat({ min: 1, max: 100 }),
    body('startDate').trim().isISO8601(),
    body('endDate')
        .trim()
        .isISO8601()
        .custom((value, { req }) => {
            const start = new Date(req.body.startDate)
            const end = new Date(value)

            if (end < start) throw new Error('End date must be greater than or equal to start date')
            return true
        }),
    body('products').isArray({ min: 1 }),
    body('products.*').isInt({ min: 1 })
]

export const addNewCouponValidator = [
    body('code').trim().isString().isLength({ min: 3, max: 50 }),
    body('type').isIn(['PERCENTAGE', 'FIXED']),
    body('amount')
        .isFloat({ min: 1 })
        .custom((value, { req }) => {
            if (req.body.type === 'PERCENTAGE' && value > 100) throw new Error('For percentage type, amount must be between 1 and 100')
            if (req.body.type === 'FIXED' && value % 1000 !== 0) throw new Error('For fixed type, amount must be a multiple of 1000')
            return true
        }),
    body('maxUsage').optional().isInt({ min: 1 }),
    body('expiredAt')
        .trim()
        .optional()
        .isISO8601()
        .custom(value => {
            const today = new Date()
            const expiration = new Date(value)

            today.setHours(0, 0, 0, 0)
            if (expiration < today) throw new Error('Expiration date must be greater than or equal to today')
            return true
        })
]
