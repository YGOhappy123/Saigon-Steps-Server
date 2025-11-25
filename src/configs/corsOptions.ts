import { CorsOptions } from 'cors'
import { parsedEnv } from '@/env'
import { HttpException } from '@/errors/HttpException'
import errorMessage from '@/configs/errorMessage'

const allowedOrigins: { [key in typeof parsedEnv.NODE_ENV]: string[] } = {
    development: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:4000',
        'http://127.0.0.1:4000',
        'https://saigon-steps.vercel.app',
        'https://saigon-steps-dashboard.vercel.app'
    ],
    production: []
}

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if ((!origin && parsedEnv.NODE_ENV === 'development') || (origin && allowedOrigins[parsedEnv.NODE_ENV].includes(origin))) {
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
