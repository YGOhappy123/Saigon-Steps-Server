import { loginRequired } from '@/middlewares/verifyLogin'
import { deleteImageValidator } from '@/validators/file.validators'
import express from 'express'
import fileController from '@/controllers/file.controller'

const router = express.Router()

router.post('/upload-image', loginRequired, fileController.uploadFileImage)
router.post('/upload-base64-image', loginRequired, fileController.uploadBase64Image)
router.post('/delete-image', loginRequired, deleteImageValidator, fileController.deleteImage)

export default router
