import { parsedEnv } from '@/env'
import { semanticSearchValidator } from '@/validators/ai.validator'
import express from 'express'
import aiController from '@/controllers/ai.controller'

const router = express.Router()

if (parsedEnv.NODE_ENV === 'development') {
    router.post('/sync-products', aiController.syncProducts)
}

router.get('/similar-products/:slug', aiController.getSimilarProducts)
router.post('/image-search', aiController.imageSearch)
router.post('/semantic-search', semanticSearchValidator, aiController.semanticSearch)

export default router
