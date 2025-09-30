import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import errorMessage from '@/configs/errorMessage'

const categoryService = {
    getAllShoeCategories: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const categories = await prisma.shoeCategory.findMany({
            where: whereStatement,
            include: { createdByStaff: true },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })
        const total = await prisma.rootProduct.count({ where: whereStatement })

        return {
            categories: categories,
            total: total
        }
    },

    addNewShoeCategory: async (name: string, staffId: number) => {
        const categoryWithSameName = await prisma.shoeCategory.findFirst({ where: { name: name } })
        if (categoryWithSameName) throw new HttpException(409, errorMessage.CATEGORY_EXISTED)

        await prisma.shoeCategory.create({
            data: {
                name: name,
                createdBy: staffId
            }
        })
    },

    updateShoeCategory: async (categoryId: number, name: string) => {
        const category = await prisma.shoeCategory.findFirst({ where: { categoryId: categoryId } })
        if (!category) throw new HttpException(404, errorMessage.CATEGORY_NOT_FOUND)

        const categoryWithSameName = await prisma.shoeCategory.findFirst({ where: { name: name, categoryId: { not: categoryId } } })
        if (categoryWithSameName) throw new HttpException(409, errorMessage.CATEGORY_EXISTED)

        await prisma.shoeCategory.update({
            where: { categoryId: categoryId },
            data: { name: name }
        })
    },

    deleteShoeCategory: async (categoryId: number) => {
        const category = await prisma.shoeCategory.findFirst({ where: { categoryId: categoryId } })
        if (!category) throw new HttpException(404, errorMessage.CATEGORY_NOT_FOUND)

        const shoesWithThisCategory = await prisma.shoeFeature.count({ where: { categoryId: categoryId } })
        if (shoesWithThisCategory > 0) throw new HttpException(400, errorMessage.CATEGORY_BEING_USED)

        await prisma.shoeCategory.delete({
            where: { categoryId: categoryId }
        })
    }
}

export default categoryService
