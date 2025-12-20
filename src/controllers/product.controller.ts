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
    }
}

export default productController
