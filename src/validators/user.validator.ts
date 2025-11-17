import { body } from 'express-validator'

export const PHONE_NUMBER_REGEX_PATTERN = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

export const addNewRoleValidator = [body('name').trim().isString(), body('permissions').isArray(), body('permissions.*').isInt({ min: 1 })]

export const updateRoleValidator = [body('name').trim().isString(), body('permissions').isArray(), body('permissions.*').isInt({ min: 1 })]

export const addCartItemValidator = [body('productItemId').isInt({ min: 1 }), body('quantity').isInt({ min: 1 })]

export const updateCartItemValidator = [body('newProductItemId').optional().isInt(), body('quantity').isInt({ min: 1 })]

export const addCustomerAddressValidator = [
    body('recipientName').trim().isString(),
    body('phoneNumber').trim().matches(PHONE_NUMBER_REGEX_PATTERN),
    body('city').trim().isString(),
    body('ward').trim().isString(),
    body('addressLine').trim().isString()
]

export const updateUserProfileValidator = [
    body('name').trim().isString().isLength({ min: 2, max: 255 }),
    body('email').trim().isEmail(),
    body('avatar').trim().isURL()
]

export const addNewStaffValidator = [
    body('name').trim().isString().isLength({ min: 2, max: 255 }),
    body('email').trim().isEmail(),
    body('avatar').trim().isURL(),
    body('roleId').isInt({ min: 1 })
]

export const changeStaffRoleValidator = [body('roleId').isInt({ min: 1 })]

export const verifyPermissionValidator = [body('permission').trim().isString()]

export const sendChatMessageValidator = [
    body('textContent').optional().trim().isString().isLength({ min: 1, max: 1000 }),
    body('imageContent').optional().trim().isURL(),
    body('tempId').isInt(),
    body().custom(value => {
        if (!value.textContent && !value.imageContent) {
            throw new Error('At least one of textContent or imageContent must be provided')
        }
        return true
    })
]
