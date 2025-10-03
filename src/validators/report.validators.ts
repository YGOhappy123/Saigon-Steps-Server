import { body } from 'express-validator'

export const trackNewProductImportValidator = [
    body('invoiceNumber').trim().isString(),
    body('importDate').trim().isISO8601(),
    body('items').isArray({ min: 1 }),
    body('items.*.productItemId').isInt({ min: 1 }),
    body('items.*.quantity').isInt({ min: 1 }),
    body('items.*.cost')
        .isInt({ min: 1 })
        .custom(value => {
            if (value % 100 !== 0) throw new Error('Cost must be divisible by 100')
            return true
        })
]

export const reportNewDamageValidator = [
    body('reason').isIn(['LOST', 'BROKEN', 'DEFECTIVE', 'OTHER']),
    body('note').if(body('reason').equals('OTHER')).trim().isString(),
    body('items.*.productItemId').isInt({ min: 1 }),
    body('items.*.quantity').isInt({ min: 1 }),
    body('items.*.expectedCost')
        .isInt({ min: 1 })
        .custom(value => {
            if (value % 1000 !== 0) throw new Error('Cost must be divisible by 1000')
            return true
        })
]
