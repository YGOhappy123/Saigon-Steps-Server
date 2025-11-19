import { prisma } from '@/prisma'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import productService from '@/services/product.service'

const inventoryService = {
    getInventoryUpdateLogs: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const logs = await prisma.inventoryUpdateLog.findMany({
            where: whereStatement,
            include: { order: { include: { customer: true } }, import: true, damageReport: true },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })
        const total = await prisma.inventoryUpdateLog.count({ where: whereStatement })

        const mappedLogs = await Promise.all(
            logs.map(async updateLog => {
                const productItemData = await productService.getDetailedProductItemById(updateLog.productItemId)

                return {
                    ...updateLog,
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

        return {
            logs: mappedLogs,
            total: total
        }
    }
}

export default inventoryService
