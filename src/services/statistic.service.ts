import { Order, ProductImport, DamageReport, prisma } from '@/prisma'
import { StatisticType } from '@/interfaces/params'
import { getNow, getStartOfTimeByType, getPreviousTimeByType, isSame, getEndOfTimeByType } from '@/utils/timeHelpers'
import { Dayjs, ManipulateType } from 'dayjs'
import customerService from '@/services/customer.service'
import orderService from '@/services/order.service'
import importService from '@/services/import.service'
import damageService from '@/services/damage.service'

const statisticService = {
    getSummaryStatistic: async (type: StatisticType) => {
        const currentTime = getNow()
        const startOfCurrTime = getStartOfTimeByType(currentTime, type)
        const startOfPrevTime = getPreviousTimeByType(startOfCurrTime, type)

        const currCustomers = await customerService.getCustomersRegisteredInTimeRange(startOfCurrTime.toDate(), currentTime.toDate())
        const prevCustomers = await customerService.getCustomersRegisteredInTimeRange(startOfPrevTime.toDate(), startOfCurrTime.toDate())

        const currOrders = await orderService.getOrdersPlacedInTimeRange(startOfCurrTime.toDate(), currentTime.toDate())
        const prevOrders = await orderService.getOrdersPlacedInTimeRange(startOfPrevTime.toDate(), startOfCurrTime.toDate())

        const currRevenues = await orderService.getOrdersAccountedInTimeRange(startOfCurrTime.toDate(), currentTime.toDate())
        const prevRevenues = await orderService.getOrdersAccountedInTimeRange(startOfPrevTime.toDate(), startOfCurrTime.toDate())

        return {
            customers: {
                currentCount: currCustomers.length,
                previousCount: prevCustomers.length
            },
            orders: {
                currentCount: currOrders.length,
                previousCount: prevOrders.length
            },
            revenues: {
                currentCount: currRevenues.reduce((sum, order) => sum + order.totalAmount, 0),
                previousCount: prevRevenues.reduce((sum, order) => sum + order.totalAmount, 0)
            }
        }
    },

    getKeyCustomersStatistic: async (from: string | undefined, to: string | undefined) => {
        if (!from || !to || from > to) return { highestOrderCountCustomers: [], highestSpendingCustomers: [] }

        const isTodaySelected = to === getNow().format('YYYY-MM-DD')
        const startTime = getStartOfTimeByType(from, 'daily')
        const endTime = isTodaySelected ? getNow() : getEndOfTimeByType(to, 'daily')

        const highestOrderCountCustomers = await customerService.getCustomersWithHighestOrderCountInTimeRange(startTime.toDate(), endTime.toDate(), 5)
        const highestSpendingCustomers = await customerService.getCustomersWithHighestSpendingInTimeRange(startTime.toDate(), endTime.toDate(), 5)

        return {
            highestOrderCountCustomers: highestOrderCountCustomers,
            highestSpendingCustomers: highestSpendingCustomers
        }
    },

    prepareCreateChartParams: (startDate: Dayjs, endDate: Dayjs) => {
        const diffHours = endDate.diff(startDate, 'hour')
        const diffDays = endDate.diff(startDate, 'day')
        const diffMonths = endDate.diff(startDate, 'month')

        if (diffHours < 24) {
            return {
                columns: diffHours + 1,
                timeUnit: 'hour',
                format: 'HH:mm'
            }
        }
        if (diffDays < 31) {
            return {
                columns: diffDays + 1,
                timeUnit: 'day',
                format: 'DD-MM'
            }
        }
        return {
            columns: diffMonths + 1,
            timeUnit: 'month',
            format: 'MM-YYYY'
        }
    },

    createRevenuesChart: (
        accountedOrders: Order[],
        refundedOrders: Order[],
        productImports: ProductImport[],
        damageReports: DamageReport[],
        startDate: Dayjs,
        endDate: Dayjs
    ) => {
        const { columns, timeUnit, format } = statisticService.prepareCreateChartParams(startDate, endDate)

        const chartData = Array.from(Array(columns), (_, i) => ({
            date: startDate.add(i, timeUnit as ManipulateType),
            name: startDate.add(i, timeUnit as ManipulateType).format(format),
            totalImports: 0,
            totalDamages: 0,
            totalRefunds: 0,
            totalSales: 0
        }))

        accountedOrders.forEach(order => {
            const index = chartData.findIndex(result => isSame(order.deliveredAt!, result.date, timeUnit as ManipulateType))
            if (index !== -1) chartData[index].totalSales += order.totalAmount
        })

        refundedOrders.forEach(order => {
            const index = chartData.findIndex(result => isSame(order.refundedAt!, result.date, timeUnit as ManipulateType))
            if (index !== -1) chartData[index].totalRefunds -= order.totalAmount
        })

        productImports.forEach(importRecord => {
            const index = chartData.findIndex(result => isSame(importRecord.importDate, result.date, timeUnit as ManipulateType))
            if (index !== -1) chartData[index].totalImports -= importRecord.totalCost
        })

        damageReports.forEach(damage => {
            const index = chartData.findIndex(result => isSame(damage.reportedAt, result.date, timeUnit as ManipulateType))
            if (index !== -1) chartData[index].totalDamages -= damage.totalExpectedCost
        })

        return chartData
    },

    getRevenuesChart: async (from: string | undefined, to: string | undefined) => {
        if (!from || !to || from > to) return []

        const isTodaySelected = to === getNow().format('YYYY-MM-DD')
        const startTime = getStartOfTimeByType(from, 'daily')
        const endTime = isTodaySelected ? getNow() : getEndOfTimeByType(to, 'daily')

        const accountedOrders = await orderService.getOrdersAccountedInTimeRange(startTime.toDate(), endTime.toDate())
        const refundedOrders = await orderService.getOrdersRefundedInTimeRange(startTime.toDate(), endTime.toDate())
        const productImports = await importService.getProductImportsImportedInTimeRange(startTime.toDate(), endTime.toDate())
        const damageReports = await damageService.getDamageReportsRecordedInTimeRange(startTime.toDate(), endTime.toDate())

        const chartData = statisticService.createRevenuesChart(accountedOrders, refundedOrders, productImports, damageReports, startTime, endTime)
        return chartData
    },

    createOrdersChart: (accountedOrders: Order[], refundedOrders: Order[], startDate: Dayjs, endDate: Dayjs) => {
        const { columns, timeUnit, format } = statisticService.prepareCreateChartParams(startDate, endDate)

        const chartData = Array.from(Array(columns), (_, i) => ({
            date: startDate.add(i, timeUnit as ManipulateType),
            name: startDate.add(i, timeUnit as ManipulateType).format(format),
            totalRefunds: 0,
            totalSales: 0
        }))

        accountedOrders.forEach(order => {
            const index = chartData.findIndex(result => isSame(order.deliveredAt!, result.date, timeUnit as ManipulateType))
            if (index !== -1) chartData[index].totalSales += order.totalAmount
        })

        refundedOrders.forEach(order => {
            const index = chartData.findIndex(result => isSame(order.refundedAt!, result.date, timeUnit as ManipulateType))
            if (index !== -1) chartData[index].totalRefunds -= order.totalAmount
        })

        return chartData
    },

    getOrdersChartByCustomerId: async (customerId: number, from: string | undefined, to: string | undefined) => {
        if (!from || !to || from > to) return { count: { placed: 0, accounted: 0, refunded: 0 }, chart: [] }

        const isTodaySelected = to === getNow().format('YYYY-MM-DD')
        const startTime = getStartOfTimeByType(from, 'daily')
        const endTime = isTodaySelected ? getNow() : getEndOfTimeByType(to, 'daily')

        const placedOrders = await orderService.getOrdersPlacedInTimeRange(startTime.toDate(), endTime.toDate(), customerId)
        const accountedOrders = await orderService.getOrdersAccountedInTimeRange(startTime.toDate(), endTime.toDate(), customerId)
        const refundedOrders = await orderService.getOrdersRefundedInTimeRange(startTime.toDate(), endTime.toDate(), customerId)

        const chartData = statisticService.createOrdersChart(accountedOrders, refundedOrders, startTime, endTime)
        return {
            count: {
                placed: placedOrders.length,
                accounted: accountedOrders.length,
                refunded: refundedOrders.length
            },
            chart: chartData
        }
    },

    getProductsSalesStatistic: async (from: string | undefined, to: string | undefined, hasActivity: boolean) => {
        if (!from || !to || from > to) return []

        const isTodaySelected = to === getNow().format('YYYY-MM-DD')
        const startTime = getStartOfTimeByType(from, 'daily')
        const endTime = isTodaySelected ? getNow() : getEndOfTimeByType(to, 'daily')

        const productSales = await orderService.getProductsStatisticInTimeRange(startTime.toDate(), endTime.toDate())
        const productsData = await prisma.rootProduct.findMany({
            where: { rootProductId: hasActivity ? { in: productSales.map(data => data.rootProductId) } : undefined },
            include: {
                images: { orderBy: { imageId: 'asc' } },
                brand: true,
                shoeFeature: {
                    include: {
                        category: true
                    }
                }
            }
        })

        const mappedProductsData = productsData.map(product => {
            const salesStatistic = productSales.find(data => data.rootProductId === product.rootProductId)

            return {
                rootProductId: product.rootProductId,
                rootProduct: {
                    name: product.name,
                    slug: product.slug,
                    images: product.images.map(image => image.url),
                    brand: product.brand || null,
                    category: product.shoeFeature?.category || null
                },
                sales: {
                    totalSoldUnits: salesStatistic ? salesStatistic.totalSoldUnits : 0,
                    totalSales: salesStatistic ? salesStatistic.totalSales : 0,
                    totalRefundedUnits: salesStatistic ? salesStatistic.totalRefundedUnits : 0,
                    totalRefundedAmount: salesStatistic ? salesStatistic.totalRefundedAmount : 0
                }
            }
        })

        return {
            range: {
                from: startTime.toDate(),
                to: endTime.toDate()
            },
            sales: mappedProductsData.sort((a, b) => {
                const aHasSales = a.sales.totalSoldUnits > 0 || a.sales.totalRefundedUnits > 0 ? 1 : 0
                const bHasSales = b.sales.totalSoldUnits > 0 || a.sales.totalRefundedUnits > 0 ? 1 : 0

                if (aHasSales !== bHasSales) return bHasSales - aHasSales
                return b.sales.totalSales - a.sales.totalSales
            })
        }
    }
}

export default statisticService
