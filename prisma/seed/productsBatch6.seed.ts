import { PrismaClient, ShoeGender } from '@prisma/client'
import { generateProductBarcode } from '../../src/utils/stringHelpers'

export const seedProducts = async (prisma: PrismaClient) => {
    // --- Root Products ---
    await prisma.rootProduct.createMany({
        data: []
    })

    // --- Product Images ---
    await prisma.productImage.createMany({
        data: []
    })

    // --- Product Items ---
    await prisma.productItem.createMany({
        data: []
    })

    // --- Shoe Features ---
    await prisma.shoeFeature.createMany({
        data: []
    })

    // --- Shoe Feature - Occasion Tag ---
    await prisma.shoeFeatureOccasionTag.createMany({
        data: []
    })

    // --- Shoe Feature - Design Tag ---
    await prisma.shoeFeatureDesignTag.createMany({
        data: []
    })
}
