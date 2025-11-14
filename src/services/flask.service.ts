import { prisma, ProductForAI } from '@/prisma'
import { parsedEnv } from '@/env'
import FormData from 'form-data'
import axios from 'axios'
import productService from '@/services/product.service'

const flaskService = {
    recreateCollections: async () => {
        await axios.post(`${parsedEnv.AI_SERVER_URL}/recreate-collections`)
    },

    formatProductForAI: (product: ProductForAI) => {
        return {
            rootProductId: product.rootProductId,
            name: product.name,
            price: product.price,
            brand: product.brand.name,
            sizes: product.productItems.map(item => item.size),
            images: product.images.map(img => img.url),
            shoeFeature: {
                gender: product.shoeFeature!.gender,
                upperMaterial: product.shoeFeature!.upperMaterial,
                soleMaterial: product.shoeFeature!.soleMaterial,
                breathability: product.shoeFeature!.breathability,
                primaryColor: product.shoeFeature!.primaryColor,
                secondaryColor: product.shoeFeature!.secondaryColor ?? null,
                durabilityRating: product.shoeFeature!.durabilityRating,
                category: product.shoeFeature!.category!.name,
                occasionTags: (product.shoeFeature!.occasionTags ?? []).map(tag => tag.occasionTag.name),
                designTags: (product.shoeFeature!.designTags ?? []).map(tag => tag.designTag.name)
            }
        }
    },

    syncProducts: async () => {
        const shoeProducts = await prisma.rootProduct.findMany({
            where: { isAccessory: false },
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
            },
            orderBy: { rootProductId: 'asc' }
        })

        const total = shoeProducts.length
        if (total === 0) return

        await flaskService.recreateCollections()
        console.log('Recreated collections in vector database.')

        const formattedProducts = shoeProducts.map(product => flaskService.formatProductForAI(product))
        let count = 0
        for (const item of formattedProducts) {
            await axios.post(`${parsedEnv.AI_SERVER_URL}/add-product`, item)
            console.log(`Product added. Current progress: ${++count}/${total}`)
        }
    },

    addProduct: async (productId: number) => {
        const shoeProduct = await prisma.rootProduct.findFirst({
            where: { rootProductId: productId, isAccessory: false },
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
        })

        if (!shoeProduct) return

        const formattedProduct = flaskService.formatProductForAI(shoeProduct)
        await axios.post(`${parsedEnv.AI_SERVER_URL}/add-product`, formattedProduct)
    },

    updateProduct: async (productId: number) => {
        const shoeProduct = await prisma.rootProduct.findFirst({
            where: { rootProductId: productId, isAccessory: false },
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
        })

        if (!shoeProduct) return

        const formattedProduct = flaskService.formatProductForAI(shoeProduct)
        await axios.patch(`${parsedEnv.AI_SERVER_URL}/update-product/${productId}`, formattedProduct)
    },

    deleteProduct: async (productId: number) => {
        await axios.delete(`${parsedEnv.AI_SERVER_URL}/delete-product/${productId}`)
    },

    imageSearch: async (imageBuffer: Buffer, imageName: string, imageType: string) => {
        const formData = new FormData()
        formData.append('image', imageBuffer, {
            filename: imageName,
            contentType: imageType
        })

        const response = await axios.post(`${parsedEnv.AI_SERVER_URL}/image-search`, formData, {
            headers: formData.getHeaders()
        })
        const detections: {
            boundingBox: { x1: number; x2: number; y1: number; y2: number }
            products: [number, number][]
        }[] = response?.data?.data?.detections ?? []

        const distinctProductIds = detections.reduce((acc: number[], detection) => {
            detection.products.forEach(([productId, _]) => {
                if (!acc.includes(productId)) {
                    acc.push(productId)
                }
            })
            return acc
        }, [])
        const detectedProducts = await Promise.all(
            distinctProductIds.map(async productId => {
                const product = await productService.getProductById(productId)

                return product
            })
        )

        const detectionsWithProducts = detections.map(detection => {
            const productsWithDetails = detection.products.map(([productId, certainty]) => {
                const product = detectedProducts.find(p => p!.rootProductId === productId)
                return {
                    ...product,
                    certainty: certainty
                }
            })

            return {
                boundingBox: detection.boundingBox,
                products: productsWithDetails
            }
        })

        return detectionsWithProducts
    },

    semanticSearch: async (query: string) => {
        const response = await axios.post(`${parsedEnv.AI_SERVER_URL}/semantic-search`, { query: query })
        const detections: [number, number][] = response?.data?.data?.detections ?? []

        const detectedProducts = await Promise.all(
            detections.map(async ([productId, certainty]) => {
                const product = await productService.getProductById(productId)

                return {
                    ...product,
                    certainty: certainty
                }
            })
        )

        return detectedProducts
    }
}

export default flaskService
