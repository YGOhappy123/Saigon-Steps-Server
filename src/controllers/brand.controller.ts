import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { RequestWithAuthData } from '@/interfaces/auth'
import { ISearchParams } from '@/interfaces/params'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import brandService from '@/services/brand.service'
import roleService from '@/services/role.service'
import appPermissions from '@/configs/appPermissions'

const brandController = {
    getAllProductBrands: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { brands, total } = await brandService.getAllProductBrands({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({ data: brands, total, took: brands.length })
        } catch (error) {
            next(error)
        }
    },

    addNewProductBrand: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId, roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.ADD_NEW_PRODUCT_BRAND)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { name, description, logoUrl } = req.body
            await brandService.addNewProductBrand(name, description, logoUrl)

            res.status(201).json({
                message: successMessage.CREATE_BRAND_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    updateProductBrand: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.UPDATE_PRODUCT_BRAND)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { brandId } = req.params
            const { name, description, logoUrl } = req.body
            await brandService.updateProductBrand(parseInt(brandId), name, description, logoUrl)

            res.status(200).json({
                message: successMessage.UPDATE_BRAND_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    deleteProductBrand: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.DELETE_PRODUCT_BRAND)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { brandId } = req.params
            await brandService.deleteProductBrand(parseInt(brandId))

            res.status(200).json({
                message: successMessage.DELETE_BRAND_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    }
}

export default brandController
