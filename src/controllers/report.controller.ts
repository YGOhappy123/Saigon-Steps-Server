import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { RequestWithAuthData } from '@/interfaces/auth'
import { ISearchParams } from '@/interfaces/params'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import roleService from '@/services/role.service'
import importService from '@/services/import.service'
import damageService from '@/services/damage.service'
import inventoryService from '@/services/inventory.service'
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

    getInventoryUpdateLogs: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { logs, total } = await inventoryService.getInventoryUpdateLogs({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({
                data: logs,
                total,
                took: logs.length
            })
        } catch (error) {
            next(error)
        }
    }
}

export default reportController
