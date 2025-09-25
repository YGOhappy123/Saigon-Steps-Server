import { body } from 'express-validator'

export const uploadBase64ImageValidator = [body('base64Image').isString().notEmpty()]

export const deleteImageValidator = [body('imageUrl').isURL()]
