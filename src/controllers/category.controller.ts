import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { RequestWithAuthData } from '@/interfaces/auth'
import { ISearchParams } from '@/interfaces/params'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import categoryService from '@/services/category.service'
import roleService from '@/services/role.service'
import appPermissions from '@/configs/appPermissions'

const categoryController = {
    getAllShoeCategories: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { categories, total } = await categoryService.getAllShoeCategories({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({
                data: categories,
                total,
                took: categories.length
            })
        } catch (error) {
            next(error)
        }
    },

    addNewShoeCategory: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId, roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.ADD_NEW_SHOE_CATEGORY)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { name } = req.body
            await categoryService.addNewShoeCategory(name, userId)

            res.status(201).json({
                message: successMessage.CREATE_CATEGORY_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    updateShoeCategory: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.UPDATE_SHOE_CATEGORY)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { categoryId } = req.params
            const { name } = req.body
            await categoryService.updateShoeCategory(parseInt(categoryId), name)

            res.status(200).json({
                message: successMessage.UPDATE_CATEGORY_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    deleteShoeCategory: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.DELETE_SHOE_CATEGORY)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { categoryId } = req.params
            await categoryService.deleteShoeCategory(parseInt(categoryId))

            res.status(200).json({
                message: successMessage.DELETE_CATEGORY_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    }
}

export default categoryController
