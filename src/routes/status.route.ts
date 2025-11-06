import { loginRequired, staffOnly } from '@/middlewares/auth.middleware'
import { addNewOrderStatusValidator, updateOrderStatusValidator, addNewTransitionValidator } from '@/validators/order.validator'
import express from 'express'
import statusController from '@/controllers/status.controller'

const router = express.Router()

router.get('/', loginRequired, statusController.getAllOrderStatuses)
router.post('/', staffOnly, addNewOrderStatusValidator, statusController.addNewOrderStatus)
router.patch('/:statusId', staffOnly, updateOrderStatusValidator, statusController.updateOrderStatus)
router.delete('/:statusId', staffOnly, statusController.deleteOrderStatus)

router.get('/transitions', staffOnly, statusController.getAllStatusTransitions)
router.post('/transitions', staffOnly, addNewTransitionValidator, statusController.addNewStatusTransition)
router.delete('/transitions/:fromStatusId/:toStatusId', staffOnly, statusController.deleteStatusTransition)

export default router
