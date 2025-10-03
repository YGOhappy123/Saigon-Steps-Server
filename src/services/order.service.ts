import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import errorMessage from '@/configs/errorMessage'
import productService from '@/services/product.service'
import cartService from '@/services/cart.service'

enum Result {
    Valid = 'Valid',
    NotFound = 'NotFound',
    InactiveOrExpired = 'InactiveOrExpired',
    MaxUsageReached = 'MaxUsageReached',
    AlreadyUsed = 'AlreadyUsed'
}

type OrderStatus = 'PENDING' | 'ACCEPTED' | 'PACKED' | 'DISPATCHED' | 'DELIVERY_SUCCESS' | 'DELIVERY_FAILED' | 'CANCELLED' | 'RETURNED'

const transitionMap: { [key in OrderStatus]: OrderStatus[] } = {
    PENDING: ['ACCEPTED', 'CANCELLED'],
    ACCEPTED: ['PACKED'],
    PACKED: ['DISPATCHED'],
    DISPATCHED: ['DELIVERY_SUCCESS', 'DELIVERY_FAILED'],
    DELIVERY_SUCCESS: ['RETURNED'],
    DELIVERY_FAILED: ['RETURNED'],
    CANCELLED: [],
    RETURNED: []
}

const orderService = {
    verifyCouponCore: async (code: string, customerId: number) => {
        const coupon = await prisma.coupon.findFirst({ where: { code: code } })
        if (!coupon) return { result: Result.NotFound, coupon: null }

        const now = new Date()
        if (!coupon.isActive || (coupon.expiredAt != null && now > coupon.expiredAt)) return { result: Result.InactiveOrExpired, coupon: null }

        if (coupon.maxUsage != null) {
            const usage = await prisma.order.count({ where: { couponId: coupon.couponId } })
            if (usage >= coupon.maxUsage) {
                return { result: Result.MaxUsageReached, coupon: null }
            }
        }

        const isCustomerApplied = await prisma.order.findFirst({ where: { couponId: coupon.couponId, customerId: customerId } })
        if (isCustomerApplied) return { result: Result.AlreadyUsed, coupon: null }

        return { result: Result.Valid, coupon: coupon }
    },

    verifyCoupon: async (code: string, customerId: number) => {
        const { result, coupon } = await orderService.verifyCouponCore(code, customerId)
        switch (result) {
            case Result.Valid:
                return coupon

            case Result.NotFound:
                throw new HttpException(404, errorMessage.COUPON_NOT_FOUND)

            case Result.InactiveOrExpired:
                throw new HttpException(400, errorMessage.COUPON_NO_LONGER_AVAILABLE)

            case Result.MaxUsageReached:
                throw new HttpException(400, errorMessage.COUPON_REACH_MAX_USAGE)

            case Result.AlreadyUsed:
                throw new HttpException(400, errorMessage.YOU_HAVE_USED_COUPON)

            default:
                throw new HttpException(500, errorMessage.INTERNAL_SERVER_ERROR)
        }
    },

    getAllOrders: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const orders = await prisma.order.findMany({
            where: whereStatement,
            include: { customer: true, coupon: true, orderItems: true },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })

        const total = await prisma.order.count({ where: whereStatement })

        const mappedOrders = await Promise.all(
            orders.map(async order => ({
                ...order,
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

    getCustomerOrders: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams, customerId: number) => {
        const whereStatement = { ...buildWhereStatement(filter), customerId: customerId }

        const orders = await prisma.order.findMany({
            where: whereStatement,
            include: { coupon: true, orderItems: true },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })

        const total = await prisma.order.count({ where: whereStatement })

        const mappedOrders = await Promise.all(
            orders.map(async order => ({
                ...order,
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
        const logs = await prisma.orderStatusUpdateLog.findMany({
            where: { orderId: orderId },
            include: { updatedByStaff: true },
            orderBy: { updatedAt: 'desc' }
        })

        return logs
    },

    placeNewOrder: async (
        note: string | undefined,
        couponCode: string | undefined,
        recipientName: string | undefined,
        deliveryAddress: string | undefined,
        deliveryPhone: string | undefined,
        items: { productItemId: number; quantity: number }[],
        customerId: number
    ) => {
        let totalAmount = 0
        const orderItems: { productItemId: number; quantity: number; price: number }[] = []

        for (const item of items) {
            const productItem = await prisma.productItem.findFirst({
                where: { productItemId: item.productItemId },
                include: { rootProduct: true }
            })
            if (productItem == null) throw new HttpException(404, errorMessage.PRODUCT_ITEM_NOT_FOUND)
            if (item.quantity > productItem.stock) throw new HttpException(400, errorMessage.QUANTITY_EXCEED_CURRENT_STOCK)

            const { discountRate } = await productService.getProductPromotions(productItem.rootProductId)
            const unitPrice = Math.round(productItem.rootProduct.price * (1 - discountRate / 100))

            totalAmount += unitPrice * item.quantity
            orderItems.push({ productItemId: item.productItemId, quantity: item.quantity, price: unitPrice })
        }

        let couponId: number | null = null
        if (couponCode) {
            const { result, coupon } = await orderService.verifyCouponCore(couponCode, customerId)
            if (result === Result.Valid) {
                couponId = coupon!.couponId
                if (coupon!.type === 'PERCENTAGE') {
                    totalAmount -= Math.round(totalAmount * (coupon!.amount / 100))
                } else {
                    totalAmount -= Math.min(totalAmount, coupon!.amount)
                }
            }
        }

        await cartService.convertActiveCart(customerId)
        await prisma.order.create({
            data: {
                customerId: customerId,
                couponId: couponId,
                note: note ?? null,
                recipientName: recipientName ?? null,
                deliveryAddress: deliveryAddress ?? null,
                deliveryPhone: deliveryPhone ?? null,
                totalAmount: totalAmount,
                orderItems: {
                    create: orderItems
                }
            }
        })
    },

    updateOrderStatus: async (orderId: number, newStatus: OrderStatus, staffId: number) => {
        const order = await prisma.order.findFirst({ where: { orderId: orderId }, include: { orderItems: true } })
        if (!order) throw new HttpException(404, errorMessage.ORDER_NOT_FOUND)

        const currentStatus = order.status as OrderStatus
        if (!transitionMap[currentStatus].includes(newStatus)) throw new HttpException(400, errorMessage.INVALID_STATUS_SELECTED)

        if (newStatus === 'ACCEPTED') {
            const isStockAdaptable = await orderService.isStockAdaptableForOrder(orderId)
            if (!isStockAdaptable) throw new HttpException(400, errorMessage.STOCK_NOT_ENOUGH_FOR_ORDER)

            await Promise.all(
                order.orderItems.map(async item => {
                    await prisma.productItem.update({
                        where: { productItemId: item.productItemId },
                        data: {
                            stock: { decrement: item.quantity }
                        }
                    })
                })
            )
        }

        if (newStatus === 'RETURNED') {
            await Promise.all(
                order.orderItems.map(async item => {
                    await prisma.productItem.update({
                        where: { productItemId: item.productItemId },
                        data: {
                            stock: { increment: item.quantity }
                        }
                    })
                })
            )
        }

        const isRefunded = order.status === 'DELIVERY_SUCCESS' && newStatus === 'RETURNED'
        const isSuccess = order.status === 'DISPATCHED' && newStatus === 'DELIVERY_SUCCESS'

        await prisma.order.update({
            where: { orderId: orderId },
            data: {
                status: newStatus,
                deliveredAt: isSuccess ? new Date() : order.deliveredAt,
                refundedAt: isRefunded ? new Date() : order.refundedAt
            }
        })
        await prisma.orderStatusUpdateLog.create({
            data: {
                orderId: orderId,
                status: newStatus,
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
            if (!productItem || productItem.stock < item.quantity) return false
        }

        return true
    },

    getOrdersPlacedInTimeRange: async (startDate: Date, endDate: Date) => {
        const orders = await prisma.order.findMany({
            where: { createdAt: { gte: startDate, lt: endDate } }
        })

        return orders
    },

    getOrdersAccountedInTimeRange: async (startDate: Date, endDate: Date) => {
        const orders = await prisma.order.findMany({
            where: { deliveredAt: { gte: startDate, lt: endDate } }
        })

        return orders
    },

    getOrdersRefundedInTimeRange: async (startDate: Date, endDate: Date) => {
        const orders = await prisma.order.findMany({
            where: { refundedAt: { gte: startDate, lt: endDate } }
        })

        return orders
    }
}

export default orderService
