import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { RequestWithAuthData } from '@/interfaces/auth'
import { HttpException } from '@/errors/HttpException'
import authService from '@/services/auth.service'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'

const authController = {
    signInCustomerAccount: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { username, password } = req.body
            const result = await authService.signInCustomerAccount(username, password)

            res.status(200).json({
                data: result,
                message: successMessage.SIGN_IN_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    signInStaffAccount: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { username, password } = req.body
            const result = await authService.signInStaffAccount(username, password)

            res.status(200).json({
                data: result,
                message: successMessage.SIGN_IN_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    signUpCustomerAccount: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { name, username, password } = req.body
            const result = await authService.signUpCustomerAccount(name, username, password)

            res.status(201).json({
                data: result,
                message: successMessage.SIGN_UP_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    refreshToken: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { refreshToken } = req.body
            const result = await authService.refreshToken(refreshToken)

            res.status(200).json({
                data: result,
                message: successMessage.REFRESH_TOKEN_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { email } = req.body
            await authService.forgotPassword(email)

            res.status(200).json({
                message: successMessage.RESET_PASSWORD_EMAIL_SENT
            })
        } catch (error) {
            next(error)
        }
    },

    resetPassword: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { token, password } = req.body
            const result = await authService.resetPassword(token, password)

            res.status(200).json({
                data: result,
                message: successMessage.RESET_PASSWORD_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    loginByGoogleAccount: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { googleAccessToken } = req.body
            const result = await authService.loginByGoogleAccount(googleAccessToken)

            res.status(200).json({
                data: result,
                message: successMessage.GOOGLE_AUTH_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    changePassword: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { userId, roleId } = req.auth!
            const { oldPassword, newPassword } = req.body
            await authService.changePassword(oldPassword, newPassword, userId, roleId)

            res.status(200).json({
                message: successMessage.CHANGE_PASSWORD_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    deactivateCustomerAccount: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)
            }

            const { userId } = req.auth!
            await authService.deactivateCustomerAccount(userId)

            res.status(200).json({
                message: successMessage.DEACTIVATE_ACCOUNT_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    }
}

export default authController
