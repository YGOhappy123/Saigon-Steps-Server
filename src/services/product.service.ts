import { prisma, OrderStatus } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import { capitalizeFirstWord, capitalizeWords } from '@/utils/stringHelpers'
import { getProductSlug } from '@/utils/slugifyHelpers'
import { getNow } from '@/utils/timeHelpers'
import errorMessage from '@/configs/errorMessage'

type ShoeFeatures = {
    categoryId: number | undefined
    gender: 'MALE' | 'FEMALE' | 'UNISEX' | undefined
    upperMaterial: string | undefined
    soleMaterial: string | undefined
    liningMaterial: string | undefined
    closureType: string | undefined
    toeShape: string | undefined
    waterResistant: string | undefined
    breathability: string | undefined
    pattern: string | undefined
    countryOfOrigin: string | undefined
    primaryColor: string | undefined
    secondaryColor: string | undefined
    heelHeight: number | undefined
    durabilityRating: number | undefined
    releaseYear: number | undefined
    occasionTags: string[] | undefined
    designTags: string[] | undefined
}

const productService = {
    getAllProducts: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const products = await prisma.rootProduct.findMany({
            where: whereStatement,
            include: {
                images: true,
                brand: true,
                createdByStaff: true,
                productItems: true,
                shoeFeature: {
                    include: {
                        category: true,
                        occasionTags: { include: { occasionTag: true } },
                        designTags: { include: { designTag: true } }
                    }
                }
            },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })
        const total = await prisma.rootProduct.count({ where: whereStatement })

        const mappedProducts = await Promise.all(
            products.map(async product => {
                const { discountRate } = await productService.getProductPromotions(product.rootProductId)

                return {
                    ...product,
                    discountRate: discountRate,
                    images: product.images.map(image => image.url),
                    shoeFeature:
                        product.shoeFeature == null
                            ? null
                            : {
                                  ...product.shoeFeature,
                                  occasionTags: product.shoeFeature.occasionTags.map(tag => tag.occasionTag.name),
                                  designTags: product.shoeFeature.designTags.map(tag => tag.designTag.name)
                              }
                }
            })
        )

        return {
            products: mappedProducts,
            total: total
        }
    },

    getProductById: async (rootProductId: number) => {
        const product = await prisma.rootProduct.findFirst({
            where: { rootProductId: rootProductId },
            include: {
                images: true,
                brand: true,
                createdByStaff: true,
                productItems: true,
                shoeFeature: {
                    include: {
                        category: true,
                        occasionTags: { include: { occasionTag: true } },
                        designTags: { include: { designTag: true } }
                    }
                }
            }
        })
        const { promotions } = await productService.getProductPromotions(rootProductId)

        return product == null
            ? null
            : {
                  ...product,
                  promotions: promotions,
                  images: product.images.map(image => image.url),
                  shoeFeature: product.shoeFeature
                      ? {
                            ...product.shoeFeature,
                            occasionTags: product.shoeFeature.occasionTags.map(tag => tag.occasionTag.name),
                            designTags: product.shoeFeature.designTags.map(tag => tag.designTag.name)
                        }
                      : null
              }
    },

    getProductBySlug: async (slug: string) => {
        const product = await prisma.rootProduct.findFirst({
            where: { slug: slug },
            include: {
                images: true,
                brand: true,
                createdByStaff: true,
                productItems: true,
                shoeFeature: {
                    include: {
                        category: true,
                        occasionTags: { include: { occasionTag: true } },
                        designTags: { include: { designTag: true } }
                    }
                }
            }
        })
        if (product == null) return null

        const { promotions } = await productService.getProductPromotions(product.rootProductId)

        return product == null
            ? null
            : {
                  ...product,
                  promotions: promotions,
                  images: product.images.map(image => image.url),
                  shoeFeature: product.shoeFeature
                      ? {
                            ...product.shoeFeature,
                            occasionTags: product.shoeFeature.occasionTags.map(tag => tag.occasionTag.name),
                            designTags: product.shoeFeature.designTags.map(tag => tag.designTag.name)
                        }
                      : null
              }
    },

    searchProductsByName: async (searchTerm: string) => {
        const whereStatement = { name: { contains: searchTerm } }

        const products = await prisma.rootProduct.findMany({
            where: whereStatement,
            include: {
                images: true,
                brand: true,
                createdByStaff: true,
                productItems: true,
                shoeFeature: {
                    include: {
                        category: true,
                        occasionTags: { include: { occasionTag: true } },
                        designTags: { include: { designTag: true } }
                    }
                }
            }
        })
        const total = await prisma.rootProduct.count({ where: whereStatement })

        const mappedProducts = await Promise.all(
            products.map(async product => {
                const { discountRate } = await productService.getProductPromotions(product.rootProductId)
                return {
                    ...product,
                    discountRate: discountRate,
                    images: product.images.map(image => image.url),
                    shoeFeature:
                        product.shoeFeature == null
                            ? null
                            : {
                                  ...product.shoeFeature,
                                  occasionTags: product.shoeFeature.occasionTags.map(tag => tag.occasionTag.name),
                                  designTags: product.shoeFeature.designTags.map(tag => tag.designTag.name)
                              }
                }
            })
        )

        return {
            products: mappedProducts,
            total: total
        }
    },

    getDetailedProductItems: async (productItemIds: number[]) => {
        const whereStatement = { productItemId: { in: productItemIds } }

        const productItems = await prisma.productItem.findMany({
            where: whereStatement,
            include: {
                rootProduct: {
                    include: {
                        images: true,
                        brand: true,
                        createdByStaff: true,
                        shoeFeature: {
                            include: {
                                category: true,
                                occasionTags: { include: { occasionTag: true } },
                                designTags: { include: { designTag: true } }
                            }
                        }
                    }
                }
            }
        })
        const total = await prisma.productItem.count({ where: whereStatement })

        const mappedProductItems = await Promise.all(
            productItems.map(async item => {
                const { discountRate } = await productService.getProductPromotions(item.rootProductId)
                return {
                    ...item,
                    discountRate: discountRate,
                    rootProduct: {
                        ...item.rootProduct,
                        images: item.rootProduct.images.map(image => image.url),
                        shoeFeature:
                            item.rootProduct.shoeFeature == null
                                ? null
                                : {
                                      ...item.rootProduct.shoeFeature,
                                      occasionTags: item.rootProduct.shoeFeature.occasionTags.map(tag => tag.occasionTag.name),
                                      designTags: item.rootProduct.shoeFeature.designTags.map(tag => tag.designTag.name)
                                  }
                    }
                }
            })
        )

        return {
            productItems: mappedProductItems,
            total: total
        }
    },

    getDetailedProductItemById: async (productItemId: number) => {
        const productItem = await prisma.productItem.findFirst({
            where: { productItemId: productItemId },
            include: {
                rootProduct: {
                    include: {
                        images: true,
                        brand: true,
                        createdByStaff: true,
                        shoeFeature: {
                            include: {
                                category: true,
                                occasionTags: { include: { occasionTag: true } },
                                designTags: { include: { designTag: true } }
                            }
                        }
                    }
                }
            }
        })
        if (productItem == null) return null

        const { discountRate } = await productService.getProductPromotions(productItem.rootProductId)
        return {
            ...productItem,
            discountRate: discountRate,
            rootProduct: {
                ...productItem.rootProduct,
                images: productItem.rootProduct.images.map(image => image.url),
                shoeFeature:
                    productItem.rootProduct.shoeFeature == null
                        ? null
                        : {
                              ...productItem.rootProduct.shoeFeature,
                              occasionTags: productItem.rootProduct.shoeFeature.occasionTags.map(tag => tag.occasionTag.name),
                              designTags: productItem.rootProduct.shoeFeature.designTags.map(tag => tag.designTag.name)
                          }
            }
        }
    },

    getProductPromotions: async (rootProductId: number) => {
        const currentTime = getNow()

        const promotions = await prisma.promotion.findMany({
            where: {
                startDate: { lte: currentTime.toDate() },
                endDate: { gte: currentTime.toDate() },
                isActive: true,
                products: {
                    some: {
                        rootProductId: rootProductId
                    }
                }
            },
            orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }]
        })

        return {
            promotions: promotions,
            discountRate: promotions[0]?.discountRate ?? 0
        }
    },

    getProductItemCurrentStock: async (productItemId: number) => {
        const productItem = await prisma.productItem.findFirst({ where: { productItemId: productItemId } })
        if (!productItem) return 0

        const totalPendingItems = await prisma.orderItem.aggregate({
            where: { productItemId: productItemId, order: { status: OrderStatus.PENDING } },
            _sum: { quantity: true }
        })

        return Math.max(productItem.stock - (totalPendingItems._sum.quantity ?? 0), 0)
    },

    addNewProduct: async (
        brandId: number,
        name: string,
        description: string,
        price: number,
        isAccessory: boolean,
        images: string[],
        sizes: string[] | undefined,
        features: ShoeFeatures,
        staffId: number
    ) => {
        const productWithSameName = await prisma.rootProduct.findFirst({ where: { name: name } })
        if (productWithSameName) throw new HttpException(400, errorMessage.PRODUCT_EXISTED)

        const newProduct = await prisma.rootProduct.create({
            data: {
                brandId: brandId,
                name: name,
                slug: getProductSlug(name),
                description: description,
                price: price,
                isAccessory: isAccessory,
                createdBy: staffId,
                images: {
                    createMany: {
                        data: images.map(url => ({ url: url }))
                    }
                }
            }
        })

        if (!isAccessory) {
            await prisma.productItem.createMany({
                data: sizes!.map(size => ({
                    rootProductId: newProduct.rootProductId,
                    size: size
                }))
            })

            await prisma.shoeFeature.create({
                data: {
                    rootProductId: newProduct.rootProductId,
                    categoryId: features.categoryId!,
                    gender: features.gender!,
                    upperMaterial: features.upperMaterial!,
                    soleMaterial: features.soleMaterial!,
                    liningMaterial: features.liningMaterial!,
                    closureType: features.closureType!,
                    toeShape: features.toeShape!,
                    waterResistant: features.waterResistant!,
                    breathability: features.breathability!,
                    pattern: features.pattern!,
                    countryOfOrigin: capitalizeWords(features.countryOfOrigin!),
                    primaryColor: features.primaryColor!,
                    secondaryColor: features.secondaryColor ?? null,
                    heelHeight: features.heelHeight!,
                    durabilityRating: features.durabilityRating!,
                    releaseYear: features.releaseYear!,
                    occasionTags: {
                        create: features.occasionTags!.map(tag => ({
                            occasionTag: {
                                connectOrCreate: {
                                    where: { name: tag },
                                    create: { name: capitalizeFirstWord(tag) }
                                }
                            }
                        }))
                    },
                    designTags: {
                        create: features.designTags!.map(tag => ({
                            designTag: {
                                connectOrCreate: {
                                    where: { name: tag },
                                    create: { name: capitalizeFirstWord(tag) }
                                }
                            }
                        }))
                    }
                }
            })
        } else {
            await prisma.productItem.create({
                data: {
                    rootProductId: newProduct.rootProductId
                }
            })
        }
    },

    updateProductInfo: async (productId: number, brandId: number, name: string, description: string, images: string[], features: ShoeFeatures) => {
        const product = await prisma.rootProduct.findFirst({ where: { rootProductId: productId } })
        if (!product) throw new HttpException(404, errorMessage.PRODUCT_NOT_FOUND)

        const newSlug = getProductSlug(name)
        const productWithSameNameOrSlug = await prisma.rootProduct.findFirst({
            where: {
                OR: [{ name: name }, { slug: newSlug }],
                NOT: { rootProductId: productId }
            }
        })
        if (productWithSameNameOrSlug) throw new HttpException(400, errorMessage.PRODUCT_EXISTED)

        await prisma.rootProduct.update({
            where: { rootProductId: productId },
            data: {
                brandId: brandId,
                name: name,
                slug: newSlug,
                description: description
            }
        })

        await prisma.productImage.deleteMany({ where: { rootProductId: productId } })
        await prisma.productImage.createMany({
            data: images.map(url => ({ rootProductId: productId, url: url }))
        })

        if (!product.isAccessory) {
            const existingFeatures = await prisma.shoeFeature.findFirst({ where: { rootProductId: productId } })
            await prisma.shoeFeatureOccasionTag.deleteMany({ where: { shoeFeatureId: existingFeatures!.shoeFeatureId } })
            await prisma.shoeFeatureDesignTag.deleteMany({ where: { shoeFeatureId: existingFeatures!.shoeFeatureId } })

            await prisma.shoeFeature.update({
                where: { shoeFeatureId: existingFeatures!.shoeFeatureId },
                data: {
                    categoryId: features.categoryId!,
                    gender: features.gender!,
                    upperMaterial: features.upperMaterial!,
                    soleMaterial: features.soleMaterial!,
                    liningMaterial: features.liningMaterial!,
                    closureType: features.closureType!,
                    toeShape: features.toeShape!,
                    waterResistant: features.waterResistant!,
                    breathability: features.breathability!,
                    pattern: features.pattern!,
                    countryOfOrigin: capitalizeWords(features.countryOfOrigin!),
                    primaryColor: features.primaryColor!,
                    secondaryColor: features.secondaryColor ?? null,
                    heelHeight: features.heelHeight!,
                    durabilityRating: features.durabilityRating!,
                    releaseYear: features.releaseYear!,
                    occasionTags: {
                        create: features.occasionTags!.map(tag => ({
                            occasionTag: {
                                connectOrCreate: {
                                    where: { name: tag },
                                    create: { name: capitalizeFirstWord(tag) }
                                }
                            }
                        }))
                    },
                    designTags: {
                        create: features.designTags!.map(tag => ({
                            designTag: {
                                connectOrCreate: {
                                    where: { name: tag },
                                    create: { name: capitalizeFirstWord(tag) }
                                }
                            }
                        }))
                    }
                }
            })
        }
    },

    updateProductPrice: async (productId: number, price: number) => {
        const product = await prisma.rootProduct.findFirst({ where: { rootProductId: productId } })
        if (!product) throw new HttpException(404, errorMessage.PRODUCT_NOT_FOUND)

        await prisma.rootProduct.update({
            where: { rootProductId: productId },
            data: {
                price: price
            }
        })
    },

    deleteProduct: async (productId: number) => {
        const product = await prisma.rootProduct.findFirst({ where: { rootProductId: productId } })
        if (!product) throw new HttpException(404, errorMessage.PRODUCT_NOT_FOUND)

        const isDeletable = await productService.isProductDeletable(productId)
        if (!isDeletable) throw new HttpException(400, errorMessage.PRODUCT_BEING_USED)

        await prisma.shoeFeatureOccasionTag.deleteMany({
            where: { shoeFeature: { rootProductId: productId } }
        })
        await prisma.shoeFeatureDesignTag.deleteMany({
            where: { shoeFeature: { rootProductId: productId } }
        })
        await prisma.shoeFeature.delete({
            where: { rootProductId: productId }
        })

        await prisma.productImage.deleteMany({
            where: { rootProductId: productId }
        })
        await prisma.productItem.deleteMany({
            where: { rootProductId: productId }
        })
        await prisma.rootProduct.delete({
            where: { rootProductId: productId }
        })
    },

    isProductDeletable: async (rootProductId: number) => {
        const hasItemsReferences = await prisma.productItem.findFirst({
            where: {
                rootProductId: rootProductId,
                OR: [{ orderItems: { some: {} } }, { importItems: { some: {} } }, { damageReportItems: { some: {} } }]
            }
        })

        const hasPromotions = await prisma.productPromotion.findFirst({
            where: { rootProductId: rootProductId }
        })

        return !hasItemsReferences && !hasPromotions
    }
}

export default productService
