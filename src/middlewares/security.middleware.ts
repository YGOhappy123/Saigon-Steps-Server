import { Request, Response, NextFunction } from 'express'
import { isSpoofedBot } from '@arcjet/inspect'
import { HttpException } from '@/errors/HttpException'
import arcjetSecurity from '@/configs/arcjetSecurity'
import errorMessage from '@/configs/errorMessage'

export const arcjetProtection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decision = await arcjetSecurity.protect(req)

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                throw new HttpException(429, errorMessage.RATE_LIMIT_EXCEEDED)
            } else if (decision.reason.isBot()) {
                throw new HttpException(403, errorMessage.BOT_ACCESS_DENIED)
            } else {
                throw new HttpException(403, errorMessage.NO_PERMISSION)
            }
        }

        if (decision.results.some(isSpoofedBot)) {
            throw new HttpException(403, errorMessage.BOT_ACCESS_DENIED)
        }

        next()
    } catch (error) {
        next(error)
    }
}
