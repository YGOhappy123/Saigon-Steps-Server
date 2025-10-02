import { staffOnly } from '@/middlewares/auth.middleware'
import { addNewStaffValidator, changeStaffRoleValidator, updateUserProfileValidator } from '@/validators/user.validators'
import express from 'express'
import staffController from '@/controllers/staff.controller'

const router = express.Router()

router.get('/', staffOnly, staffController.getAllStaffs)
router.post('/', staffOnly, addNewStaffValidator, staffController.addNewStaff)
router.patch('/:staffId/info', staffOnly, updateUserProfileValidator, staffController.updateStaffInfo)
router.patch('/:staffId/role', staffOnly, changeStaffRoleValidator, staffController.changeStaffRole)
router.post('/:staffId/deactivate-account', staffOnly, staffController.deactivateStaffAccount)

export default router
