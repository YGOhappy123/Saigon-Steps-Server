import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import errorMessage from '@/configs/errorMessage'

const roleService = {
    getRolePermissions: async (roleId: number) => {
        const role = await prisma.staffRole.findFirst({
            where: { roleId: roleId },
            include: {
                permissions: {
                    include: { permission: true }
                }
            }
        })

        if (!role) throw new HttpException(404, errorMessage.ROLE_NOT_FOUND)
        return (role.permissions ?? []).map(item => item.permission)
    }
}

export default roleService
