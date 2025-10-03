import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { RequestWithAuthData } from '@/interfaces/auth'
import { ISearchParams, StatisticType } from '@/interfaces/params'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import roleService from '@/services/role.service'
import importService from '@/services/import.service'
import damageService from '@/services/damage.service'
import statisticService from '@/services/statistic.service'
import appPermissions from '@/configs/appPermissions'

const reportController = {
    getAllProductImports: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { imports, total } = await importService.getAllProductImports({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({
                data: imports,
                total,
                took: imports.length
            })
        } catch (error) {
            next(error)
        }
    },

    trackNewProductImport: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId, roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.ADD_NEW_IMPORT)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { invoiceNumber, importDate, items } = req.body
            await importService.trackNewProductImport(invoiceNumber, importDate, items, userId)

            res.status(201).json({
                message: successMessage.TRACK_IMPORT_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    getAllDamageReports: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { reports, total } = await damageService.getAllDamageReports({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({
                data: reports,
                total,
                took: reports.length
            })
        } catch (error) {
            next(error)
        }
    },

    reportNewDamage: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId, roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.ADD_NEW_DAMAGE_REPORT)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { reason, note, items } = req.body
            await damageService.reportNewDamage(reason, note, items, userId)

            res.status(201).json({
                message: successMessage.REPORT_DAMAGE_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    getSummaryStatistic: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { type } = req.query
            const statisticData = await statisticService.getSummaryStatistic(type as StatisticType)

            res.status(200).json({
                data: statisticData
            })
        } catch (error) {
            next(error)
        }
    },

    getKeyCustomersStatistic: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { type } = req.query
            const statisticData = await statisticService.getKeyCustomersStatistic(type as StatisticType)

            res.status(200).json({
                data: statisticData
            })
        } catch (error) {
            next(error)
        }
    },

    getRevenueChart: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { type } = req.query
            const statisticData = await statisticService.getRevenueChart(type as StatisticType)

            res.status(200).json({
                data: statisticData
            })
        } catch (error) {
            next(error)
        }
    },

    getProductStatistic: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params
            const statisticData = await statisticService.getProductStatistic(parseInt(productId))

            res.status(200).json({
                data: statisticData
            })
        } catch (error) {
            next(error)
        }
    }
}

export default reportController
