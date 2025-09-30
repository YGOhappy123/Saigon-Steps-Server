import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { RequestWithAuthData } from '@/interfaces/auth'
import { ISearchParams } from '@/interfaces/params'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import productService from '@/services/product.service'
import roleService from '@/services/role.service'
import appPermissions from '@/configs/appPermissions'

const productController = {
    getAllProducts: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { products, total } = await productService.getAllProducts({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({
                data: products,
                total,
                took: products.length
            })
        } catch (error) {
            next(error)
        }
    },

    getProductById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params
            const product = await productService.getProductById(parseInt(productId))

            res.status(200).json({
                data: product
            })
        } catch (error) {
            next(error)
        }
    },

    getProductBySlug: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { slug } = req.params
            const product = await productService.getProductBySlug(slug as string)

            res.status(200).json({
                data: product
            })
        } catch (error) {
            next(error)
        }
    },

    getDetailedProductItems: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.query
            const { productItems, total } = await productService.getDetailedProductItems(
                Array.isArray(ids) ? ids.map(id => parseInt(id as string)) : [parseInt(ids as string)]
            )

            res.status(200).json({
                data: productItems,
                total,
                took: productItems.length
            })
        } catch (error) {
            next(error)
        }
    },

    searchProductsByName: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { searchTerm } = req.query
            const { products, total } = await productService.searchProductsByName(searchTerm as string)

            res.status(200).json({
                data: products,
                total,
                took: products.length
            })
        } catch (error) {
            next(error)
        }
    },

    addNewProduct: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId, roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.ADD_NEW_PRODUCT)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { brandId, name, description, price, isAccessory, images, sizes, features } = req.body
            await productService.addNewProduct(brandId, name, description, price, isAccessory, images, sizes, features, userId)

            res.status(201).json({
                message: successMessage.CREATE_PRODUCT_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    updateProductInfo: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.UPDATE_PRODUCT_INFORMATION)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { productId } = req.params
            const { brandId, name, description, images, features } = req.body
            await productService.updateProductInfo(parseInt(productId), brandId, name, description, images, features)

            res.status(200).json({
                message: successMessage.UPDATE_PRODUCT_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    updateProductPrice: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.UPDATE_PRODUCT_PRICE)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { productId } = req.params
            const { price } = req.body
            await productService.updateProductPrice(parseInt(productId), price)

            res.status(200).json({
                message: successMessage.UPDATE_PRODUCT_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    deleteProduct: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.DELETE_PRODUCT)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { productId } = req.params
            await productService.deleteProduct(parseInt(productId))

            res.status(200).json({
                message: successMessage.DELETE_PRODUCT_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    }
}

export default productController
