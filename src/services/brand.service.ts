import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import { capitalizeWords } from '@/utils/stringHelpers'
import errorMessage from '@/configs/errorMessage'

const brandService = {
    getAllProductBrands: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const brands = await prisma.productBrand.findMany({
            where: whereStatement,
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })
        const total = await prisma.rootProduct.count({ where: whereStatement })

        return {
            brands: brands,
            total: total
        }
    },

    addNewProductBrand: async (name: string, description: string, logoUrl: string | undefined) => {
        const brandWithSameName = await prisma.productBrand.findFirst({ where: { name: name } })
        if (brandWithSameName) throw new HttpException(409, errorMessage.BRAND_EXISTED)

        await prisma.productBrand.create({
            data: {
                name: capitalizeWords(name, false),
                description: description,
                logoUrl: logoUrl ?? null
            }
        })
    },

    updateProductBrand: async (brandId: number, name: string, description: string, logoUrl: string | undefined) => {
        const brand = await prisma.productBrand.findFirst({ where: { brandId: brandId } })
        if (!brand) throw new HttpException(404, errorMessage.BRAND_NOT_FOUND)

        const brandWithSameName = await prisma.productBrand.findFirst({ where: { name: name, brandId: { not: brandId } } })
        if (brandWithSameName) throw new HttpException(409, errorMessage.BRAND_EXISTED)

        await prisma.productBrand.update({
            where: { brandId: brandId },
            data: {
                name: capitalizeWords(name, false),
                description: description,
                logoUrl: logoUrl ?? null
            }
        })
    },

    deleteProductBrand: async (brandId: number) => {
        const brand = await prisma.productBrand.findFirst({ where: { brandId: brandId } })
        if (!brand) throw new HttpException(404, errorMessage.BRAND_NOT_FOUND)

        const productsWithThisBrand = await prisma.rootProduct.count({ where: { brandId: brandId } })
        if (productsWithThisBrand > 0) throw new HttpException(400, errorMessage.BRAND_BEING_USED)

        await prisma.productBrand.delete({
            where: { brandId: brandId }
        })
    }
}

export default brandService
