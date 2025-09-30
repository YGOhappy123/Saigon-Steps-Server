import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import { capitalizeWords } from '@/utils/stringHelpers'
import errorMessage from '@/configs/errorMessage'

const roleService = {
    getAllRoles: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const roles = await prisma.staffRole.findMany({
            where: whereStatement,
            include: { permissions: { include: { permission: true } } },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })

        const total = await prisma.staffRole.count({ where: whereStatement })

        return {
            roles: roles.map(role => ({
                ...role,
                permissions: role.permissions?.map(rp => rp.permission) ?? []
            })),
            total: total
        }
    },

    getRoleById: async (roleId: number) => {
        const role = await prisma.staffRole.findFirst({
            where: { roleId: roleId },
            include: { permissions: { include: { permission: true } } }
        })

        return role == null
            ? null
            : {
                  ...role,
                  permissions: role.permissions?.map(rp => rp.permission) ?? []
              }
    },

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
    },

    addNewRole: async (name: string, permissionIds: number[]) => {
        const existingRole = await prisma.staffRole.findFirst({ where: { name: name } })
        if (existingRole) throw new HttpException(409, errorMessage.ROLE_EXISTED)

        const newRole = await prisma.staffRole.create({
            data: {
                name: capitalizeWords(name)
            }
        })

        await prisma.rolePermission.createMany({
            data: permissionIds.map(id => ({ roleId: newRole.roleId, permissionId: id })),
            skipDuplicates: true
        })
    },

    updateRole: async (roleId: number, name: string, permissionIds: number[]) => {
        const role = await prisma.staffRole.findFirst({ where: { roleId: roleId } })
        if (!role) throw new HttpException(404, errorMessage.ROLE_NOT_FOUND)
        if (role.isImmutable) throw new HttpException(400, errorMessage.ROLE_IS_IMMUTABLE)

        const roleWithSameName = await prisma.staffRole.findFirst({ where: { name: name, roleId: { not: roleId } } })
        if (roleWithSameName) throw new HttpException(409, errorMessage.ROLE_EXISTED)

        await prisma.staffRole.update({
            where: { roleId: roleId },
            data: {
                name: capitalizeWords(name)
            }
        })
        await prisma.rolePermission.deleteMany({ where: { roleId: roleId } })
        await prisma.rolePermission.createMany({
            data: permissionIds.map(id => ({ roleId: roleId, permissionId: id })),
            skipDuplicates: true
        })
    },

    deleteRole: async (roleId: number) => {
        const role = await prisma.staffRole.findFirst({ where: { roleId: roleId } })
        if (!role) throw new HttpException(404, errorMessage.ROLE_NOT_FOUND)
        if (role.isImmutable) throw new HttpException(400, errorMessage.ROLE_IS_IMMUTABLE)

        const staffsWithThisRole = await prisma.staff.count({ where: { roleId: roleId } })
        if (staffsWithThisRole > 0) throw new HttpException(400, errorMessage.ROLE_BEING_USED)

        await prisma.rolePermission.deleteMany({ where: { roleId: roleId } })
        await prisma.staffRole.delete({
            where: { roleId: roleId }
        })
    },

    getAllPermissions: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const permissions = await prisma.appPermission.findMany({
            where: whereStatement,
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })

        const total = await prisma.appPermission.count({ where: whereStatement })

        return {
            permissions: permissions,
            total: total
        }
    },

    verifyPermission: async (roleId: number, permissionCode: string) => {
        const rolePermission = await prisma.rolePermission.findFirst({
            where: {
                roleId: roleId,
                permission: { code: permissionCode }
            }
        })

        return !!rolePermission
    }
}

export default roleService
