import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import { parseTime } from '@/utils/timeHelpers'
import errorMessage from '@/configs/errorMessage'
import productService from '@/services/product.service'

const importService = {
    getAllProductImports: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const imports = await prisma.productImport.findMany({
            where: whereStatement,
            include: { trackedByStaff: true, importItems: true },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })
        const total = await prisma.productImport.count({ where: whereStatement })

        const mappedImports = await Promise.all(
            imports.map(async productImport => ({
                ...productImport,
                importItems: await Promise.all(
                    productImport.importItems.map(async item => {
                        const productItemData = await productService.getDetailedProductItemById(item.productItemId)

                        return {
                            cost: item.cost,
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
            imports: mappedImports,
            total: total
        }
    },

    trackNewProductImport: async (
        invoiceNumber: string,
        importDate: string,
        items: { productItemId: number; quantity: number; cost: number }[],
        staffId: number
    ) => {
        await Promise.all(
            items.map(async item => {
                const productItem = await prisma.productItem.findFirst({ where: { productItemId: item.productItemId } })
                if (productItem == null) throw new HttpException(404, errorMessage.PRODUCT_ITEM_NOT_FOUND)

                await prisma.productItem.update({
                    where: { productItemId: item.productItemId },
                    data: {
                        stock: { increment: item.quantity }
                    }
                })
            })
        )

        await prisma.productImport.create({
            data: {
                invoiceNumber: invoiceNumber,
                importDate: parseTime(importDate),
                totalCost: items.reduce((sum, item) => sum + item.cost * item.quantity, 0),
                trackedBy: staffId,
                importItems: {
                    create: items.map(item => ({
                        productItemId: item.productItemId,
                        quantity: item.quantity,
                        cost: item.cost
                    }))
                }
            }
        })
    },

    getProductImportsImportedInTimeRange: async (startDate: Date, endDate: Date) => {
        const imports = await prisma.productImport.findMany({
            where: { importDate: { gte: startDate, lt: endDate } }
        })

        return imports
    }
}

export default importService
