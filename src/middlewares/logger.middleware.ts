import { Request, Response, NextFunction } from 'express'
import pinoLogger from '@/configs/pinoLogger'

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    pinoLogger.info(`[${req.method}] ${req.url} | Origin: ${req.headers.origin || 'Unknown'}`)
    next()
}
