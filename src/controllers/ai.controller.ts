import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import errorMessage from '@/configs/errorMessage'
import flaskService from '@/services/flask.service'

const aiController = {
    syncProducts: async (_: Request, res: Response, next: NextFunction) => {
        try {
            await flaskService.syncProducts()

            res.status(200).json({
                message: 'Products synced successfully'
            })
        } catch (error) {
            next(error)
        }
    },

    getSimilarProducts: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { slug } = req.params
            const similarProducts = await flaskService.getSimilarProducts(slug)

            res.status(200).json({
                data: similarProducts
            })
        } catch (error) {
            next(error)
        }
    },

    imageSearch: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const image = (req.files as Express.Multer.File[])[0]
            if (!image) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const imageBuffer = image.buffer
            const imageName = image.originalname
            const imageType = image.mimetype
            const detections = await flaskService.imageSearch(imageBuffer, imageName, imageType)

            res.status(200).json({
                data: detections
            })
        } catch (error) {
            next(error)
        }
    },

    semanticSearch: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { query } = req.body
            const detections = await flaskService.semanticSearch(query)

            res.status(200).json({
                data: detections
            })
        } catch (error) {
            next(error)
        }
    }
}

export default aiController
