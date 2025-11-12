import { PrismaClient } from '@prisma/client'
import { seedRolesAndPermissions, seedAccountsAndUsers } from './users.seed'
import { seedBrandsAndCategories, seedProducts, seedProductFeatures } from './products.seed'
import { seedPromotionsAndCoupons } from './promotions.seed'
import { seedOrderStatuses } from './orders.seed'

const prisma = new PrismaClient()

const seedData = async () => {
    await seedRolesAndPermissions(prisma)
    await seedAccountsAndUsers(prisma)
    await seedBrandsAndCategories(prisma)
    await seedProducts(prisma)
    await seedProductFeatures(prisma)
    await seedPromotionsAndCoupons(prisma)
    await seedOrderStatuses(prisma)
}

seedData().finally(async () => {
    await prisma.$disconnect()
})
