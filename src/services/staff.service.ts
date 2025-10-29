import * as bcrypt from 'bcrypt'
import { prisma } from '@/prisma'
import { parsedEnv } from '@/env'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import { capitalizeWords, generateRandomString } from '@/utils/stringHelpers'
import errorMessage from '@/configs/errorMessage'
import nodemailerService from '@/services/nodemailer.service'

const staffService = {
    getAllStaffs: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const staffs = await prisma.staff.findMany({
            where: whereStatement,
            include: {
                account: true,
                role: true,
                createdByStaff: true
            },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })
        const total = await prisma.staff.count({ where: whereStatement })

        return {
            staffs: staffs.map(({ account, ...staffData }) => ({
                ...staffData,
                isActive: account.isActive
            })),
            total: total
        }
    },

    addNewStaff: async (name: string, email: string, avatar: string, roleId: number, staffId: number) => {
        const staffWithThisEmail = await prisma.staff.findFirst({ where: { email: email, account: { isActive: true } } })
        if (staffWithThisEmail) throw new HttpException(400, errorMessage.EMAIL_EXISTED)

        const role = await prisma.staffRole.findFirst({ where: { roleId: roleId } })
        if (!role || role.isImmutable) throw new HttpException(404, errorMessage.INVALID_ROLE_SELECTED)

        const randomUsername = generateRandomString()
        const randomPassword = generateRandomString()

        const hashedPassword = await bcrypt.hash(randomPassword, 10)
        const newAccount = await prisma.account.create({
            data: {
                username: randomUsername,
                password: hashedPassword
            }
        })

        const staffFullName = capitalizeWords(name)
        await prisma.staff.create({
            data: {
                name: staffFullName,
                email: email,
                avatar: avatar,
                roleId: roleId,
                accountId: newAccount.accountId,
                createdBy: staffId
            }
        })

        nodemailerService.sendWelcomeNewStaffMail(
            email,
            staffFullName,
            role.name,
            randomUsername,
            randomPassword,
            `${parsedEnv.DASHBOARD_URL}/doi-mat-khau`
        )
    },

    updateStaffInfo: async (staffId: number, name: string, email: string, avatar: string) => {
        const staff = await prisma.staff.findFirst({ where: { staffId: staffId, account: { isActive: true } } })
        if (!staff) throw new HttpException(404, errorMessage.USER_NOT_FOUND)

        const staffWithThisEmail = await prisma.staff.findFirst({ where: { email: email, account: { isActive: true }, NOT: { staffId: staffId } } })
        if (staffWithThisEmail) throw new HttpException(400, errorMessage.EMAIL_EXISTED)

        await prisma.staff.update({
            where: { staffId: staffId },
            data: {
                name: capitalizeWords(name),
                email: email,
                avatar: avatar
            }
        })
    },

    changeStaffRole: async (staffId: number, newRoleId: number) => {
        const staff = await prisma.staff.findFirst({ where: { staffId: staffId, account: { isActive: true } } })
        if (!staff) throw new HttpException(404, errorMessage.USER_NOT_FOUND)

        const newRole = await prisma.staffRole.findFirst({ where: { roleId: newRoleId } })
        if (!newRole || newRole.isImmutable) throw new HttpException(404, errorMessage.INVALID_ROLE_SELECTED)

        await prisma.staff.update({
            where: { staffId: staffId },
            data: {
                roleId: newRoleId
            }
        })
    },

    deactivateStaffAccount: async (staffId: number, authStaffId: number) => {
        const staff = await prisma.staff.findFirst({ where: { staffId: staffId, account: { isActive: true } }, include: { role: true } })
        if (!staff) throw new HttpException(404, errorMessage.USER_NOT_FOUND)
        if (staff.role.isImmutable || staff.staffId === authStaffId) throw new HttpException(403, errorMessage.NO_PERMISSION)

        await prisma.account.update({
            where: { accountId: staff.accountId },
            data: {
                isActive: false
            }
        })
    }
}

export default staffService
