import { PrismaClient, Prisma, CartStatus, CouponType, InventoryDamageReason, InventoryUpdateType, ShoeGender } from '@prisma/client'

export const prisma = new PrismaClient()

export type Order = Prisma.OrderGetPayload<{}>
export type OrderWithItems = Prisma.OrderGetPayload<{ include: { orderItems: true } }>
export type DamageReport = Prisma.InventoryDamageReportGetPayload<{}>
export type ProductImport = Prisma.ProductImportGetPayload<{}>

export { CartStatus, CouponType, InventoryDamageReason, InventoryUpdateType, ShoeGender }
