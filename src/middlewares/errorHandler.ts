import { Request, Response, NextFunction } from 'express'
import errorMessage from '@/configs/errorMessage'

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    try {
        const status = error.status || error.statusCode || 500
        const message = error.message || errorMessage.INTERNAL_SERVER_ERROR

        res.status(status).json({
            message: message
        })
    } catch (err) {
        next(err)
    }
}

export default errorHandler
