import express, { Express } from 'express'
import { parsedEnv } from '@/env'
import { requestLogger } from '@/middlewares/logger.middleware'
import { arcjetProtection } from '@/middlewares/security.middleware'
import cors from 'cors'
import multer from 'multer'
import corsOptions from '@/configs/corsOptions'

export const setupMiddlewares = (app: Express) => {
    const memoryStorage = multer.memoryStorage()
    const upload = multer({ storage: memoryStorage })

    if (parsedEnv.NODE_ENV === 'development') {
        app.use(requestLogger)
    } else {
        app.use(arcjetProtection)
    }

    app.use(upload.array('file'))
    app.use(cors(corsOptions))
    app.use(express.json({ limit: '10mb' }))
    app.use(express.urlencoded({ limit: '10mb', extended: true }))
}
