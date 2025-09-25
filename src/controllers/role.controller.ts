import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { RequestWithAuthData } from '@/interfaces/auth'
import { ISearchParams } from '@/interfaces/params'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import roleService from '@/services/role.service'
import appPermissions from '@/configs/appPermissions'

const roleController = {
    getAllRoles: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { roles, total } = await roleService.getAllRoles({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({ data: roles, total, took: roles.length })
        } catch (error) {
            next(error)
        }
    },

    getRoleById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { roleId } = req.params
            const role = await roleService.getRoleById(parseInt(roleId))

            res.status(200).json({ data: role })
        } catch (error) {
            next(error)
        }
    },

    getAllPermissions: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { permissions, total } = await roleService.getAllPermissions({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({ data: permissions, total, took: permissions.length })
        } catch (error) {
            next(error)
        }
    },

    addNewRole: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.ADD_NEW_ROLE)
            if (!hasPermission) {
                throw new HttpException(403, errorMessage.NO_PERMISSION)
            }

            const { name, permissions } = req.body
            await roleService.addNewRole(name, permissions)

            res.status(201).json({
                message: successMessage.CREATE_ROLE_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    updateRole: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.UPDATE_ROLE)
            if (!hasPermission) {
                throw new HttpException(403, errorMessage.NO_PERMISSION)
            }

            const { roleId: targetRoleId } = req.params
            const { name, permissions } = req.body
            await roleService.updateRole(parseInt(targetRoleId), name, permissions)

            res.status(200).json({
                message: successMessage.UPDATE_ROLE_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    deleteRole: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.REMOVE_ROLE)
            if (!hasPermission) {
                throw new HttpException(403, errorMessage.NO_PERMISSION)
            }

            const { roleId: targetRoleId } = req.params
            await roleService.deleteRole(parseInt(targetRoleId))

            res.status(200).json({
                message: successMessage.DELETE_ROLE_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    verifyPermission: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { roleId } = req.auth!
            const { permission } = req.query
            const result = await roleService.verifyPermission(roleId!, permission as string)

            if (!result) {
                throw new HttpException(403, errorMessage.NO_PERMISSION)
            }

            res.status(200).json({
                message: successMessage.VERIFY_PERMISSION_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    }
}

export default roleController
