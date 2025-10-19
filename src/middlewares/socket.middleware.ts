import { HttpException } from '@/errors/HttpException'
import { AuthJwtPayload } from '@/interfaces/auth'
import { verifyAccessToken } from '@/utils/jwtHelpers'
import errorMessage from '@/configs/errorMessage'

export const socketAuthMiddleware = async (socket: any, next: (err?: any) => void) => {
    try {
        const authHeader = socket.handshake.auth?.token
        if (!authHeader?.startsWith('Bearer ')) {
            return next(new Error(errorMessage.NO_CREDENTIALS))
        }

        const token = authHeader.split(' ')[1]
        const decodedToken = verifyAccessToken(token) as AuthJwtPayload

        socket.auth = decodedToken
        next()
    } catch (error) {
        next(new Error(errorMessage.INVALID_CREDENTIALS))
    }
}
