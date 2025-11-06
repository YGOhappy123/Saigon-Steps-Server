import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { RequestWithAuthData } from '@/interfaces/auth'
import { ISearchParams } from '@/interfaces/params'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import roleService from '@/services/role.service'
import appPermissions from '@/configs/appPermissions'
import statusService from '@/services/status.service'

const statusController = {
    getAllOrderStatuses: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { statuses, total } = await statusService.getAllOrderStatuses({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({
                data: statuses,
                total,
                took: statuses.length
            })
        } catch (error) {
            next(error)
        }
    },

    addNewOrderStatus: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.ADD_NEW_ORDER_STATUS)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const {
                name,
                description,
                color,
                shouldReserveStock,
                shouldReleaseStock,
                shouldReduceStock,
                shouldIncreaseStock,
                shouldMarkAsDelivered,
                shouldMarkAsRefunded,
                shouldSendNotification
            } = req.body
            await statusService.addNewOrderStatus(
                name,
                description,
                color,
                shouldReserveStock,
                shouldReleaseStock,
                shouldReduceStock,
                shouldIncreaseStock,
                shouldMarkAsDelivered,
                shouldMarkAsRefunded,
                shouldSendNotification
            )

            res.status(201).json({ message: successMessage.CREATE_ORDER_STATUS_SUCCESSFULLY })
        } catch (error) {
            next(error)
        }
    },

    updateOrderStatus: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.UPDATE_ORDER_STATUS)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { statusId } = req.params
            const {
                name,
                description,
                color,
                shouldReserveStock,
                shouldReleaseStock,
                shouldReduceStock,
                shouldIncreaseStock,
                shouldMarkAsDelivered,
                shouldMarkAsRefunded,
                shouldSendNotification
            } = req.body
            await statusService.updateOrderStatus(
                parseInt(statusId),
                name,
                description,
                color,
                shouldReserveStock,
                shouldReleaseStock,
                shouldReduceStock,
                shouldIncreaseStock,
                shouldMarkAsDelivered,
                shouldMarkAsRefunded,
                shouldSendNotification
            )

            res.status(200).json({ message: successMessage.UPDATE_ORDER_STATUS_SUCCESSFULLY })
        } catch (error) {
            next(error)
        }
    },

    deleteOrderStatus: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.DELETE_ORDER_STATUS)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { statusId } = req.params
            await statusService.deleteOrderStatus(parseInt(statusId))

            res.status(200).json({ message: successMessage.DELETE_ORDER_STATUS_SUCCESSFULLY })
        } catch (error) {
            next(error)
        }
    },

    getAllStatusTransitions: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { transitions } = await statusService.getAllStatusTransitions()

            res.status(200).json({
                data: transitions
            })
        } catch (error) {
            next(error)
        }
    },

    addNewStatusTransition: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.ADD_NEW_TRANSITION)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { fromStatusId, toStatusId, label, isScanningRequired } = req.body
            await statusService.addNewStatusTransition(fromStatusId, toStatusId, label, isScanningRequired)

            res.status(201).json({ message: successMessage.CREATE_TRANSITION_SUCCESSFULLY })
        } catch (error) {
            next(error)
        }
    },

    deleteStatusTransition: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.DELETE_TRANSITION)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { fromStatusId, toStatusId } = req.params
            await statusService.deleteStatusTransition(parseInt(fromStatusId), parseInt(toStatusId))

            res.status(200).json({ message: successMessage.DELETE_TRANSITION_SUCCESSFULLY })
        } catch (error) {
            next(error)
        }
    }
}

export default statusController
