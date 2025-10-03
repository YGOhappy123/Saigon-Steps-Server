import { staffOnly } from '@/middlewares/auth.middleware'
import { trackNewProductImportValidator, reportNewDamageValidator } from '@/validators/report.validators'
import express from 'express'
import reportController from '@/controllers/report.controller'

const router = express.Router()

router.get('/imports', staffOnly, reportController.getAllProductImports)
router.post('/imports', staffOnly, trackNewProductImportValidator, reportController.trackNewProductImport)

router.get('/damages', staffOnly, reportController.getAllDamageReports)
router.post('/damages', staffOnly, reportNewDamageValidator, reportController.reportNewDamage)

router.get('/statistics/summary', staffOnly, reportController.getSummaryStatistic)
router.get('/statistics/key-customers', staffOnly, reportController.getKeyCustomersStatistic)
router.get('/statistics/revenues', staffOnly, reportController.getRevenueChart)
router.get('/statistics/products/:productId', staffOnly, reportController.getProductStatistic)

export default router
