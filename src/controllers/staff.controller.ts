import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { RequestWithAuthData } from '@/interfaces/auth'
import { ISearchParams } from '@/interfaces/params'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import staffService from '@/services/staff.service'
import roleService from '@/services/role.service'
import appPermissions from '@/configs/appPermissions'

const staffController = {
    getAllStaffs: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { staffs, total } = await staffService.getAllStaffs({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({
                data: staffs,
                total,
                took: staffs.length
            })
        } catch (error) {
            next(error)
        }
    },

    addNewStaff: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId, roleId: authRoleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(authRoleId!, appPermissions.ADD_NEW_STAFF)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { name, email, avatar, roleId } = req.body
            await staffService.addNewStaff(name, email, avatar, roleId, userId)

            res.status(201).json({
                message: successMessage.CREATE_STAFF_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    updateStaffInfo: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId, roleId } = req.auth!
            const hasUpdateStaffPermission = await roleService.verifyPermission(roleId!, appPermissions.UPDATE_STAFF_INFORMATION)
            if (!hasUpdateStaffPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { staffId } = req.params
            const hasUpdatePersonalInfoPermission = await roleService.verifyPermission(userId!, appPermissions.MODIFY_PERSONAL_INFORMATION)
            if (parseInt(staffId) === userId && !hasUpdatePersonalInfoPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { name, email, avatar } = req.body
            await staffService.updateStaffInfo(parseInt(staffId), name, email, avatar)

            res.status(200).json({
                message: successMessage.UPDATE_USER_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    changeStaffRole: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { roleId: authRoleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(authRoleId!, appPermissions.CHANGE_STAFF_ROLE)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { staffId } = req.params
            const { roleId } = req.body
            await staffService.changeStaffRole(parseInt(staffId), roleId)

            res.status(200).json({
                message: successMessage.UPDATE_USER_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    deactivateStaffAccount: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { userId, roleId: authRoleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(authRoleId!, appPermissions.DEACTIVATE_STAFF_ACCOUNT)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { staffId } = req.params
            await staffService.deactivateStaffAccount(parseInt(staffId), userId)

            res.status(200).json({
                message: successMessage.DEACTIVATE_ACCOUNT_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    }
}

export default staffController
