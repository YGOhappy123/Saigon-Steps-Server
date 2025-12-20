import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import { capitalizeFirstWord, capitalizeWords, generateProductBarcode, uppercaseWords } from '@/utils/stringHelpers'
import { getProductSlug } from '@/utils/slugifyHelpers'
import { getNow } from '@/utils/timeHelpers'
import errorMessage from '@/configs/errorMessage'
import flaskService from '@/services/flask.service'

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
                images: { orderBy: { imageId: 'asc' } },
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
                const mappedItems = await Promise.all(
                    product.productItems.map(async item => {
                        const currentStock = await productService.getProductItemCurrentStock(item.productItemId)

                        return {
                            productItemId: item.productItemId,
                            size: item.size,
                            barcode: item.barcode,
                            stock: item.stock,
                            availableStock: currentStock
                        }
                    })
                )

                return {
                    ...product,
                    discountRate: discountRate,
                    images: product.images.map(image => image.url),
                    productItems: mappedItems,
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

    getProductBySlug: async (slug: string) => {
        const product = await prisma.rootProduct.findFirst({
            where: { slug: slug },
            include: {
                images: { orderBy: { imageId: 'asc' } },
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
        const mappedItems = await Promise.all(
            product.productItems.map(async item => {
                const currentStock = await productService.getProductItemCurrentStock(item.productItemId)

                return {
                    productItemId: item.productItemId,
                    size: item.size,
                    barcode: item.barcode,
                    stock: item.stock,
                    availableStock: currentStock
                }
            })
        )

        return product == null
            ? null
            : {
                  ...product,
                  productItems: mappedItems,
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

    getProductById: async (productId: number) => {
        const product = await prisma.rootProduct.findFirst({
            where: { rootProductId: productId },
            include: {
                images: { orderBy: { imageId: 'asc' } },
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
        const mappedItems = await Promise.all(
            product.productItems.map(async item => {
                const currentStock = await productService.getProductItemCurrentStock(item.productItemId)

                return {
                    productItemId: item.productItemId,
                    size: item.size,
                    barcode: item.barcode,
                    stock: item.stock,
                    availableStock: currentStock
                }
            })
        )

        return product == null
            ? null
            : {
                  ...product,
                  productItems: mappedItems,
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
        const whereStatement = { OR: [{ name: { contains: searchTerm } }, { brand: { name: { contains: searchTerm } } }] }

        const products = await prisma.rootProduct.findMany({
            where: whereStatement,
            include: {
                images: { orderBy: { imageId: 'asc' } },
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
                const mappedItems = await Promise.all(
                    product.productItems.map(async item => {
                        const currentStock = await productService.getProductItemCurrentStock(item.productItemId)

                        return {
                            productItemId: item.productItemId,
                            size: item.size,
                            barcode: item.barcode,
                            stock: item.stock,
                            availableStock: currentStock
                        }
                    })
                )

                return {
                    ...product,
                    productItems: mappedItems,
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
                        images: { orderBy: { imageId: 'asc' } },
                        brand: true,
                        productItems: true,
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
                const mappedItems = await Promise.all(
                    item.rootProduct.productItems.map(async _item => {
                        const currentStock = await productService.getProductItemCurrentStock(_item.productItemId)

                        return {
                            productItemId: _item.productItemId,
                            size: _item.size,
                            barcode: _item.barcode,
                            stock: _item.stock,
                            availableStock: currentStock
                        }
                    })
                )

                return {
                    ...item,
                    rootProduct: {
                        ...item.rootProduct,
                        productItems: mappedItems,
                        discountRate: discountRate,
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
                        images: { orderBy: { imageId: 'asc' } },
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

        return Math.max(productItem.stock - productItem.reservedQuantity, 0)
    }
}

export default productService
