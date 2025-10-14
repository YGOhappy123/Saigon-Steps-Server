import { CorsOptions } from 'cors'
import { HttpException } from '@/errors/HttpException'
import errorMessage from '@/configs/errorMessage'

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:4000', 'http://127.0.0.1:4000']

const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new HttpException(403, errorMessage.BLOCKED_BY_CORS_POLICY))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions
