import { body } from 'express-validator'

export const HEX_COLOR_CODE_REGEX_PATTERN = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

export const addNewShoeCategoryValidator = [body('name').trim().isString()]

export const updateShoeCategoryValidator = [body('name').trim().isString()]

export const addNewProductBrandValidator = [
    body('name').trim().isString(),
    body('description').trim().isString(),
    body('logoUrl').optional().trim().isString()
]

export const updateProductBrandValidator = [
    body('name').trim().isString(),
    body('description').trim().isString(),
    body('logoUrl').optional().trim().isString()
]

export const addNewProductValidator = [
    body('brandId').isInt({ min: 1 }),
    body('name').trim().isString(),
    body('description').trim().isString(),
    body('price')
        .isInt({ min: 1 })
        .custom(value => {
            if (value % 1000 !== 0) throw new Error('Price must be divisible by 1000')
            return true
        }),
    body('isAccessory').isBoolean(),
    body('images').isArray({ min: 1 }),
    body('images.*').trim().isURL(),

    // Shoe product specific fields
    body('sizes').if(body('isAccessory').equals('false')).isArray({ min: 1 }),
    body('sizes.*').if(body('isAccessory').equals('false')).trim().isString(),
    body('features').if(body('isAccessory').equals('false')).isObject(),
    body('features.categoryId').if(body('isAccessory').equals('false')).isInt({ min: 1 }),
    body('features.gender').if(body('isAccessory').equals('false')).isIn(['MALE', 'FEMALE', 'UNISEX']),
    body('features.upperMaterial').if(body('isAccessory').equals('false')).trim().isString(),
    body('features.soleMaterial').if(body('isAccessory').equals('false')).trim().isString(),
    body('features.liningMaterial').if(body('isAccessory').equals('false')).trim().isString(),
    body('features.closureType').if(body('isAccessory').equals('false')).trim().isString(),
    body('features.toeShape').if(body('isAccessory').equals('false')).trim().isString(),
    body('features.waterResistant').if(body('isAccessory').equals('false')).trim().isString(),
    body('features.breathability').if(body('isAccessory').equals('false')).trim().isString(),
    body('features.pattern').if(body('isAccessory').equals('false')).trim().isString(),
    body('features.countryOfOrigin').if(body('isAccessory').equals('false')).trim().isString(),
    body('features.primaryColor').if(body('isAccessory').equals('false')).trim().matches(HEX_COLOR_CODE_REGEX_PATTERN),
    body('features.secondaryColor').if(body('isAccessory').equals('false')).optional().trim().matches(HEX_COLOR_CODE_REGEX_PATTERN),
    body('features.heelHeight').if(body('isAccessory').equals('false')).isFloat({ min: 0 }),
    body('features.durabilityRating').if(body('isAccessory').equals('false')).isFloat({ min: 0, max: 10 }),
    body('features.releaseYear').if(body('isAccessory').equals('false')).isInt({ min: 1900, max: new Date().getFullYear() }),
    body('features.occasionTags').if(body('isAccessory').equals('false')).isArray({ min: 1 }),
    body('features.occasionTags.*').if(body('isAccessory').equals('false')).trim().isString(),
    body('features.designTags').if(body('isAccessory').equals('false')).isArray({ min: 1 }),
    body('features.designTags.*').if(body('isAccessory').equals('false')).trim().isString()
]

export const updateProductInfoValidator = [
    body('brandId').isInt({ min: 1 }),
    body('name').trim().isString(),
    body('description').trim().isString(),
    body('images').isArray({ min: 1 }),
    body('images.*').trim().isURL(),

    // Shoe product specific fields
    body('features').optional().isObject(),
    body('features.categoryId').optional().isInt({ min: 1 }),
    body('features.gender').optional().isIn(['MALE', 'FEMALE', 'UNISEX']),
    body('features.upperMaterial').optional().trim().isString(),
    body('features.soleMaterial').optional().trim().isString(),
    body('features.liningMaterial').optional().trim().isString(),
    body('features.closureType').optional().trim().isString(),
    body('features.toeShape').optional().trim().isString(),
    body('features.waterResistant').optional().trim().isString(),
    body('features.breathability').optional().trim().isString(),
    body('features.pattern').optional().trim().isString(),
    body('features.countryOfOrigin').optional().trim().isString(),
    body('features.primaryColor').optional().trim().matches(HEX_COLOR_CODE_REGEX_PATTERN),
    body('features.secondaryColor').optional().optional().trim().matches(HEX_COLOR_CODE_REGEX_PATTERN),
    body('features.heelHeight').optional().isFloat({ min: 0 }),
    body('features.durabilityRating').optional().isFloat({ min: 0, max: 10 }),
    body('features.releaseYear').optional().isInt({ min: 1900, max: new Date().getFullYear() }),
    body('features.occasionTags').optional().isArray({ min: 1 }),
    body('features.occasionTags.*').optional().trim().isString(),
    body('features.designTags').optional().isArray({ min: 1 }),
    body('features.designTags.*').optional().trim().isString()
]

export const updateProductPriceValidator = [
    body('price')
        .isInt({ min: 1 })
        .custom(value => {
            if (value % 1000 !== 0) throw new Error('Price must be divisible by 1000')
            return true
        })
]
