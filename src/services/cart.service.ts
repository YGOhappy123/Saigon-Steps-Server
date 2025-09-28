import { prisma, CartStatus } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import productService from '@/services/product.service'
import errorMessage from '@/configs/errorMessage'

const cartService = {
    getCustomerActiveCart: async (customerId: number) => {
        const activeCart = await prisma.customerCart.findFirst({
            where: { customerId: customerId, status: CartStatus.ACTIVE },
            include: { items: true }
        })

        return activeCart
    },

    addCartItem: async (productItemId: number, quantity: number, customerId: number) => {
        let isNewItemAdded = false
        const availableStock = await productService.getProductItemCurrentStock(productItemId)

        const activeCart = await prisma.customerCart.findFirst({ where: { customerId: customerId, status: CartStatus.ACTIVE } })
        if (!activeCart) {
            if (quantity > availableStock) throw new HttpException(400, errorMessage.QUANTITY_EXCEED_CURRENT_STOCK)

            const newCart = await prisma.customerCart.create({
                data: {
                    customerId: customerId
                }
            })

            await prisma.cartItem.create({
                data: {
                    cartId: newCart.cartId,
                    productItemId: productItemId,
                    quantity: quantity
                }
            })

            isNewItemAdded = true
        } else {
            const existingItem = await prisma.cartItem.findFirst({ where: { cartId: activeCart.cartId, productItemId: productItemId } })
            if (!existingItem) {
                if (quantity > availableStock) throw new HttpException(400, errorMessage.QUANTITY_EXCEED_CURRENT_STOCK)

                await prisma.cartItem.create({
                    data: {
                        cartId: activeCart.cartId,
                        productItemId: productItemId,
                        quantity: quantity
                    }
                })

                isNewItemAdded = true
            } else {
                if (existingItem.quantity + quantity > availableStock) throw new HttpException(400, errorMessage.QUANTITY_EXCEED_CURRENT_STOCK)

                await prisma.cartItem.update({
                    where: {
                        cartId_productItemId: {
                            cartId: existingItem.cartId,
                            productItemId: existingItem.productItemId
                        }
                    },
                    data: {
                        quantity: existingItem.quantity + quantity
                    }
                })
            }

            await prisma.customerCart.update({
                where: { cartId: activeCart.cartId },
                data: {
                    updatedAt: new Date()
                }
            })
        }

        return isNewItemAdded
    },

    updateCartItem: async (productItemId: number, newProductItemId: number | undefined, quantity: number, customerId: number) => {
        const activeCart = await prisma.customerCart.findFirst({ where: { customerId: customerId, status: CartStatus.ACTIVE } })
        if (!activeCart) throw new HttpException(400, errorMessage.CART_NOT_FOUND)

        const cartItem = await prisma.cartItem.findFirst({ where: { cartId: activeCart.cartId, productItemId: productItemId } })
        if (!cartItem) throw new HttpException(400, errorMessage.CART_ITEM_NOT_FOUND)

        if (newProductItemId && newProductItemId !== productItemId) {
            // Change product variant
            const newAvailableStock = await productService.getProductItemCurrentStock(newProductItemId)

            const existingNewItem = await prisma.cartItem.findFirst({ where: { cartId: activeCart.cartId, productItemId: newProductItemId } })
            if (existingNewItem) {
                if (existingNewItem.quantity + quantity > newAvailableStock) throw new HttpException(400, errorMessage.QUANTITY_EXCEED_CURRENT_STOCK)

                await prisma.cartItem.update({
                    where: {
                        cartId_productItemId: {
                            cartId: existingNewItem.cartId,
                            productItemId: existingNewItem.productItemId
                        }
                    },
                    data: {
                        quantity: existingNewItem.quantity + quantity
                    }
                })
            } else {
                if (quantity > newAvailableStock) throw new HttpException(400, errorMessage.QUANTITY_EXCEED_CURRENT_STOCK)

                await prisma.cartItem.create({
                    data: {
                        cartId: activeCart.cartId,
                        productItemId: newProductItemId,
                        quantity: quantity
                    }
                })
            }

            await prisma.cartItem.delete({
                where: {
                    cartId_productItemId: {
                        cartId: cartItem.cartId,
                        productItemId: cartItem.productItemId
                    }
                }
            })
        } else {
            // Change quantity - same variant
            const availableStock = await productService.getProductItemCurrentStock(productItemId)
            if (quantity > availableStock) throw new HttpException(400, errorMessage.QUANTITY_EXCEED_CURRENT_STOCK)

            await prisma.cartItem.update({
                where: {
                    cartId_productItemId: {
                        cartId: cartItem.cartId,
                        productItemId: cartItem.productItemId
                    }
                },
                data: {
                    quantity: quantity
                }
            })
        }

        await prisma.customerCart.update({
            where: { cartId: activeCart.cartId },
            data: {
                updatedAt: new Date()
            }
        })
    },

    deleteCartItem: async (productItemId: number, customerId: number) => {
        const activeCart = await prisma.customerCart.findFirst({ where: { customerId: customerId, status: CartStatus.ACTIVE } })
        if (!activeCart) throw new HttpException(400, errorMessage.CART_NOT_FOUND)

        const cartItem = await prisma.cartItem.findFirst({ where: { cartId: activeCart.cartId, productItemId: productItemId } })
        if (!cartItem) throw new HttpException(400, errorMessage.CART_ITEM_NOT_FOUND)

        await prisma.cartItem.delete({
            where: {
                cartId_productItemId: {
                    cartId: cartItem.cartId,
                    productItemId: cartItem.productItemId
                }
            }
        })

        await prisma.customerCart.update({
            where: { cartId: activeCart.cartId },
            data: {
                updatedAt: new Date()
            }
        })
    },

    resetCustomerCart: async (customerId: number) => {
        const activeCart = await prisma.customerCart.findFirst({ where: { customerId: customerId, status: CartStatus.ACTIVE } })
        if (!activeCart) throw new HttpException(400, errorMessage.CART_NOT_FOUND)

        await prisma.customerCart.update({
            where: { cartId: activeCart.cartId },
            data: {
                updatedAt: new Date(),
                status: CartStatus.ABANDONED
            }
        })
    }
}

export default cartService
