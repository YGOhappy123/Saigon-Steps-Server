import { prisma, InventoryUpdateType, OrderWithItems } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import errorMessage from '@/configs/errorMessage'
import productService from '@/services/product.service'
import statusService from '@/services/status.service'
import cartService from '@/services/cart.service'
import chatService from '@/services/chat.service'

enum ValidateVoucherResult {
    VALID,
    NOT_FOUND,
    INACTIVE_OR_EXPIRED,
    MAX_USAGE_REACHED,
    ALREADY_USED
}

const orderService = {
    getAllOrders: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const orders = await prisma.order.findMany({
            where: whereStatement,
            include: { customer: true, coupon: true, status: true, orderItems: true },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })
        const total = await prisma.order.count({ where: whereStatement })

        const mappedOrders = await Promise.all(
            orders.map(async order => ({
                ...order,
                status: {
                    statusId: order.status.statusId,
                    name: order.status.name,
                    description: order.status.description,
                    color: order.status.color
                },
                availableTransitions: await statusService.getStatusTransitionsByFromStatusId(order.statusId),
                statusUpdateLogs: await orderService.getStatusUpdateLogs(order.orderId),
                orderItems: await Promise.all(
                    order.orderItems.map(async item => {
                        const productItemData = await productService.getDetailedProductItemById(item.productItemId)

                        return {
                            price: item.price,
                            quantity: item.quantity,
                            productItem:
                                productItemData == null
                                    ? null
                                    : {
                                          rootProductId: productItemData.rootProductId,
                                          size: productItemData.size,
                                          barcode: productItemData.barcode,
                                          rootProduct: {
                                              name: productItemData.rootProduct.name,
                                              slug: productItemData.rootProduct.slug,
                                              images: productItemData.rootProduct.images
                                          }
                                      }
                        }
                    })
                )
            }))
        )

        return {
            orders: mappedOrders,
            total: total
        }
    },

    getStatusUpdateLogs: async (orderId: number) => {
        const logs = await prisma.orderUpdateLog.findMany({
            where: { orderId: orderId },
            include: { updatedByStaff: true, status: true },
            orderBy: { updatedAt: 'desc' }
        })

        return logs.map(log => ({
            ...log,
            status: {
                statusId: log.status.statusId,
                name: log.status.name,
                description: log.status.description,
                color: log.status.color
            }
        }))
    },

    processOrder: async (orderId: number, statusId: number, staffId: number) => {
        const order = await prisma.order.findFirst({ where: { orderId: orderId }, include: { orderItems: true } })
        if (!order) throw new HttpException(404, errorMessage.ORDER_NOT_FOUND)

        const isTransitionValid = await statusService.verifyTransition(order.statusId, statusId)
        if (!isTransitionValid) throw new HttpException(400, errorMessage.INVALID_STATUS_SELECTED)

        const newStatus = await statusService.getOrderStatusById(statusId)
        if (!newStatus) throw new HttpException(400, errorMessage.ORDER_STATUS_NOT_FOUND)

        if (newStatus.shouldReserveStock) {
            await orderService.handleReserveStock(order)
        }

        if (newStatus.shouldReleaseStock) {
            await orderService.handleReleaseStock(order)
        }

        if (newStatus.shouldReduceStock) {
            // Stock might have reduced since order placement due to inventory damages
            // ...re-verification required before accepting
            const isStockAdaptable = await orderService.isStockAdaptableForOrder(orderId)
            if (!isStockAdaptable) throw new HttpException(400, errorMessage.STOCK_NOT_ENOUGH_FOR_ORDER)

            await orderService.handleDecreaseStock(order)
        }

        if (newStatus.shouldIncreaseStock) {
            await orderService.handleIncreaseStock(order)
        }

        if (newStatus.shouldSendNotification) {
            await chatService.staffSendMessage(
                order.customerId,
                staffId,
                `Đơn hàng của bạn với mã [${orderId}] đã được chuyển sang trạng thái [${newStatus.name}]. Đây là tin nhắn tự động từ Saigon Steps. Chúc bạn một ngày tốt lành!`,
                undefined,
                0
            )
        }

        await prisma.order.update({
            where: { orderId: orderId },
            data: {
                statusId: statusId,
                deliveredAt: newStatus.shouldMarkAsDelivered ? new Date() : order.deliveredAt,
                refundedAt: newStatus.shouldMarkAsRefunded ? new Date() : order.refundedAt
            }
        })
        await prisma.orderUpdateLog.create({
            data: {
                orderId: orderId,
                statusId: statusId,
                updatedBy: staffId
            }
        })
    },

    isStockAdaptableForOrder: async (orderId: number) => {
        const order = await prisma.order.findFirst({ where: { orderId: orderId }, include: { orderItems: true } })
        if (!order) throw new HttpException(404, errorMessage.ORDER_NOT_FOUND)

        const productItems = await prisma.productItem.findMany({ where: { productItemId: { in: order.orderItems.map(item => item.productItemId) } } })
        for (const item of order.orderItems) {
            const productItem = productItems.find(pi => pi.productItemId === item.productItemId)
            if (!productItem || productItem.stock - productItem.reservedQuantity < item.quantity) return false
        }

        return true
    },

    getOrdersPlacedInTimeRange: async (startDate: Date, endDate: Date, customerId?: number) => {
        const whereStatement: any = { createdAt: { gte: startDate, lt: endDate } }
        if (customerId !== undefined) whereStatement.customerId = customerId

        const orders = await prisma.order.findMany({
            where: whereStatement
        })

        return orders
    },

    getOrdersAccountedInTimeRange: async (startDate: Date, endDate: Date, customerId?: number) => {
        const whereStatement: any = { deliveredAt: { gte: startDate, lt: endDate } }
        if (customerId !== undefined) whereStatement.customerId = customerId

        const orders = await prisma.order.findMany({
            where: whereStatement
        })

        return orders
    },

    getOrdersRefundedInTimeRange: async (startDate: Date, endDate: Date, customerId?: number) => {
        const whereStatement: any = { refundedAt: { gte: startDate, lt: endDate } }
        if (customerId !== undefined) whereStatement.customerId = customerId

        const orders = await prisma.order.findMany({
            where: whereStatement
        })

        return orders
    },

    getProductsStatisticInTimeRange: async (startDate: Date, endDate: Date) => {
        const result: {
            rootProductId: number
            totalSoldUnits: number
            totalSales: number
            totalRefundedUnits: number
            totalRefundedAmount: number
        }[] = []

        const accountedOrderItems = await prisma.orderItem.findMany({
            where: {
                order: {
                    deliveredAt: { gte: startDate, lt: endDate }
                }
            },
            include: { productItem: true }
        })

        accountedOrderItems.forEach(item => {
            const existingProductStat = result.find(stat => stat['rootProductId'] === item.productItem.rootProductId)
            if (existingProductStat) {
                existingProductStat.totalSoldUnits += item.quantity
                existingProductStat.totalSales += item.price * item.quantity
            } else {
                result.push({
                    rootProductId: item.productItem.rootProductId,
                    totalSoldUnits: item.quantity,
                    totalSales: item.price * item.quantity,
                    totalRefundedUnits: 0,
                    totalRefundedAmount: 0
                })
            }
        })

        const refundedOrderItems = await prisma.orderItem.findMany({
            where: {
                order: {
                    refundedAt: { gte: startDate, lt: endDate }
                }
            },
            include: { productItem: true }
        })

        refundedOrderItems.forEach(item => {
            const existingProductStat = result.find(stat => stat['rootProductId'] === item.productItem.rootProductId)
            if (existingProductStat) {
                existingProductStat.totalRefundedUnits += item.quantity
                existingProductStat.totalRefundedAmount += item.price * item.quantity
            } else {
                result.push({
                    rootProductId: item.productItem.rootProductId,
                    totalSoldUnits: 0,
                    totalSales: 0,
                    totalRefundedUnits: item.quantity,
                    totalRefundedAmount: item.price * item.quantity
                })
            }
        })

        return result
    },

    verifyCouponCore: async (code: string, customerId: number) => {
        const coupon = await prisma.coupon.findFirst({ where: { code: code } })
        if (!coupon) return { result: ValidateVoucherResult.NOT_FOUND, coupon: null }

        const now = new Date()
        if (!coupon.isActive || (coupon.expiredAt != null && now > coupon.expiredAt)) {
            return { result: ValidateVoucherResult.INACTIVE_OR_EXPIRED, coupon: null }
        }

        if (coupon.maxUsage != null) {
            const usage = await prisma.order.count({ where: { couponId: coupon.couponId } })
            if (usage >= coupon.maxUsage) {
                return { result: ValidateVoucherResult.MAX_USAGE_REACHED, coupon: null }
            }
        }

        const isCustomerApplied = await prisma.order.findFirst({ where: { couponId: coupon.couponId, customerId: customerId } })
        if (isCustomerApplied) {
            return { result: ValidateVoucherResult.ALREADY_USED, coupon: null }
        }

        return { result: ValidateVoucherResult.VALID, coupon: coupon }
    },

    verifyCoupon: async (code: string, customerId: number) => {
        const { result, coupon } = await orderService.verifyCouponCore(code, customerId)
        switch (result) {
            case ValidateVoucherResult.VALID:
                return coupon

            case ValidateVoucherResult.NOT_FOUND:
                throw new HttpException(404, errorMessage.COUPON_NOT_FOUND)

            case ValidateVoucherResult.INACTIVE_OR_EXPIRED:
                throw new HttpException(400, errorMessage.COUPON_NO_LONGER_AVAILABLE)

            case ValidateVoucherResult.MAX_USAGE_REACHED:
                throw new HttpException(400, errorMessage.COUPON_REACH_MAX_USAGE)

            case ValidateVoucherResult.ALREADY_USED:
                throw new HttpException(400, errorMessage.YOU_HAVE_USED_COUPON)

            default:
                throw new HttpException(500, errorMessage.INTERNAL_SERVER_ERROR)
        }
    },

    handleReserveStock: async (order: OrderWithItems) => {
        const hasReserved = await prisma.inventoryUpdateLog.findFirst({
            where: {
                orderId: order.orderId,
                type: InventoryUpdateType.RESERVE
            }
        })

        if (!hasReserved) {
            await Promise.all(
                order.orderItems.map(async item => {
                    await prisma.productItem.update({
                        where: { productItemId: item.productItemId },
                        data: {
                            reservedQuantity: { increment: item.quantity }
                        }
                    })
                    await prisma.inventoryUpdateLog.create({
                        data: {
                            orderId: order.orderId,
                            productItemId: item.productItemId,
                            quantity: item.quantity,
                            type: InventoryUpdateType.RESERVE
                        }
                    })
                })
            )
        }
    },

    handleReleaseStock: async (order: OrderWithItems) => {
        const hasReleased = await prisma.inventoryUpdateLog.findFirst({
            where: {
                orderId: order.orderId,
                type: InventoryUpdateType.RELEASE
            }
        })

        const hasReserved = await prisma.inventoryUpdateLog.findFirst({
            where: {
                orderId: order.orderId,
                type: InventoryUpdateType.RESERVE
            }
        })

        if (!hasReleased && hasReserved) {
            await Promise.all(
                order.orderItems.map(async item => {
                    await prisma.productItem.update({
                        where: { productItemId: item.productItemId },
                        data: {
                            reservedQuantity: { decrement: item.quantity }
                        }
                    })
                    await prisma.inventoryUpdateLog.create({
                        data: {
                            orderId: order.orderId,
                            productItemId: item.productItemId,
                            quantity: item.quantity,
                            type: InventoryUpdateType.RELEASE
                        }
                    })
                })
            )
        }
    },

    handleDecreaseStock: async (order: OrderWithItems) => {
        const hasDecreased = await prisma.inventoryUpdateLog.findFirst({
            where: {
                orderId: order.orderId,
                type: InventoryUpdateType.STOCK_OUT
            }
        })

        if (!hasDecreased) {
            await Promise.all(
                order.orderItems.map(async item => {
                    await prisma.productItem.update({
                        where: { productItemId: item.productItemId },
                        data: {
                            stock: { decrement: item.quantity }
                        }
                    })
                    await prisma.inventoryUpdateLog.create({
                        data: {
                            orderId: order.orderId,
                            productItemId: item.productItemId,
                            quantity: item.quantity,
                            type: InventoryUpdateType.STOCK_OUT
                        }
                    })
                })
            )
        }
    },

    handleIncreaseStock: async (order: OrderWithItems) => {
        const hasIncreased = await prisma.inventoryUpdateLog.findFirst({
            where: {
                orderId: order.orderId,
                type: InventoryUpdateType.STOCK_IN
            }
        })

        const hasDecreased = await prisma.inventoryUpdateLog.findFirst({
            where: {
                orderId: order.orderId,
                type: InventoryUpdateType.STOCK_OUT
            }
        })

        if (!hasIncreased && hasDecreased) {
            await Promise.all(
                order.orderItems.map(async item => {
                    await prisma.productItem.update({
                        where: { productItemId: item.productItemId },
                        data: {
                            stock: { increment: item.quantity }
                        }
                    })
                    await prisma.inventoryUpdateLog.create({
                        data: {
                            orderId: order.orderId,
                            productItemId: item.productItemId,
                            quantity: item.quantity,
                            type: InventoryUpdateType.RETURN
                        }
                    })
                })
            )
        }
    }
}

export default orderService
