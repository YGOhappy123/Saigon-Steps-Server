import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { RequestWithAuthData } from '@/interfaces/auth'
import { ISearchParams } from '@/interfaces/params'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import promotionService from '@/services/promotion.service'
import couponService from '@/services/coupon.service'
import roleService from '@/services/role.service'
import appPermissions from '@/configs/appPermissions'

const promotionController = {
    getAllPromotions: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { promotions, total } = await promotionService.getAllPromotions({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({
                data: promotions,
                total,
                took: promotions.length
            })
        } catch (error) {
            next(error)
        }
    },

    addNewPromotion: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId, roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.ADD_NEW_PROMOTION)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { name, description, discountRate, startDate, endDate, products } = req.body
            await promotionService.addNewPromotion(name, description, discountRate, startDate, endDate, products, userId)

            res.status(201).json({
                message: successMessage.CREATE_PROMOTION_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    updatePromotion: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.UPDATE_PROMOTION)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { promotionId } = req.params
            const { name, description, discountRate, endDate, products } = req.body
            await promotionService.updatePromotion(parseInt(promotionId), name, description, discountRate, endDate, products)

            res.status(200).json({
                message: successMessage.UPDATE_PROMOTION_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    disablePromotion: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.DISABLE_PROMOTION)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { promotionId } = req.params
            await promotionService.disablePromotion(parseInt(promotionId))

            res.status(200).json({
                message: successMessage.DISABLE_PROMOTION_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    
}

export default promotionController
