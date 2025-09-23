import { CartStatus, prisma } from '@/prisma'

const cartService = {
    getCustomerActiveCart: async (customerId: number) => {
        return await prisma.customerCart.findFirst({
            where: { customerId: customerId, status: CartStatus.ACTIVE },
            include: { items: true }
        })
    }
}

export default cartService
