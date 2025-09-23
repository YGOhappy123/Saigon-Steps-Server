import { body } from 'express-validator'

const JWT_REGEX_PATTERN = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
const GOOGLE_TOKEN_REGEX_PATTERN = /^ya29\.[0-9A-Za-z\-_]+$/

export const signInValidator = [body('username').trim().isString().notEmpty(), body('password').trim().isString().notEmpty()]

export const signUpValidator = [
    body('name').trim().isString().isLength({ min: 2, max: 255 }),
    body('username').trim().isString().isLength({ min: 8, max: 20 }),
    body('password').trim().isString().isLength({ min: 8, max: 20 }),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match')
        }
        return true
    })
]

export const refreshTokenValidator = [body('refreshToken').matches(JWT_REGEX_PATTERN)]

export const forgotPasswordValidator = [body('email').isEmail()]

export const resetPasswordValidator = [
    body('token').matches(JWT_REGEX_PATTERN),
    body('password').trim().isString().isLength({ min: 8, max: 20 }),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match')
        }
        return true
    })
]

export const changePasswordValidator = [
    body('oldPassword').trim().isString(),
    body('newPassword').trim().isString().isLength({ min: 8, max: 20 }),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error('Passwords do not match')
        }
        return true
    })
]

export const googleAuthValidator = [body('googleAccessToken').trim().matches(GOOGLE_TOKEN_REGEX_PATTERN)]
