import { staffOnly } from '@/middlewares/auth.middleware'
import { addNewRoleValidator, updateRoleValidator, verifyPermissionValidator } from '@/validators/user.validator'
import express from 'express'
import roleController from '@/controllers/role.controller'

const router = express.Router()

router.get('/permissions', staffOnly, roleController.getAllPermissions)
router.post('/verify-permission', staffOnly, verifyPermissionValidator, roleController.verifyPermission)

router.get('/', staffOnly, roleController.getAllRoles)
router.get('/:roleId', staffOnly, roleController.getRoleById)
router.post('/', staffOnly, addNewRoleValidator, roleController.addNewRole)
router.patch('/:roleId', staffOnly, updateRoleValidator, roleController.updateRole)
router.delete('/:roleId', staffOnly, roleController.deleteRole)

export default router
