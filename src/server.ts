import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { parsedEnv } from '@/env'
import { prisma } from '@/prisma'
import corsOptions from '@/configs/corsOptions'
import pinoLogger from '@/configs/pinoLogger'
import errorHandler from '@/middlewares/errorHandler'
import requestLogger from '@/middlewares/requestLogger'
import authRoutes from '@/routes/auth.routes'

// Middlewares and dependencies configuration
const app = express()

if (parsedEnv.NODE_ENV === 'development') {
    app.use(requestLogger)
}
app.use(cors(corsOptions))
app.use(express.json())

// Route handlers
app.use('/auth', authRoutes)
app.use(errorHandler)

// Database connection and server initialization
const startServer = async () => {
    try {
        await prisma.$connect()
        pinoLogger.info('[DATABASE] Connected to MySQL database')

        const PORT = parsedEnv.PORT || 5000
        const HOST = '0.0.0.0'
        app.listen(PORT, HOST, () => {
            pinoLogger.info(`[SERVER] Server running on port: ${PORT}`)
        })
    } catch (error) {
        pinoLogger.error('[ERROR] Cannot connect to database')
        process.exit(1)
    }
}

startServer()
