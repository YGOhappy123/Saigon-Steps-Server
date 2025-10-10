import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import { capitalizeWords } from '@/utils/stringHelpers'
import errorMessage from '@/configs/errorMessage'

const customerService = {
    getAllCustomers: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const customers = await prisma.customer.findMany({
            where: whereStatement,
            include: { account: true },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })

        const total = await prisma.customer.count({ where: whereStatement })

        return {
            customers: customers.map(({ account, ...customerData }) => ({
                ...customerData,
                isActive: account.isActive
            })),
            total: total
        }
    },

    updateCustomerInfo: async (customerId: number, name: string, email: string, avatar: string) => {
        const customer = await prisma.customer.findFirst({ where: { customerId: customerId, account: { isActive: true } } })
        if (!customer) throw new HttpException(404, errorMessage.USER_NOT_FOUND)

        const customerWithThisEmail = await prisma.customer.findFirst({
            where: { email: email, account: { isActive: true }, NOT: { customerId: customerId } }
        })
        if (customerWithThisEmail) throw new HttpException(400, errorMessage.EMAIL_EXISTED)

        await prisma.customer.update({
            where: { customerId: customerId },
            data: {
                name: capitalizeWords(name),
                email: email,
                avatar: avatar
            }
        })
    },

    getCustomerAddresses: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams, customerId: number) => {
        const whereStatement = { ...buildWhereStatement(filter), customerId: customerId }

        const addresses = await prisma.customerAddress.findMany({
            where: whereStatement,
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })

        const total = await prisma.customerAddress.count({ where: whereStatement })

        return {
            addresses: addresses,
            total: total
        }
    },

    addCustomerAddress: async (recipientName: string, phoneNumber: string, city: string, ward: string, addressLine: string, customerId: number) => {
        const isDuplicate = await customerService.verifyDuplicateAddress(recipientName, phoneNumber, city, ward, addressLine, customerId)
        if (isDuplicate) throw new HttpException(409, errorMessage.ADDRESS_EXISTED)

        const defaultAddress = await prisma.customerAddress.findFirst({ where: { customerId: customerId, isDefault: true } })
        const hasDefaultAddress = defaultAddress != null

        await prisma.customerAddress.create({
            data: {
                customerId: customerId,
                recipientName: capitalizeWords(recipientName),
                phoneNumber: phoneNumber,
                city: capitalizeWords(city),
                ward: capitalizeWords(ward),
                addressLine: capitalizeWords(addressLine),
                isDefault: !hasDefaultAddress
            }
        })
    },

    verifyDuplicateAddress: async (
        recipientName: string,
        phoneNumber: string,
        city: string,
        ward: string,
        addressLine: string,
        customerId: number
    ) => {
        const exactMatchAddress = await prisma.customerAddress.findFirst({
            where: {
                customerId: customerId,
                recipientName: recipientName,
                phoneNumber: phoneNumber,
                city: city,
                ward: ward,
                addressLine: addressLine
            }
        })

        return !!exactMatchAddress
    },

    setCustomerAddressAsDefault: async (addressId: number, customerId: number) => {
        const address = await prisma.customerAddress.findFirst({ where: { addressId: addressId, customerId: customerId } })
        if (!address) throw new HttpException(404, errorMessage.ADDRESS_NOT_FOUND)

        if (!address.isDefault) {
            const defaultAddress = await prisma.customerAddress.findFirst({ where: { customerId: customerId, isDefault: true } })
            await prisma.customerAddress.update({
                where: { addressId: defaultAddress?.addressId },
                data: {
                    isDefault: false
                }
            })

            await prisma.customerAddress.update({
                where: { addressId: addressId },
                data: {
                    isDefault: true
                }
            })
        }
    },

    deleteCustomerAddress: async (addressId: number, customerId: number) => {
        const address = await prisma.customerAddress.findFirst({ where: { addressId: addressId, customerId: customerId } })
        if (!address) throw new HttpException(404, errorMessage.ADDRESS_NOT_FOUND)
        if (address.isDefault) throw new HttpException(400, errorMessage.CANNOT_DELETE_DEFAULT_ADDRESS)

        await prisma.customerAddress.delete({ where: { addressId: addressId } })
    },

    getCustomersRegisteredInTimeRange: async (startDate: Date, endDate: Date) => {
        const customers = await prisma.customer.findMany({
            where: { createdAt: { gte: startDate, lt: endDate } }
        })

        return customers
    },

    getCustomersWithHighestOrderCountInTimeRange: async (startDate: Date, endDate: Date, limit: number | undefined = undefined) => {
        const highestOrderCountCustomerIds = await prisma.order.groupBy({
            by: ['customerId'],
            where: { createdAt: { gte: startDate, lt: endDate } },
            _count: { _all: true },
            orderBy: { _count: { customerId: 'desc' } },
            take: limit
        })

        const mappedCustomers = await Promise.all(
            highestOrderCountCustomerIds.map(async item => {
                const customerInfo = await prisma.customer.findFirst({ where: { customerId: item.customerId }, include: { account: true } })

                if (customerInfo) {
                    return {
                        ...customerInfo,
                        isActive: customerInfo.account.isActive,
                        orderCount: item._count._all
                    }
                }
            })
        )

        return mappedCustomers.filter(item => item !== undefined) as any[]
    },

    getCustomersWithHighestSpendingInTimeRange: async (startDate: Date, endDate: Date, limit: number | undefined = undefined) => {
        const highestOrderAmountCustomerIds = await prisma.order.groupBy({
            by: ['customerId'],
            where: { deliveredAt: { gte: startDate, lt: endDate } },
            _sum: { totalAmount: true },
            orderBy: { _sum: { totalAmount: 'desc' } },
            take: limit
        })

        const mappedCustomers = await Promise.all(
            highestOrderAmountCustomerIds.map(async item => {
                const customerInfo = await prisma.customer.findFirst({ where: { customerId: item.customerId }, include: { account: true } })

                if (customerInfo) {
                    return {
                        ...customerInfo,
                        isActive: customerInfo.account.isActive,
                        orderAmount: item._sum.totalAmount
                    }
                }
            })
        )

        return mappedCustomers.filter(item => item !== undefined) as any[]
    }
}

export default customerService
