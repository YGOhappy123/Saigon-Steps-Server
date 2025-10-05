import express from 'express'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()

import * as routes from '@/routes'
import { parsedEnv } from '@/env'
import { prisma } from '@/prisma'
import { errorHandler } from '@/middlewares/error.middleware'
import { requestLogger } from '@/middlewares/logger.middleware'
import corsOptions from '@/configs/corsOptions'
import pinoLogger from '@/configs/pinoLogger'

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
app.use('/auth', routes.authRoutes)
app.use('/files', routes.fileRoutes)
app.use('/roles', routes.roleRoutes)
app.use('/customers', routes.customerRoutes)
app.use('/staffs', routes.staffRoutes)
app.use('/brands', routes.brandRoutes)
app.use('/categories', routes.categoryRoutes)
app.use('/products', routes.productRoutes)
app.use('/promotions', routes.promotionRoutes)
app.use('/orders', routes.orderRoutes)
app.use('/reports', routes.reportRoutes)
app.use('/statistics', routes.statisticRoutes)
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
