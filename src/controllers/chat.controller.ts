import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { RequestWithAuthData } from '@/interfaces/auth'
import { ISearchParams } from '@/interfaces/params'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import chatService from '@/services/chat.service'
import roleService from '@/services/role.service'
import appPermissions from '@/configs/appPermissions'

const chatController = {
    getCustomerConversation: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.auth!
            const conversation = await chatService.getCustomerConversation(userId)

            res.status(200).json({
                data: conversation
            })
        } catch (error) {
            next(error)
        }
    },

    customerSendMessage: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId } = req.auth!
            const { textContent, imageContent, tempId } = req.body
            await chatService.customerSendMessage(userId, textContent, imageContent, tempId)

            res.status(201).json({
                message: successMessage.SEND_MESSAGE_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    getAllConversations: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, filter } = req.query
            const { conversations, total } = await chatService.getAllConversationsWithLastMessage({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                filter
            } as ISearchParams)

            res.status(200).json({
                data: conversations,
                total,
                took: conversations.length
            })
        } catch (error) {
            next(error)
        }
    },

    getConversationById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { conversationId } = req.params
            const conversation = await chatService.getConversationById(parseInt(conversationId))

            res.status(200).json({
                data: conversation
            })
        } catch (error) {
            next(error)
        }
    },

    staffSendMessage: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId, roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.CHAT_WITH_CUSTOMER)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { customerId } = req.params
            const { textContent, imageContent, tempId } = req.body
            await chatService.staffSendMessage(parseInt(customerId), userId, textContent, imageContent, tempId)

            res.status(201).json({
                message: successMessage.SEND_MESSAGE_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    }
}

export default chatController
