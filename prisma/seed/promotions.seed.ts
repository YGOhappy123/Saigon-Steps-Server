import { CouponType, PrismaClient } from '@prisma/client'

export const seedPromotionsAndCoupons = async (prisma: PrismaClient) => {
    // --- Coupons ---
    await prisma.coupon.createMany({
        data: [
            {
                code: 'CHAOHE2025',
                type: CouponType.FIXED,
                amount: 100000,
                maxUsage: 100,
                expiredAt: new Date('2025-10-01T23:59:59+07:00'),
                createdAt: new Date('2025-06-01T07:00:00+07:00'),
                createdBy: 1
            },
            {
                code: 'SINHNHAT1TUOI',
                type: CouponType.PERCENTAGE,
                amount: 10,
                expiredAt: new Date('2025-08-31T23:59:59+07:00'),
                createdAt: new Date('2025-08-01T07:00:00+07:00'),
                createdBy: 1
            },
            {
                code: 'CHAOBANMOI',
                type: CouponType.FIXED,
                amount: 50000,
                createdAt: new Date('2025-08-01T07:00:00+07:00'),
                createdBy: 2
            },
            {
                code: 'FLASHSALE8/8',
                type: CouponType.PERCENTAGE,
                amount: 50,
                maxUsage: 10,
                expiredAt: new Date('2025-08-08T23:59:59+07:00'),
                createdAt: new Date('2025-08-08T00:00:00+07:00'),
                createdBy: 2
            },
            {
                code: 'QUOCKHANHA80',
                type: CouponType.FIXED,
                amount: 200000,
                expiredAt: new Date('2025-09-02T23:59:59+07:00'),
                createdAt: new Date('2025-08-30T12:00:00+07:00'),
                createdBy: 1
            },
            {
                code: 'MUNGGIANGSINH',
                type: CouponType.PERCENTAGE,
                amount: 10,
                maxUsage: 200,
                expiredAt: new Date('2025-12-24T23:59:59+07:00'),
                createdAt: new Date('2025-10-01T00:00:00+07:00'),
                createdBy: 2
            }
        ]
    })

    // --- Promotions ---
    await prisma.promotion.createMany({
        data: [
            {
                name: 'Chào mùa tựu trường 2025',
                description:
                    'Saigon Steps hân hoan mang đến chương trình "Chào Mùa Tựu Trường" với nhiều ưu đãi hấp dẫn dành cho học sinh, sinh viên và phụ huynh. Đây là cơ hội tuyệt vời để bạn sở hữu những đôi giày bền đẹp, thoải mái và hợp xu hướng cho mùa học mới. Hãy nhanh tay ghé cửa hàng hoặc mua sắm trực tuyến để tận hưởng mức giá ưu đãi đặc biệt cùng nhiều quà tặng bất ngờ.',
                discountRate: 10,
                startDate: new Date('2025-08-15T00:00:00+07:00'),
                endDate: new Date('2025-09-15T23:59:59+07:00'),
                createdAt: new Date('2025-08-10T07:00:00+07:00'),
                createdBy: 1
            },
            {
                name: 'Nike festival month',
                description:
                    'Nike mang đến không khí sôi động cùng chương trình "Festival Month" với hàng loạt ưu đãi và sản phẩm mới đầy cảm hứng. Đây là thời điểm tuyệt vời để bạn sở hữu những đôi sneaker phong cách, bền bỉ và công nghệ tiên tiến, giúp bạn tự tin bứt phá trong từng bước di chuyển. Đừng bỏ lỡ cơ hội trải nghiệm không gian mua sắm sôi động và rinh ngay cho mình những thiết kế biểu tượng từ Nike trong tháng lễ hội này.',
                discountRate: 20,
                startDate: new Date('2025-10-01T00:00:00+07:00'),
                endDate: new Date('2025-10-31T23:59:59+07:00'),
                createdAt: new Date('2025-08-25T07:00:00+07:00'),
                createdBy: 1
            },
            {
                name: "Chào mừng Quốc Khánh cùng Biti's",
                description:
                    "Biti's tưng bừng chào mừng Quốc Khánh 2/9 với chương trình ưu đãi đặc biệt dành cho mọi khách hàng. Đây là dịp để bạn lựa chọn những đôi giày trẻ trung, bền bỉ và thoải mái với mức giá hấp dẫn hơn bao giờ hết. Hãy nhanh tay ghé cửa hàng hoặc mua sắm trực tuyến để cùng Biti's hòa chung không khí rộn ràng, rinh giày mới xinh xắn và tận hưởng trọn vẹn niềm vui ngày lễ lớn.",
                discountRate: 30,
                startDate: new Date('2025-09-01T00:00:00+07:00'),
                endDate: new Date('2025-09-05T23:59:59+07:00'),
                createdAt: new Date('2025-08-27T07:00:00+07:00'),
                createdBy: 2
            },
            {
                name: 'Flash sale black Friday',
                description:
                    'Saigon Steps bùng nổ Flash Sale Black Friday với mức giảm giá "sốc" trên hàng loạt mẫu giày dép thời trang. Chỉ trong thời gian giới hạn, bạn có thể săn ngay những đôi giày yêu thích với giá ưu đãi chưa từng có. Nhanh tay chọn cho mình sản phẩm phù hợp để nâng tầm phong cách và tiết kiệm tối đa. Đừng bỏ lỡ cơ hội mua sắm vàng duy nhất trong năm tại Saigon Steps!',
                discountRate: 40,
                startDate: new Date('2025-11-28T00:00:00+07:00'),
                endDate: new Date('2025-11-28T23:59:59+07:00'),
                createdAt: new Date('2025-11-22T12:00:00+07:00'),
                createdBy: 2
            }
        ]
    })

    // --- Product - Promotion ---
    await prisma.productPromotion.createMany({
        data: [
            { promotionId: 1, rootProductId: 1 },
            { promotionId: 1, rootProductId: 4 },
            { promotionId: 1, rootProductId: 5 },
            { promotionId: 1, rootProductId: 9 },
            { promotionId: 1, rootProductId: 10 },
            { promotionId: 2, rootProductId: 1 },
            { promotionId: 2, rootProductId: 4 },
            { promotionId: 3, rootProductId: 8 },
            { promotionId: 3, rootProductId: 9 },
            { promotionId: 3, rootProductId: 10 },
            { promotionId: 4, rootProductId: 1 },
            { promotionId: 4, rootProductId: 4 },
            { promotionId: 4, rootProductId: 5 },
            { promotionId: 4, rootProductId: 9 },
            { promotionId: 4, rootProductId: 10 }
        ]
    })
}
