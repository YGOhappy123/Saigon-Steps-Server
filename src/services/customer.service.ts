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

        await prisma.customerAddress.create({
            data: {
                customerId: customerId,
                recipientName: capitalizeWords(recipientName),
                phoneNumber: phoneNumber,
                city: capitalizeWords(city),
                ward: capitalizeWords(ward),
                addressLine: capitalizeWords(addressLine),
                isDefault: defaultAddress == null
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
            await prisma.customerAddress.update({ where: { addressId: defaultAddress?.addressId }, data: { isDefault: false } })

            await prisma.customerAddress.update({ where: { addressId: addressId }, data: { isDefault: true } })
        }
    },

    deleteCustomerAddress: async (addressId: number, customerId: number) => {
        const address = await prisma.customerAddress.findFirst({ where: { addressId: addressId, customerId: customerId } })
        if (!address) throw new HttpException(404, errorMessage.ADDRESS_NOT_FOUND)
        if (address.isDefault) throw new HttpException(400, errorMessage.CANNOT_DELETE_DEFAULT_ADDRESS)

        await prisma.customerAddress.delete({ where: { addressId: addressId } })
    }
}

export default customerService
