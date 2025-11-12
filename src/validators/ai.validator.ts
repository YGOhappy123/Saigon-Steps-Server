import { body } from 'express-validator'

export const imageSearchValidator = []

export const semanticSearchValidator = [body('query').trim().isString().notEmpty()]
