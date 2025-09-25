import { body, query } from 'express-validator'

export const addNewRoleValidator = [body('name').notEmpty(), body('permissions').isArray({ min: 1 }), body('permissions.*').isInt({ min: 1 })]

export const updateRoleValidator = [body('name').notEmpty(), body('permissions').isArray({ min: 1 }), body('permissions.*').isInt({ min: 1 })]

export const verifyPermissionValidator = [query('permission').notEmpty()]
