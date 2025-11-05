import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import errorMessage from '@/configs/errorMessage'

const statusService = {
    getAllOrderStatuses: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const statuses = await prisma.orderStatus.findMany({
            where: whereStatement,
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })
        const total = await prisma.orderStatus.count({ where: whereStatement })

        return {
            statuses: statuses,
            total: total
        }
    },

    getDefaultOrderStatus: async () => {
        const defaultOrderStatus = await prisma.orderStatus.findFirst({
            where: { isDefault: true }
        })

        return defaultOrderStatus
    },

    getOrderStatusById: async (statusId: number) => {
        const orderStatus = await prisma.orderStatus.findFirst({
            where: { statusId: statusId }
        })

        return orderStatus
    },

    getStatusTransitionsByFromStatusId: async (fromStatusId: number) => {
        const transitions = await prisma.orderStatusTransition.findMany({
            where: { fromStatusId: fromStatusId },
            include: { toStatus: true }
        })

        return transitions
    },

    verifyTransition: async (fromStatusId: number, toStatusId: number) => {
        const transition = await prisma.orderStatusTransition.findFirst({
            where: { fromStatusId: fromStatusId, toStatusId: toStatusId }
        })

        return !!transition
    }
}

export default statusService
