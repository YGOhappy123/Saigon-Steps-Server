import { staffOnly } from '@/middlewares/auth.middleware'
import { trackNewProductImportValidator, reportNewDamageValidator } from '@/validators/report.validator'
import express from 'express'
import reportController from '@/controllers/report.controller'

const router = express.Router()

router.get('/imports', staffOnly, reportController.getAllProductImports)
router.post('/imports', staffOnly, trackNewProductImportValidator, reportController.trackNewProductImport)

router.get('/damages', staffOnly, reportController.getAllDamageReports)
router.post('/damages', staffOnly, reportNewDamageValidator, reportController.reportNewDamage)

router.get('/inventories', staffOnly, reportController.getInventoryUpdateLogs)

export default router
