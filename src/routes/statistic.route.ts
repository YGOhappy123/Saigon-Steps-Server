import { staffOnly } from '@/middlewares/auth.middleware'
import express from 'express'
import statisticController from '@/controllers/statistic.controller'

const router = express.Router()

router.get('/summary', staffOnly, statisticController.getSummaryStatistic)
router.get('/key-customers', staffOnly, statisticController.getKeyCustomersStatistic)
router.get('/revenues', staffOnly, statisticController.getRevenuesChart)
router.get('/orders/:customerId', staffOnly, statisticController.getOrdersChartByCustomerId)
router.get('/products', staffOnly, statisticController.getProductsSalesStatistic)

export default router
