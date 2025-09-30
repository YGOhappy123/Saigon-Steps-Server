import * as bcrypt from 'bcrypt'
import { parsedEnv } from '@/env'
import { prisma, CartStatus } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import {
    generateAccessToken,
    generateRefreshToken,
    generateResetPasswordToken,
    verifyRefreshToken,
    verifyResetPasswordToken
} from '@/utils/jwtHelpers'
import { capitalizeWords, generateRandomString } from '@/utils/stringHelpers'
import axios from 'axios'
import errorMessage from '@/configs/errorMessage'
import roleService from '@/services/role.service'
import cartService from '@/services/cart.service'
import nodemailerService from '@/services/nodemailer.service'

const authService = {
    signInCustomerAccount: async (username: string, password: string) => {
        const account = await prisma.account.findFirst({ where: { username: username } })
        if (!account || !account.isActive) throw new HttpException(400, errorMessage.INCORRECT_USERNAME_OR_PASSWORD)

        const isPasswordMatching = await bcrypt.compare(password, account.password)
        if (!isPasswordMatching) throw new HttpException(400, errorMessage.INCORRECT_USERNAME_OR_PASSWORD)

        const customer = await prisma.customer.findFirst({ where: { accountId: account.accountId } })
        if (!customer) throw new HttpException(400, errorMessage.INCORRECT_USERNAME_OR_PASSWORD)

        return {
            user: customer,
            accessToken: generateAccessToken({ userId: customer.customerId }),
            refreshToken: generateRefreshToken({ accountId: account.accountId })
        }
    },

    signInStaffAccount: async (username: string, password: string) => {
        const account = await prisma.account.findFirst({ where: { username: username } })
        if (!account || !account.isActive) throw new HttpException(400, errorMessage.INCORRECT_USERNAME_OR_PASSWORD)

        const isPasswordMatching = await bcrypt.compare(password, account.password)
        if (!isPasswordMatching) throw new HttpException(400, errorMessage.INCORRECT_USERNAME_OR_PASSWORD)

        const staff = await prisma.staff.findFirst({
            where: { accountId: account.accountId },
            include: { createdByStaff: true, role: true }
        })
        if (!staff) throw new HttpException(400, errorMessage.INCORRECT_USERNAME_OR_PASSWORD)

        return {
            user: {
                ...staff,
                permissions: (await roleService.getRolePermissions(staff.roleId)).map(item => item.code)
            },
            accessToken: generateAccessToken({ userId: staff.staffId, roleId: staff.roleId }),
            refreshToken: generateRefreshToken({ accountId: account.accountId })
        }
    },

    signUpCustomerAccount: async (name: string, username: string, password: string) => {
        const existingAccount = await prisma.account.findFirst({ where: { username: username } })
        if (existingAccount) throw new HttpException(409, errorMessage.USERNAME_EXISTED)

        const hashedPassword = await bcrypt.hash(password, 10)
        const newAccount = await prisma.account.create({
            data: {
                username: username,
                password: hashedPassword
            }
        })

        const newCustomer = await prisma.customer.create({
            data: {
                name: capitalizeWords(name),
                avatar: parsedEnv.SQL_DEFAULT_AVATAR_URL,
                accountId: newAccount.accountId
            }
        })

        return {
            user: newCustomer,
            accessToken: generateAccessToken({ userId: newCustomer.customerId }),
            refreshToken: generateRefreshToken({ accountId: newAccount.accountId })
        }
    },

    refreshToken: async (refreshToken: string) => {
        const { accountId } = verifyRefreshToken(refreshToken)

        const account = await prisma.account.findFirst({ where: { accountId: accountId } })
        if (!account || !account.isActive) throw new HttpException(404, errorMessage.USER_NOT_FOUND)

        const customer = await prisma.customer.findFirst({ where: { accountId: account.accountId } })
        if (customer != null) {
            return {
                accessToken: generateAccessToken({ userId: customer.customerId })
            }
        }

        const staff = await prisma.staff.findFirst({ where: { accountId: account.accountId } })
        if (staff != null) {
            return {
                accessToken: generateAccessToken({ userId: staff.staffId, roleId: staff.roleId })
            }
        }

        throw new HttpException(404, errorMessage.USER_NOT_FOUND)
    },

    forgotPassword: async (email: string) => {
        const customer = await prisma.customer.findFirst({
            where: {
                email: email,
                account: { isActive: true }
            }
        })
        if (!customer) throw new HttpException(404, errorMessage.USER_NOT_FOUND)

        const resetPasswordToken = generateResetPasswordToken({ email: email, type: 'forgot' })
        nodemailerService.sendResetPasswordMail(email, customer.name, `${parsedEnv.CLIENT_URL}/auth?type=reset&token=${resetPasswordToken}`)
    },

    resetPassword: async (resetPasswordToken: string, newPassword: string) => {
        const { email } = verifyResetPasswordToken(resetPasswordToken)

        const account = await prisma.account.findFirst({
            where: {
                customer: { email: email }
            }
        })
        if (!account || !account.isActive) throw new HttpException(404, errorMessage.USER_NOT_FOUND)

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await prisma.account.update({
            where: { accountId: account.accountId },
            data: {
                password: hashedPassword
            }
        })
    },

    loginByGoogleAccount: async (googleAccessToken: string) => {
        const { data } = await axios.get(parsedEnv.GOOGLE_OAUTH_ENDPOINT!, {
            headers: {
                Authorization: `Bearer ${googleAccessToken}`
            }
        })

        const { given_name: firstName = 'Unknown', family_name: lastName = 'Unknown', picture: avatar, email, email_verified: isEmailVerified } = data
        if (!isEmailVerified) throw new HttpException(403, errorMessage.GOOGLE_AUTH_FAILED)

        const customer = await prisma.customer.findFirst({
            where: {
                email: email,
                account: { isActive: true }
            }
        })
        if (!customer) {
            const randomUsername = generateRandomString()
            const randomPassword = generateRandomString()

            const hashedPassword = await bcrypt.hash(randomPassword, 10)
            const newAccount = await prisma.account.create({
                data: {
                    username: randomUsername,
                    password: hashedPassword
                }
            })

            const customerFullName = capitalizeWords(`${lastName} ${firstName}`)
            const newCustomer = await prisma.customer.create({
                data: {
                    name: customerFullName,
                    email: email,
                    avatar: avatar || parsedEnv.SQL_DEFAULT_AVATAR_URL,
                    accountId: newAccount.accountId
                }
            })

            const resetPasswordToken = generateResetPasswordToken({ email: email, type: 'google' })
            nodemailerService.sendGoogleRegistrationMail(
                email,
                customerFullName,
                randomUsername,
                randomPassword,
                `${parsedEnv.CLIENT_URL}/auth?type=reset&token=${resetPasswordToken}`
            )

            return {
                user: newCustomer,
                accessToken: generateAccessToken({ userId: newCustomer.customerId }),
                refreshToken: generateRefreshToken({ accountId: newAccount.accountId })
            }
        } else {
            return {
                user: customer,
                accessToken: generateAccessToken({ userId: customer.customerId }),
                refreshToken: generateRefreshToken({ accountId: customer.accountId })
            }
        }
    },

    changePassword: async (oldPassword: string, newPassword: string, userId: number, roleId?: number) => {
        const account = await prisma.account.findFirst({
            where: roleId ? { staff: { staffId: userId } } : { customer: { customerId: userId } }
        })
        if (!account || !account.isActive) throw new HttpException(404, errorMessage.USER_NOT_FOUND)

        const isPasswordMatching = await bcrypt.compare(oldPassword, account.password)
        if (!isPasswordMatching) throw new HttpException(400, errorMessage.INCORRECT_USERNAME_OR_PASSWORD)

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await prisma.account.update({
            where: { accountId: account.accountId },
            data: {
                password: hashedPassword
            }
        })
    },

    deactivateCustomerAccount: async (customerId: number) => {
        const account = await prisma.account.findFirst({
            where: { customer: { customerId: customerId } }
        })
        if (!account || !account.isActive) throw new HttpException(404, errorMessage.USER_NOT_FOUND)

        await prisma.account.update({
            where: { accountId: account.accountId },
            data: {
                isActive: false
            }
        })

        const activeCart = await cartService.getCustomerActiveCart(customerId)
        if (activeCart != null) {
            await prisma.customerCart.update({
                where: { cartId: activeCart.cartId },
                data: {
                    updatedAt: new Date(),
                    status: CartStatus.ABANDONED
                }
            })
        }
    }
}

export default authService
