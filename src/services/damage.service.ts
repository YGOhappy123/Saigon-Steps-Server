import { prisma, InventoryUpdateType } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import errorMessage from '@/configs/errorMessage'
import productService from '@/services/product.service'

const damageService = {
    getAllDamageReports: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const reports = await prisma.inventoryDamageReport.findMany({
            where: whereStatement,
            include: { reportedByStaff: true, reportItems: true },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })
        const total = await prisma.inventoryDamageReport.count({ where: whereStatement })

        const mappedReports = await Promise.all(
            reports.map(async productImport => ({
                ...productImport,
                reportItems: await Promise.all(
                    productImport.reportItems.map(async item => {
                        const productItemData = await productService.getDetailedProductItemById(item.productItemId)

                        return {
                            expectedCost: item.expectedCost,
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
            reports: mappedReports,
            total: total
        }
    },

    reportNewDamage: async (
        reason: 'LOST' | 'BROKEN' | 'DEFECTIVE' | 'OTHER',
        note: string | undefined,
        items: { productItemId: number; quantity: number; expectedCost: number }[],
        staffId: number
    ) => {
        const isStockAdaptable = await damageService.isStockAdaptableForDamageReport(items)
        if (!isStockAdaptable) throw new HttpException(400, errorMessage.QUANTITY_EXCEED_CURRENT_STOCK)

        const newReport = await prisma.inventoryDamageReport.create({
            data: {
                reason: reason,
                note: note ?? null,
                totalExpectedCost: items.reduce((sum, item) => sum + item.expectedCost * item.quantity, 0),
                reportedBy: staffId,
                reportItems: {
                    create: items.map(item => ({
                        productItemId: item.productItemId,
                        quantity: item.quantity,
                        expectedCost: item.expectedCost
                    }))
                }
            }
        })

        await Promise.all(
            items.map(async item => {
                await prisma.productItem.update({
                    where: { productItemId: item.productItemId },
                    data: {
                        stock: { decrement: item.quantity }
                    }
                })
                await prisma.inventoryUpdateLog.create({
                    data: {
                        damageReportId: newReport.reportId,
                        productItemId: item.productItemId,
                        quantity: item.quantity,
                        type: InventoryUpdateType.DAMAGE
                    }
                })
            })
        )
    },

    isStockAdaptableForDamageReport: async (items: { productItemId: number; quantity: number }[]) => {
        for (const item of items) {
            const productItem = await prisma.productItem.findFirst({ where: { productItemId: item.productItemId } })
            if (productItem == null) throw new HttpException(404, errorMessage.PRODUCT_ITEM_NOT_FOUND)
            if (item.quantity > productItem.stock) return false
        }

        return true
    },

    getDamageReportsRecordedInTimeRange: async (startDate: Date, endDate: Date) => {
        const reports = await prisma.inventoryDamageReport.findMany({
            where: { reportedAt: { gte: startDate, lt: endDate } }
        })

        return reports
    }
}

export default damageService
