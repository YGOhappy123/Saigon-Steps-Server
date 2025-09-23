import jwt, { JwtPayload } from 'jsonwebtoken'
import { parsedEnv } from '@/env'
import { HttpException } from '@/errors/HttpException'
import errorMessage from '@/configs/errorMessage'

const ACCESS_TOKEN_LIFE = '1h'
const REFRESH_TOKEN_LIFE = '7d'
const RESET_PASSWORD_TOKEN_LIFE = '10m'

export const generateAccessToken = ({ userId, roleId = null }: { userId: number; roleId?: number | null }) => {
    if (roleId == null) {
        return jwt.sign({ userId }, parsedEnv.ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_LIFE
        })
    }

    return jwt.sign({ userId, roleId }, parsedEnv.ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_LIFE
    })
}

export const generateRefreshToken = ({ accountId }: { accountId: number }) => {
    return jwt.sign({ accountId }, parsedEnv.REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_LIFE
    })
}

export const generateResetPasswordToken = ({ email, type = 'forgot' }: { email: string; type: 'forgot' | 'google' }) => {
    if (type === 'google') {
        return jwt.sign({ email }, parsedEnv.RESET_PASSWORD_TOKEN_SECRET)
    }

    return jwt.sign({ email }, parsedEnv.RESET_PASSWORD_TOKEN_SECRET, {
        expiresIn: RESET_PASSWORD_TOKEN_LIFE
    })
}

export const verifyAccessToken = (accessToken: string) => {
    try {
        const decodedToken = jwt.verify(accessToken, parsedEnv.ACCESS_TOKEN_SECRET)
        return decodedToken as JwtPayload
    } catch (error) {
        throw new HttpException(401, errorMessage.INVALID_CREDENTIALS)
    }
}

export const verifyRefreshToken = (refreshToken: string) => {
    try {
        const decodedToken = jwt.verify(refreshToken, parsedEnv.REFRESH_TOKEN_SECRET)
        return decodedToken as JwtPayload
    } catch (error) {
        throw new HttpException(401, errorMessage.INVALID_CREDENTIALS)
    }
}

export const verifyResetPasswordToken = (resetPasswordToken: string) => {
    try {
        const decodedToken = jwt.verify(resetPasswordToken, parsedEnv.RESET_PASSWORD_TOKEN_SECRET)
        return decodedToken as JwtPayload
    } catch (error) {
        throw new HttpException(401, errorMessage.INVALID_CREDENTIALS)
    }
}
