import { staffOnly } from '@/middlewares/auth.middleware'
import express from 'express'
import statisticController from '@/controllers/statistic.controller'

const router = express.Router()

router.get('/summary', staffOnly, statisticController.getSummaryStatistic)
router.get('/key-customers', staffOnly, statisticController.getKeyCustomersStatistic)
router.get('/revenues', staffOnly, statisticController.getRevenueChart)
router.get('/products/:productId', staffOnly, statisticController.getProductStatistic)

export default router
