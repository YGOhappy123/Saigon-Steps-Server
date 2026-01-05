import 'dotenv/config'
import { app, server } from '@/socket'
import { parsedEnv } from '@/env'
import { prisma } from '@/prisma'
import { errorHandler } from '@/middlewares/error.middleware'
import { setupMiddlewares } from '@/setupMiddlewares'
import { setupApiRoutes } from '@/setupApiRoutes'
import pinoLogger from '@/configs/pinoLogger'

setupMiddlewares(app)
setupApiRoutes(app)
app.use(errorHandler)

const startServer = async () => {
    try {
        await prisma.$connect()
        pinoLogger.info('[DATABASE] Connected to MySQL database')

        const PORT = parsedEnv.PORT || 5000
        const HOST = '0.0.0.0'
        server.listen(PORT, HOST, () => {
            pinoLogger.info(`[SERVER] Server running on port: ${PORT}`)
        })
    } catch (error) {
        pinoLogger.error('[ERROR] Cannot connect to database')
        process.exit(1)
    }
}

startServer()
