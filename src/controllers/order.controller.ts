import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { RequestWithAuthData } from '@/interfaces/auth'
import { ISearchParams } from '@/interfaces/params'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import orderService from '@/services/order.service'
import roleService from '@/services/role.service'
import appPermissions from '@/configs/appPermissions'

const orderController = {
    verifyCoupon: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId } = req.auth!
            const { code } = req.body
            const coupon = await orderService.verifyCoupon(code, userId)

            res.status(200).json({
                data: coupon
            })
        } catch (error) {
            next(error)
        }
    },

    getAllOrders: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { orders, total } = await orderService.getAllOrders({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({
                data: orders,
                total,
                took: orders.length
            })
        } catch (error) {
            next(error)
        }
    },

    getCustomerOrders: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.auth!
            const { skip, limit, sort, filter } = req.query
            const { orders, total } = await orderService.getCustomerOrders(
                {
                    skip: skip !== undefined ? parseInt(skip as string) : undefined,
                    limit: limit !== undefined ? parseInt(limit as string) : undefined,
                    sort,
                    filter
                } as ISearchParams,
                userId
            )

            res.status(200).json({
                data: orders,
                total,
                took: orders.length
            })
        } catch (error) {
            next(error)
        }
    },

    placeNewOrder: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId } = req.auth!
            const { note, coupon, recipientName, deliveryAddress, deliveryPhone, items } = req.body
            await orderService.placeNewOrder(note, coupon, recipientName, deliveryAddress, deliveryPhone, items, userId)

            res.status(201).json({
                message: successMessage.PLACE_ORDER_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    updateOrderStatus: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId, roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.PROCESS_ORDER)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { orderId } = req.params
            const { status } = req.body
            await orderService.updateOrderStatus(parseInt(orderId), status, userId)

            res.status(200).json({
                message: successMessage.UPDATE_ORDER_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    }
}

export default orderController
