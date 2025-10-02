import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import { getStartOfTimeByType, getEndOfTimeByType } from '@/utils/timeHelpers'
import errorMessage from '@/configs/errorMessage'

const promotionService = {
    getAllPromotions: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const promotions = await prisma.promotion.findMany({
            where: whereStatement,
            include: {
                createdByStaff: true,
                products: {
                    include: {
                        rootProduct: {
                            include: { images: true }
                        }
                    }
                }
            },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })

        const total = await prisma.promotion.count({ where: whereStatement })

        return {
            promotions: promotions.map(promotion => ({
                ...promotion,
                products: promotion.products.map(product => ({
                    ...product.rootProduct,
                    images: product.rootProduct.images.map(image => image.url)
                }))
            })),
            total: total
        }
    },

    addNewPromotion: async (
        name: string,
        description: string,
        discountRate: number,
        startDate: string,
        endDate: string,
        productIds: number[],
        staffId: number
    ) => {
        const promotionWithSameName = await prisma.promotion.findFirst({ where: { name: { equals: name } } })
        if (promotionWithSameName) throw new HttpException(409, errorMessage.PROMOTION_EXISTED)

        await prisma.promotion.create({
            data: {
                name: name,
                description: description,
                discountRate: discountRate,
                startDate: getStartOfTimeByType(startDate, 'daily').toDate(),
                endDate: getEndOfTimeByType(endDate, 'daily').toDate(),
                products: {
                    create: productIds.map(productId => ({
                        rootProduct: { connect: { rootProductId: productId } }
                    }))
                },
                createdByStaff: {
                    connect: { staffId: staffId }
                }
            }
        })
    },

    updatePromotion: async (
        promotionId: number,
        name: string,
        description: string,
        discountRate: number,
        startDate: string,
        endDate: string,
        productIds: number[]
    ) => {
        const promotion = await prisma.promotion.findUnique({ where: { promotionId: promotionId } })
        if (!promotion) throw new HttpException(404, errorMessage.PROMOTION_NOT_FOUND)

        const promotionWithSameName = await prisma.promotion.findFirst({ where: { name: { equals: name }, NOT: { promotionId: promotionId } } })
        if (promotionWithSameName) throw new HttpException(409, errorMessage.PROMOTION_EXISTED)

        await prisma.promotion.update({
            where: { promotionId: promotionId },
            data: {
                name: name,
                description: description,
                discountRate: discountRate,
                startDate: getStartOfTimeByType(startDate, 'daily').toDate(),
                endDate: getEndOfTimeByType(endDate, 'daily').toDate()
            }
        })
        await prisma.productPromotion.deleteMany({ where: { promotionId: promotionId } })
        await prisma.productPromotion.createMany({
            data: productIds.map(productId => ({ promotionId: promotionId, rootProductId: productId })),
            skipDuplicates: true
        })
    },

    disablePromotion: async (promotionId: number) => {
        const promotion = await prisma.promotion.findUnique({ where: { promotionId: promotionId } })
        if (!promotion) throw new HttpException(404, errorMessage.PROMOTION_NOT_FOUND)

        await prisma.promotion.update({
            where: { promotionId: promotionId },
            data: {
                isActive: false
            }
        })
    }
}

export default promotionService
