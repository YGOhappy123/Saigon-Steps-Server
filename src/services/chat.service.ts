import { io } from '@/socket'
import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import { encryptString, decryptString } from '@/utils/securityHelpers'
import errorMessage from '@/configs/errorMessage'

const chatService = {
    getCustomerConversation: async (customerId: number) => {
        const conversation = await prisma.conversation.findFirst({
            where: { customerId: customerId },
            include: {
                messages: {
                    orderBy: { sentAt: 'asc' }
                }
            }
        })

        return conversation == null
            ? null
            : {
                  ...conversation,
                  messages: conversation.messages.map(message => {
                      const { senderStaffId, textContent, imageContent, ...messageData } = message

                      return {
                          ...messageData,
                          textContent: textContent ? decryptString(textContent) : null,
                          imageContent: imageContent ? decryptString(imageContent) : null,
                          isSentByStaff: message.senderStaffId != null
                      }
                  })
              }
    },

    customerSendMessage: async (customerId: number, textContent: string | undefined, imageContent: string | undefined, tempId: number) => {
        const conversation = await prisma.conversation.findFirst({ where: { customerId: customerId } })
        if (!conversation) {
            const newConversation = await prisma.conversation.create({
                data: { customerId: customerId },
                include: { customer: true }
            })

            const newMessage = await prisma.chatMessage.create({
                data: {
                    conversationId: newConversation.conversationId,
                    textContent: textContent ? encryptString(textContent) : null,
                    imageContent: imageContent ? encryptString(imageContent) : null
                }
            })

            io.emit('conversation:new', {
                ...newConversation,
                lastMessage: { ...newMessage, textContent: textContent || null, imageContent: imageContent || null }
            })
        } else {
            const newMessage = await prisma.chatMessage.create({
                data: {
                    conversationId: conversation.conversationId,
                    textContent: textContent ? encryptString(textContent) : null,
                    imageContent: imageContent ? encryptString(imageContent) : null
                }
            })

            io.to(`conversation:${conversation.conversationId}`).emit('message:new', {
                newMessage: { ...newMessage, textContent: textContent || null, imageContent: imageContent || null },
                tempId: tempId
            })
        }
    },

    getAllConversationsWithLastMessage: async ({ skip = 0, limit, filter = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const conversations = await prisma.conversation.findMany({
            where: whereStatement,
            include: {
                customer: true,
                messages: {
                    orderBy: { sentAt: 'desc' },
                    take: 1,
                    include: {
                        senderStaff: true
                    }
                }
            },
            skip: skip,
            take: limit
        })
        const total = await prisma.conversation.count({ where: whereStatement })

        const sortedConversations = conversations.sort((a, b) => {
            const aMessage = a.messages[0]
            const bMessage = b.messages[0]
            if (!aMessage || !bMessage) return 0
            return bMessage.sentAt.getTime() - aMessage.sentAt.getTime()
        })

        return {
            conversations: sortedConversations.map(conversation => {
                const { messages, ...conversationData } = conversation
                const { textContent, imageContent, ...messageData } = messages[0]

                return {
                    ...conversationData,
                    lastMessage: {
                        ...messageData,
                        textContent: textContent ? decryptString(textContent) : null,
                        imageContent: imageContent ? decryptString(imageContent) : null
                    }
                }
            }),
            total: total
        }
    },

    getConversationById: async (conversationId: number) => {
        const conversation = await prisma.conversation.findFirst({
            where: { conversationId: conversationId },
            include: {
                customer: {
                    include: { account: true }
                },
                messages: {
                    include: { senderStaff: true },
                    orderBy: { sentAt: 'asc' }
                }
            }
        })
        if (!conversation) throw new HttpException(404, errorMessage.CONVERSATION_NOT_FOUND)

        return {
            ...conversation,
            messages: conversation.messages.map(message => {
                const { textContent, imageContent, ...messageData } = message
                return {
                    ...messageData,
                    textContent: textContent ? decryptString(textContent) : null,
                    imageContent: imageContent ? decryptString(imageContent) : null
                }
            }),
            customer: {
                ...conversation.customer,
                isActive: conversation.customer.account.isActive
            }
        }
    },

    staffSendMessage: async (
        customerId: number,
        staffId: number,
        textContent: string | undefined,
        imageContent: string | undefined,
        tempId: number
    ) => {
        const customer = await prisma.customer.findFirst({ where: { customerId: customerId, account: { isActive: true } } })
        if (!customer) throw new HttpException(404, errorMessage.USER_NOT_FOUND)

        const conversation = await prisma.conversation.findFirst({ where: { customerId: customerId } })
        if (!conversation) {
            const newConversation = await prisma.conversation.create({
                data: { customerId: customerId },
                include: { customer: true }
            })

            const newMessage = await prisma.chatMessage.create({
                data: {
                    conversationId: newConversation.conversationId,
                    senderStaffId: staffId,
                    textContent: textContent ? encryptString(textContent) : null,
                    imageContent: imageContent ? encryptString(imageContent) : null
                },
                include: { senderStaff: true }
            })

            io.emit('conversation:new', {
                ...newConversation,
                lastMessage: { ...newMessage, textContent: textContent || null, imageContent: imageContent || null }
            })
        } else {
            const newMessage = await prisma.chatMessage.create({
                data: {
                    conversationId: conversation.conversationId,
                    senderStaffId: staffId,
                    textContent: textContent ? encryptString(textContent) : null,
                    imageContent: imageContent ? encryptString(imageContent) : null
                },
                include: { senderStaff: true }
            })

            io.to(`conversation:${conversation.conversationId}`).emit('message:new', {
                newMessage: { ...newMessage, textContent: textContent || null, imageContent: imageContent || null },
                tempId: tempId
            })
        }
    }
}

export default chatService
