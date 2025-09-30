import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { generateDataUriFromBuffer } from '@/utils/fileHelpers'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import cloudinaryService from '@/services/cloudinary.service'

const fileController = {
    uploadFileImage: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const image = (req.files as Express.Multer.File[])[0]
            const folder = req.body.folder ?? req.query.folder?.toString()
            const fileFormat = image.mimetype.split('/')[1]
            const dataUri = generateDataUriFromBuffer(fileFormat, image.buffer)

            const result = await cloudinaryService.uploadToCloudinary({
                base64: dataUri.base64 as string,
                fileFormat: fileFormat,
                folder: folder ?? 'Saigon Steps'
            })

            res.status(201).json({
                data: { imageUrl: result.url },
                message: successMessage.UPLOAD_IMAGE_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    uploadBase64Image: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { base64Image } = req.body
            const matches = base64Image.match(/^data:(.+);base64,(.+)$/)
            if (!matches || matches.length !== 3) throw new HttpException(402, errorMessage.UPLOAD_IMAGE_FAILED)

            const folder = req.body.folder ?? req.query.folder?.toString()
            const mimeType = matches[1]
            const fileFormat = mimeType.split('/')[1]
            const base64Data = matches[2]

            const result = await cloudinaryService.uploadToCloudinary({
                base64: base64Data,
                fileFormat,
                folder: folder ?? 'Saigon Steps'
            })

            res.status(201).json({
                data: { imageUrl: result.url },
                message: successMessage.UPLOAD_IMAGE_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    deleteImage: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { imageUrl } = req.body
            await cloudinaryService.deleteFileByUrl(imageUrl)

            res.status(200).json({
                message: successMessage.DELETE_IMAGE_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    }
}

export default fileController
