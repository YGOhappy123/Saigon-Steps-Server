import { Order, ProductImport, DamageReport } from '@/prisma'
import { StatisticType } from '@/interfaces/params'
import { getNow, getStartOfTimeByType, getPreviousTimeByType, isSame } from '@/utils/timeHelpers'
import { Dayjs, ManipulateType } from 'dayjs'
import customerService from '@/services/customer.service'
import orderService from '@/services/order.service'
import productService from '@/services/product.service'
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

    getKeyCustomersStatistic: async (type: StatisticType) => {
        const currentTime = getNow()
        const startOfCurrTime = getStartOfTimeByType(currentTime, type)

        const highestOrderCountCustomers = await customerService.getCustomersWithHighestOrderCountInTimeRange(
            startOfCurrTime.toDate(),
            currentTime.toDate(),
            5
        )

        const highestSpendingCustomers = await customerService.getCustomersWithHighestSpendingInTimeRange(
            startOfCurrTime.toDate(),
            currentTime.toDate(),
            5
        )

        return {
            highestOrderCountCustomers: highestOrderCountCustomers,
            highestSpendingCustomers: highestSpendingCustomers
        }
    },

    prepareCreateChartParams: (type: StatisticType, startDate: Dayjs) => {
        switch (type) {
            case 'daily':
                return {
                    columns: 24,
                    timeUnit: 'hour',
                    format: 'HH:mm'
                }
            case 'weekly':
                return {
                    columns: 7,
                    timeUnit: 'day',
                    format: 'dddd DD-MM'
                }
            case 'monthly':
                return {
                    columns: startDate.daysInMonth(),
                    timeUnit: 'day',
                    format: 'DD'
                }
            case 'yearly':
                return {
                    columns: 12,
                    timeUnit: 'month',
                    format: 'MMMM'
                }
        }
    },

    createRevenuesChart: (
        accountedOrders: Order[],
        refundedOrders: Order[],
        productImports: ProductImport[],
        damageReports: DamageReport[],
        startDate: Dayjs,
        type: StatisticType
    ) => {
        const { columns, timeUnit, format } = statisticService.prepareCreateChartParams(type, startDate)

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

    getRevenueChart: async (type: StatisticType) => {
        const currentTime = getNow()
        const startOfCurrTime = getStartOfTimeByType(currentTime, type)

        const accountedOrders = await orderService.getOrdersAccountedInTimeRange(startOfCurrTime.toDate(), currentTime.toDate())
        const refundedOrders = await orderService.getOrdersRefundedInTimeRange(startOfCurrTime.toDate(), currentTime.toDate())
        const productImports = await importService.getProductImportsImportedInTimeRange(startOfCurrTime.toDate(), currentTime.toDate())
        const damageReports = await damageService.getDamageReportsRecordedInTimeRange(startOfCurrTime.toDate(), currentTime.toDate())

        const chartData = statisticService.createRevenuesChart(accountedOrders, refundedOrders, productImports, damageReports, startOfCurrTime, type)
        return chartData
    },

    getProductStatistic: async (productId: number) => {
        const currentTime = getNow()

        const startOfCurrDay = getStartOfTimeByType(currentTime, 'daily')
        const productSalesDaily = await productService.getProductStatisticInTimeRange(productId, startOfCurrDay.toDate(), currentTime.toDate())

        const startOfCurrWeek = getStartOfTimeByType(currentTime, 'weekly')
        const productSalesWeekly = await productService.getProductStatisticInTimeRange(productId, startOfCurrWeek.toDate(), currentTime.toDate())

        const startOfCurrMonth = getStartOfTimeByType(currentTime, 'monthly')
        const productSalesMonthly = await productService.getProductStatisticInTimeRange(productId, startOfCurrMonth.toDate(), currentTime.toDate())

        const startOfCurrYear = getStartOfTimeByType(currentTime, 'yearly')
        const productSalesYearly = await productService.getProductStatisticInTimeRange(productId, startOfCurrYear.toDate(), currentTime.toDate())

        return {
            daily: productSalesDaily,
            weekly: productSalesWeekly,
            monthly: productSalesMonthly,
            yearly: productSalesYearly
        }
    }
}

export default statisticService
