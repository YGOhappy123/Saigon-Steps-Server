import { customerOnly, staffOnly } from '@/middlewares/auth.middleware'
import { sendChatMessageValidator } from '@/validators/user.validator'
import express from 'express'
import chatController from '@/controllers/chat.controller'

const router = express.Router()

router.get('/my-conversation', customerOnly, chatController.getCustomerConversation)
router.post('/', customerOnly, sendChatMessageValidator, chatController.customerSendMessage)

router.get('/', staffOnly, chatController.getAllConversations)
router.get('/:conversationId', staffOnly, chatController.getConversationById)
router.post('/:customerId', staffOnly, sendChatMessageValidator, chatController.staffSendMessage)

export default router
