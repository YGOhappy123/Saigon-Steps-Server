import { PrismaClient, Prisma, CartStatus, CouponType, OrderStatus, InventoryDamageReason, ShoeGender } from '@prisma/client'

export const prisma = new PrismaClient()

export type Order = Prisma.OrderGetPayload<{}>
export type DamageReport = Prisma.InventoryDamageReportGetPayload<{}>
export type ProductImport = Prisma.ProductImportGetPayload<{}>

export { CartStatus, CouponType, OrderStatus, InventoryDamageReason, ShoeGender }
