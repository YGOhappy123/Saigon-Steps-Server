import { Server } from 'socket.io'
import { socketAuthMiddleware } from '@/middlewares/socket.middleware'
import http from 'http'
import express from 'express'
import corsOptions from '@/configs/corsOptions'
import pinoLogger from '@/configs/pinoLogger'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        ...corsOptions,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
})

io.use(socketAuthMiddleware)

io.on('connection', socket => {
    pinoLogger.info(`[SOCKET] New client connected: ${socket.id}`)

    socket.on('joinConversation', (conversationId: number) => {
        socket.join(`conversation:${conversationId}`)
    })

    socket.on('leaveConversation', (conversationId: number) => {
        socket.leave(`conversation:${conversationId}`)
    })

    socket.on('joinConversations', (ids: number[]) => {
        ids.forEach(id => socket.join(`conversation:${id}`))
    })

    socket.on('leaveConversations', (ids: number[]) => {
        ids.forEach(id => socket.leave(`conversation:${id}`))
    })

    socket.on('disconnect', () => {
        pinoLogger.info(`[SOCKET] Client disconnected: ${socket.id}`)
    })
})

export { app, io, server }
