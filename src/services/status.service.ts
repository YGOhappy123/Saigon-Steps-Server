import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import errorMessage from '@/configs/errorMessage'

type TransitionGroup = {
    fromStatusId: number
    fromStatus: {
        statusId: number
        name: string
        description: string
        color: string
    }
    transitions: {
        toStatusId: number
        label: string
        isScanningRequired: boolean
        toStatus: {
            statusId: number
            name: string
            description: string
            color: string
        }
    }[]
}

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

    addNewOrderStatus: async (
        name: string,
        description: string,
        color: string,
        shouldReserveStock: boolean,
        shouldReleaseStock: boolean,
        shouldReduceStock: boolean,
        shouldIncreaseStock: boolean,
        shouldMarkAsDelivered: boolean,
        shouldMarkAsRefunded: boolean,
        shouldSendNotification: boolean
    ) => {
        if (shouldReserveStock && shouldReleaseStock) throw new HttpException(400, errorMessage.CANNOT_RESERVE_AND_RELEASE_STOCK_SIMULTANEOUSLY)
        if (shouldIncreaseStock && shouldReduceStock) throw new HttpException(400, errorMessage.CANNOT_DECREASE_AND_INCREASE_STOCK_SIMULTANEOUSLY)
        if (shouldMarkAsDelivered && shouldMarkAsRefunded)
            throw new HttpException(400, errorMessage.CANNOT_MARK_AS_DELIVERED_AND_REFUNDED_SIMULTANEOUSLY)

        const statusWithSameName = await prisma.orderStatus.findFirst({ where: { name: name } })
        if (statusWithSameName) throw new HttpException(409, errorMessage.ORDER_STATUS_EXISTED)

        const defaultStatus = await statusService.getDefaultOrderStatus()
        await prisma.orderStatus.create({
            data: {
                name: name,
                description: description,
                color: color,
                isDefault: defaultStatus ? false : true,
                shouldReserveStock: shouldReserveStock,
                shouldReleaseStock: shouldReleaseStock,
                shouldReduceStock: shouldReduceStock,
                shouldIncreaseStock: shouldIncreaseStock,
                shouldMarkAsDelivered: shouldMarkAsDelivered,
                shouldMarkAsRefunded: shouldMarkAsRefunded,
                shouldSendNotification: shouldSendNotification
            }
        })
    },

    updateOrderStatus: async (
        statusId: number,
        name: string,
        description: string,
        color: string,
        shouldReserveStock: boolean,
        shouldReleaseStock: boolean,
        shouldReduceStock: boolean,
        shouldIncreaseStock: boolean,
        shouldMarkAsDelivered: boolean,
        shouldMarkAsRefunded: boolean,
        shouldSendNotification: boolean
    ) => {
        if (shouldReserveStock && shouldReleaseStock) throw new HttpException(400, errorMessage.CANNOT_RESERVE_AND_RELEASE_STOCK_SIMULTANEOUSLY)
        if (shouldIncreaseStock && shouldReduceStock) throw new HttpException(400, errorMessage.CANNOT_DECREASE_AND_INCREASE_STOCK_SIMULTANEOUSLY)
        if (shouldMarkAsDelivered && shouldMarkAsRefunded)
            throw new HttpException(400, errorMessage.CANNOT_MARK_AS_DELIVERED_AND_REFUNDED_SIMULTANEOUSLY)

        const status = await prisma.orderStatus.findFirst({ where: { statusId: statusId } })
        if (!status) throw new HttpException(404, errorMessage.ORDER_STATUS_NOT_FOUND)

        const statusWithSameName = await prisma.orderStatus.findFirst({ where: { name: name, statusId: { not: statusId } } })
        if (statusWithSameName) throw new HttpException(409, errorMessage.ORDER_STATUS_EXISTED)

        await prisma.orderStatus.update({
            where: { statusId: statusId },
            data: {
                name: name,
                description: description,
                color: color,
                shouldReserveStock: shouldReserveStock,
                shouldReleaseStock: shouldReleaseStock,
                shouldReduceStock: shouldReduceStock,
                shouldIncreaseStock: shouldIncreaseStock,
                shouldMarkAsDelivered: shouldMarkAsDelivered,
                shouldMarkAsRefunded: shouldMarkAsRefunded,
                shouldSendNotification: shouldSendNotification
            }
        })
    },

    deleteOrderStatus: async (statusId: number) => {
        const status = await prisma.orderStatus.findFirst({ where: { statusId: statusId } })
        if (!status) throw new HttpException(404, errorMessage.ORDER_STATUS_NOT_FOUND)
        if (status.isDefault) throw new HttpException(400, errorMessage.CANNOT_DELETE_DEFAULT_ORDER_STATUS)

        const orderWithThisStatus = await prisma.order.findFirst({ where: { statusId: statusId } })
        if (orderWithThisStatus) throw new HttpException(400, errorMessage.ORDER_STATUS_BEING_USED)

        const logWithThisStatus = await prisma.orderUpdateLog.findFirst({ where: { statusId: statusId } })
        if (logWithThisStatus) throw new HttpException(400, errorMessage.ORDER_STATUS_BEING_USED)

        await prisma.orderStatusTransition.deleteMany({
            where: { OR: [{ fromStatusId: statusId }, { toStatusId: statusId }] }
        })
        await prisma.orderStatus.delete({
            where: { statusId: statusId }
        })
    },

    getAllStatusTransitions: async () => {
        const transitions = await prisma.orderStatusTransition.findMany({
            include: { fromStatus: true, toStatus: true }
        })

        const groupedTransitions = [] as TransitionGroup[]
        for (const item of transitions) {
            const toStatus = {
                toStatusId: item.toStatus.statusId,
                label: item.label,
                isScanningRequired: item.isScanningRequired,
                toStatus: {
                    statusId: item.toStatus.statusId,
                    name: item.toStatus.name,
                    description: item.toStatus.description,
                    color: item.toStatus.color
                }
            }

            const existingGroup = groupedTransitions.find(group => group.fromStatusId === item.fromStatusId)
            if (!existingGroup) {
                groupedTransitions.push({
                    fromStatusId: item.fromStatusId,
                    fromStatus: {
                        statusId: item.fromStatus.statusId,
                        name: item.fromStatus.name,
                        description: item.fromStatus.description,
                        color: item.fromStatus.color
                    },
                    transitions: [toStatus]
                })
            } else {
                existingGroup.transitions.push(toStatus)
            }
        }

        return {
            transitions: groupedTransitions
        }
    },

    getStatusTransitionsByFromStatusId: async (fromStatusId: number) => {
        const transitions = await prisma.orderStatusTransition.findMany({
            where: { fromStatusId: fromStatusId },
            include: { toStatus: true }
        })

        return transitions
    },

    addNewStatusTransition: async (fromStatusId: number, toStatusId: number, label: string, isScanningRequired: boolean) => {
        if (fromStatusId === toStatusId) throw new HttpException(400, errorMessage.INVALID_STATUS_SELECTED)

        const existingTransition = await prisma.orderStatusTransition.findFirst({
            where: { fromStatusId: fromStatusId, toStatusId: toStatusId }
        })
        if (existingTransition) throw new HttpException(409, errorMessage.TRANSITION_EXISTED)

        await prisma.orderStatusTransition.create({
            data: {
                fromStatusId: fromStatusId,
                toStatusId: toStatusId,
                label: label,
                isScanningRequired: isScanningRequired
            }
        })
    },

    deleteStatusTransition: async (fromStatusId: number, toStatusId: number) => {
        const transition = await prisma.orderStatusTransition.findFirst({
            where: { fromStatusId: fromStatusId, toStatusId: toStatusId }
        })
        if (!transition) throw new HttpException(404, errorMessage.TRANSITION_NOT_FOUND)

        await prisma.orderStatusTransition.deleteMany({
            where: { fromStatusId: fromStatusId, toStatusId: toStatusId }
        })
    },

    verifyTransition: async (fromStatusId: number, toStatusId: number) => {
        const transition = await prisma.orderStatusTransition.findFirst({
            where: { fromStatusId: fromStatusId, toStatusId: toStatusId }
        })

        return !!transition
    }
}

export default statusService
