import { PrismaClient, CartStatus, CouponType, OrderStatus, InventoryDamageReason, ShoeGender } from '@prisma/client'

export const prisma = new PrismaClient()
export { CartStatus, CouponType, OrderStatus, InventoryDamageReason, ShoeGender }
