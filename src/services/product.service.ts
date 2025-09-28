import { prisma, OrderStatus } from '@/prisma'

const productService = {
    getProductItemCurrentStock: async (productItemId: number) => {
        const productItem = await prisma.productItem.findFirst({ where: { productItemId: productItemId } })
        if (!productItem) return 0

        const totalPendingItems = await prisma.orderItem.aggregate({
            where: { productItemId: productItemId, order: { status: OrderStatus.PENDING } },
            _sum: { quantity: true }
        })

        return Math.max(productItem.stock - (totalPendingItems._sum.quantity ?? 0), 0)
    }
}

export default productService
