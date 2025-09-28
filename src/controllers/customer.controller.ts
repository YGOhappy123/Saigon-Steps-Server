import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpException } from '@/errors/HttpException'
import { RequestWithAuthData } from '@/interfaces/auth'
import { ISearchParams } from '@/interfaces/params'
import successMessage from '@/configs/successMessage'
import errorMessage from '@/configs/errorMessage'
import authService from '@/services/auth.service'
import customerService from '@/services/customer.service'
import cartService from '@/services/cart.service'
import roleService from '@/services/role.service'
import appPermissions from '@/configs/appPermissions'

const customerController = {
    getAllCustomers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { skip, limit, sort, filter } = req.query
            const { customers, total } = await customerService.getAllCustomers({
                skip: skip !== undefined ? parseInt(skip as string) : undefined,
                limit: limit !== undefined ? parseInt(limit as string) : undefined,
                sort,
                filter
            } as ISearchParams)

            res.status(200).json({ data: customers, total, took: customers.length })
        } catch (error) {
            next(error)
        }
    },

    deactivateCustomerAccount: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { roleId } = req.auth!
            const hasPermission = await roleService.verifyPermission(roleId!, appPermissions.DEACTIVATE_CUSTOMER_ACCOUNT)
            if (!hasPermission) throw new HttpException(403, errorMessage.NO_PERMISSION)

            const { customerId } = req.params
            await authService.deactivateCustomerAccount(parseInt(customerId))

            res.status(200).json({
                message: successMessage.DEACTIVATE_CUSTOMER_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    getCustomerActiveCart: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.auth!
            const cart = await cartService.getCustomerActiveCart(userId)

            res.status(200).json({
                data: cart
            })
        } catch (error) {
            next(error)
        }
    },

    addCartItem: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId } = req.auth!
            const { productItemId, quantity } = req.body
            const isNewItemAdded = await cartService.addCartItem(productItemId, quantity, userId)

            res.status(isNewItemAdded ? 201 : 200).json({
                message: successMessage.ADD_TO_CART_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    updateCartItem: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId } = req.auth!
            const { productItemId } = req.params
            const { newProductItemId, quantity } = req.body
            await cartService.updateCartItem(parseInt(productItemId), newProductItemId, quantity, userId)

            res.status(200).json({
                message: successMessage.UPDATE_CART_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    deleteCartItem: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.auth!
            const { productItemId } = req.params
            await cartService.deleteCartItem(parseInt(productItemId), userId)

            res.status(200).json({
                message: successMessage.UPDATE_CART_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    resetCustomerCart: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.auth!
            await cartService.resetCustomerCart(userId)

            res.status(200).json({
                message: successMessage.RESET_CART_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    getCustomerAddresses: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.auth!
            const { skip, limit, sort, filter } = req.query
            const { addresses, total } = await customerService.getCustomerAddresses(
                {
                    skip: skip !== undefined ? parseInt(skip as string) : undefined,
                    limit: limit !== undefined ? parseInt(limit as string) : undefined,
                    sort,
                    filter
                } as ISearchParams,
                userId
            )

            res.status(200).json({ data: addresses, total, took: addresses.length })
        } catch (error) {
            next(error)
        }
    },

    addCustomerAddress: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new HttpException(422, errorMessage.DATA_VALIDATION_FAILED)

            const { userId } = req.auth!
            const { recipientName, phoneNumber, city, ward, addressLine } = req.body
            await customerService.addCustomerAddress(recipientName, phoneNumber, city, ward, addressLine, userId)

            res.status(201).json({
                message: successMessage.ADD_ADDRESS_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    setCustomerAddressAsDefault: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.auth!
            const { addressId } = req.params
            await customerService.setCustomerAddressAsDefault(parseInt(addressId), userId)

            res.status(200).json({
                message: successMessage.UPDATE_ADDRESS_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    },

    deleteCustomerAddress: async (req: RequestWithAuthData, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.auth!
            const { addressId } = req.params
            await customerService.deleteCustomerAddress(parseInt(addressId), userId)

            res.status(200).json({
                message: successMessage.DELETE_ADDRESS_SUCCESSFULLY
            })
        } catch (error) {
            next(error)
        }
    }
}

export default customerController
