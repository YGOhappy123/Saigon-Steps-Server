import { prisma } from '@/prisma'
import { HttpException } from '@/errors/HttpException'
import { ISearchParams } from '@/interfaces/params'
import { buildWhereStatement } from '@/utils/queryHelpers'
import { getEndOfTimeByType } from '@/utils/timeHelpers'
import { uppercaseWords } from '@/utils/stringHelpers'
import errorMessage from '@/configs/errorMessage'

const couponService = {
    getAllCoupons: async ({ skip = 0, limit, filter = '{}', sort = '{}' }: ISearchParams) => {
        const whereStatement = buildWhereStatement(filter)

        const coupons = await prisma.coupon.findMany({
            where: whereStatement,
            include: { createdByStaff: true },
            skip: skip,
            take: limit,
            orderBy: JSON.parse(sort as string)
        })

        const total = await prisma.coupon.count({ where: whereStatement })

        return {
            coupons: coupons,
            total: total
        }
    },

    addNewCoupon: async (
        code: string,
        type: 'PERCENTAGE' | 'FIXED',
        amount: number,
        maxUsage: number | undefined,
        expiryDate: string | undefined,
        staffId: number
    ) => {
        const existingCoupon = await prisma.coupon.findUnique({ where: { code: code } })
        if (existingCoupon) throw new HttpException(409, errorMessage.COUPON_EXISTED)

        await prisma.coupon.create({
            data: {
                code: uppercaseWords(code),
                type: type,
                amount: amount,
                maxUsage: maxUsage ?? null,
                expiredAt: expiryDate ? getEndOfTimeByType(expiryDate, 'daily').toDate() : null,
                createdBy: staffId
            }
        })
    },

    disableCoupon: async (couponId: number) => {
        const coupon = await prisma.coupon.findUnique({ where: { couponId: couponId } })
        if (!coupon) throw new HttpException(404, errorMessage.COUPON_NOT_FOUND)
        if (!coupon.isActive) throw new HttpException(400, errorMessage.COUPON_NO_LONGER_AVAILABLE)

        await prisma.coupon.update({
            where: { couponId: couponId },
            data: {
                isActive: false
            }
        })
    }
}

export default couponService
