import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import { getStartOfTimeByType, getEndOfTimeByType } from '@/utils/timeHelpers'
import { capitalizeWords } from '@/utils/stringHelpers'
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
                            include: {
                                images: { orderBy: { imageId: 'asc' } }
                            }
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
        products: number[],
        staffId: number
    ) => {
        const promotionWithSameName = await prisma.promotion.findFirst({ where: { name: { equals: name } } })
        if (promotionWithSameName) throw new HttpException(409, errorMessage.PROMOTION_EXISTED)

        await prisma.promotion.create({
            data: {
                name: capitalizeWords(name, false),
                description: description,
                discountRate: discountRate,
                startDate: getStartOfTimeByType(startDate, 'daily').toDate(),
                endDate: getEndOfTimeByType(endDate, 'daily').toDate(),
                products: {
                    create: products.map(productId => ({
                        rootProduct: { connect: { rootProductId: productId } }
                    }))
                },
                createdByStaff: {
                    connect: { staffId: staffId }
                }
            }
        })
    },

    updatePromotion: async (promotionId: number, name: string, description: string, discountRate: number, endDate: string, products: number[]) => {
        const promotion = await prisma.promotion.findUnique({ where: { promotionId: promotionId } })
        if (!promotion) throw new HttpException(404, errorMessage.PROMOTION_NOT_FOUND)
        if (!promotion.isActive) throw new HttpException(400, errorMessage.PROMOTION_NO_LONGER_AVAILABLE)

        const promotionWithSameName = await prisma.promotion.findFirst({ where: { name: { equals: name }, NOT: { promotionId: promotionId } } })
        if (promotionWithSameName) throw new HttpException(409, errorMessage.PROMOTION_EXISTED)

        await prisma.promotion.update({
            where: { promotionId: promotionId },
            data: {
                name: capitalizeWords(name, false),
                description: description,
                discountRate: discountRate,
                endDate: getEndOfTimeByType(endDate, 'daily').toDate()
            }
        })
        await prisma.productPromotion.deleteMany({ where: { promotionId: promotionId } })
        await prisma.productPromotion.createMany({
            data: products.map(productId => ({ promotionId: promotionId, rootProductId: productId })),
            skipDuplicates: true
        })
    },

    disablePromotion: async (promotionId: number) => {
        const promotion = await prisma.promotion.findUnique({ where: { promotionId: promotionId } })
        if (!promotion) throw new HttpException(404, errorMessage.PROMOTION_NOT_FOUND)
        if (!promotion.isActive) throw new HttpException(400, errorMessage.PROMOTION_NO_LONGER_AVAILABLE)

        await prisma.promotion.update({
            where: { promotionId: promotionId },
            data: {
                isActive: false
            }
        })
    }
}

export default promotionService
