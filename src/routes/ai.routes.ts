import { semanticSearchValidator } from '@/validators/ai.validator'
import express from 'express'
import aiController from '@/controllers/ai.controller'

const router = express.Router()

router.post('/seed-products', aiController.seedProducts)
router.post('/image-search', aiController.imageSearch)
router.post('/semantic-search', semanticSearchValidator, aiController.semanticSearch)

export default router
