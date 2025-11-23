import { PrismaClient } from '@prisma/client'
import { seedRolesAndPermissions, seedAccountsAndUsers } from './users.seed'
import { seedProductTags, seedBrandsAndCategories } from './features.seed'
import { seedPromotionsAndCoupons } from './promotions.seed'
import { seedOrderStatuses } from './orderStatuses.seed'
import { seedProducts as seedProductBatch1 } from './productsBatch1.seed'
import { seedProducts as seedProductBatch2 } from './productsBatch2.seed'
import { seedProducts as seedProductBatch3 } from './productsBatch3.seed'
import { seedProducts as seedProductBatch4 } from './productsBatch4.seed'
import { seedProducts as seedProductBatch5 } from './productsBatch5.seed'
import { seedProducts as seedProductBatch6 } from './productsBatch6.seed'

const prisma = new PrismaClient()

const seedData = async () => {
    await seedRolesAndPermissions(prisma)
    await seedAccountsAndUsers(prisma)

    await seedBrandsAndCategories(prisma)
    await seedProductTags(prisma)

    await seedProductBatch1(prisma)
    await seedProductBatch2(prisma)
    await seedProductBatch3(prisma)
    await seedProductBatch4(prisma)
    await seedProductBatch5(prisma)
    await seedProductBatch6(prisma)

    await seedPromotionsAndCoupons(prisma)
    await seedOrderStatuses(prisma)
}

seedData().finally(async () => {
    await prisma.$disconnect()
})
