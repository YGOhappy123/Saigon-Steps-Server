import { staffOnly } from '@/middlewares/verifyLogin'
import { addNewRoleValidator, updateRoleValidator, verifyPermissionValidator } from '@/validators/role.validators'
import express from 'express'
import roleController from '@/controllers/role.controller'

const router = express.Router()

router.get('/', staffOnly, roleController.getAllRoles)
router.get('/:roleId', staffOnly, roleController.getRoleById)
router.post('/', staffOnly, addNewRoleValidator, roleController.addNewRole)
router.patch('/:roleId', staffOnly, updateRoleValidator, roleController.updateRole)
router.delete('/:roleId', staffOnly, roleController.deleteRole)
router.get('/permissions', staffOnly, roleController.getAllPermissions)
router.get('/verify-permission', staffOnly, verifyPermissionValidator, roleController.verifyPermission)

export default router
