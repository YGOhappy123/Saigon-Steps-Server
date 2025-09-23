import { Response, NextFunction } from 'express'
import { HttpException } from '@/errors/HttpException'
import { verifyAccessToken } from '@/utils/jwtHelpers'
import { AuthJwtPayload, RequestWithAuthData } from '@/interfaces/auth'
import errorMessage from '@/configs/errorMessage'

export const loginRequired = (req: RequestWithAuthData, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader?.startsWith('Bearer ')) {
            throw new HttpException(401, errorMessage.NO_CREDENTIALS)
        }

        const token = authHeader.split(' ')[1]
        const decodedToken = verifyAccessToken(token) as AuthJwtPayload

        req.auth = decodedToken
        next()
    } catch (error) {
        next(error)
    }
}

export const customerOnly = (req: RequestWithAuthData, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader?.startsWith('Bearer ')) {
            throw new HttpException(401, errorMessage.NO_CREDENTIALS)
        }

        const token = authHeader.split(' ')[1]
        const decodedToken = verifyAccessToken(token) as AuthJwtPayload

        if (decodedToken.roleId != null) {
            throw new HttpException(403, errorMessage.NO_PERMISSION)
        }

        req.auth = decodedToken
        next()
    } catch (error) {
        next(error)
    }
}

export const staffOnly = (req: RequestWithAuthData, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader?.startsWith('Bearer ')) {
            throw new HttpException(401, errorMessage.NO_CREDENTIALS)
        }

        const token = authHeader.split(' ')[1]
        const decodedToken = verifyAccessToken(token) as AuthJwtPayload

        if (decodedToken.roleId == null) {
            throw new HttpException(403, errorMessage.NO_PERMISSION)
        }

        req.auth = decodedToken
        next()
    } catch (error) {
        next(error)
    }
}
