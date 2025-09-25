import express from 'express'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()

import { parsedEnv } from '@/env'
import { prisma } from '@/prisma'
import corsOptions from '@/configs/corsOptions'
import pinoLogger from '@/configs/pinoLogger'
import errorHandler from '@/middlewares/errorHandler'
import requestLogger from '@/middlewares/requestLogger'
import authRoutes from '@/routes/auth.routes'
import fileRoutes from '@/routes/file.routes'
import roleRoutes from '@/routes/role.routes'
import staffRoutes from '@/routes/staff.routes'

// Middlewares and dependencies configuration
const app = express()
const memoryStorage = multer.memoryStorage()
const upload = multer({ storage: memoryStorage })

if (parsedEnv.NODE_ENV === 'development') {
    app.use(requestLogger)
}
app.use(upload.array('file'))
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Route handlers
app.use('/auth', authRoutes)
app.use('/files', fileRoutes)
app.use('/roles', roleRoutes)
app.use('/staffs', staffRoutes)
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
