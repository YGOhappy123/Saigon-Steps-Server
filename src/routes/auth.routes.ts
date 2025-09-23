import {
    googleAuthValidator,
    signInValidator,
    signUpValidator,
    refreshTokenValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
    changePasswordValidator
} from '@/validators/auth.validators'
import { loginRequired, customerOnly } from '@/routes/verifyLogin'
import express from 'express'
import authController from '@/controllers/auth.controller'

const router = express.Router()

router.post('/sign-in', signInValidator, authController.signInCustomerAccount)
router.post('/staff-sign-in', signInValidator, authController.signInStaffAccount)
router.post('/sign-up', signUpValidator, authController.signUpCustomerAccount)
router.post('/refresh-token', refreshTokenValidator, authController.refreshToken)
router.post('/forgot-password', forgotPasswordValidator, authController.forgotPassword)
router.post('/reset-password', resetPasswordValidator, authController.resetPassword)
router.post('/google-auth', googleAuthValidator, authController.loginByGoogleAccount)
router.patch('/change-password', loginRequired, changePasswordValidator, authController.changePassword)
router.post('/deactivate-account', customerOnly, authController.deactivateCustomerAccount)

export default router
