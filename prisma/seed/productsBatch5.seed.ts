import { PrismaClient, ShoeGender } from '@prisma/client'
import { generateProductBarcode } from '../../src/utils/stringHelpers'

export const seedProducts = async (prisma: PrismaClient) => {
    // --- Root Products ---
    await prisma.rootProduct.createMany({
        data: [
            {
                brandId: 8,
                name: 'Túi Xách Nhỏ JUNO TXN937 Heart Shaped Ivy',
                slug: 'tui-xach-nho-juno-txn937-heart-shaped-ivy',
                description:
                    'Túi Xách Nhỏ Heart Shaped Ivy từ JUNO - Thiết kế hình trái tim độc đáo, mang phong cách ngọt ngào và nữ tính. Chất liệu da tổng hợp cao cấp, bề mặt mịn đẹp và dễ bảo quản. Dây đeo dài linh hoạt - vừa có thể đeo chéo, vừa có thể xách tay. Nội thất nhỏ gọn nhưng đủ ngăn để đựng điện thoại, ví mini và vật dụng cá nhân thiết yếu. Phù hợp cho cả buổi hẹn hò nhẹ nhàng hoặc dạo phố sành điệu.',
                price: 749000,
                isAccessory: true,
                createdBy: 1
            },
            {
                brandId: 8,
                name: 'Mắt Kính JUNO MK126 Circa',
                slug: 'mat-kinh-juno-mk126-circa',
                description:
                    'Mắt kính Circa từ JUNO - Thiết kế kim loại trẻ trung, cá tính với gọng chắc chắn, phù hợp để sử dụng khi dạo phố, du lịch hay các hoạt động ngoài trời. Sản phẩm mang tông màu nâu đen huyền bí, không chỉ toát nên sự quý phái mà còn thể hiện gu thời trang đẳng cấp. Sản phẩm được đi kèm hộp kính da PU chống nước và khăn lau tiện dụng.',
                price: 549000,
                isAccessory: true,
                createdBy: 1
            },
            {
                brandId: 8,
                name: 'Giày Cao Gót JUNO CG07169 Phối Dây Đá Nhỏ',
                slug: 'giay-cao-got-juno-cg07169-phoi-day-da-nho',
                description:
                    'Giày cao gót JUNO CG07169 "Phối Dây Đá Nhỏ" - Thật không quá khi nói đây là đôi giày nổi bật với vẻ thanh lịch và sang trọng! Với quai đính đá nhỏ lấp lánh tinh tế. Gót cao vừa phải giúp tôn dáng nhưng vẫn thoải mái khi di chuyển, chất liệu da tổng hợp bền đẹp và dễ bảo quản. Lý tưởng để diện dự tiệc, công sở hoặc các buổi dạo phố thanh lịch.',
                price: 599000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 8,
                name: 'Giày Cao Gót JUNO CG05152 Mules Đắp Mũi Chéo',
                slug: 'giay-cao-got-juno-cg05152-mules-dap-mui-cheo',
                description:
                    'Giày cao gót JUNO CG05152 "Mules Đắp Mũi Chéo" - thiết kế mules hiện đại với phần mũi giày chéo tạo điểm nhấn thời trang. Gót cao nhẹ giúp tôn dáng nhưng vẫn giữ được sự thoải mái khi di chuyển. Chất liệu da tổng hợp cao cấp, bề mặt mịn, dễ phối trang phục đi làm, dạo phố hay dự tiệc.',
                price: 549000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 8,
                name: 'Giày Búp Bê JUNO BB03137 Thắt Eo',
                slug: 'giay-bup-be-juno-bb03137-that-eo',
                description:
                    'Giày búp bê JUNO BB03137 "Thắt Eo" - thiết kế nữ tính với phần eo thắt nhẹ mang lại điểm nhấn thanh lịch. Chất liệu da bền bỉ, bề mặt mịn màng và form ôm chân nhẹ nhàng. Đế thấp phù hợp mang cả ngày, dễ phối cùng trang phục công sở, dạo phố hay dự tiệc nhẹ nhàng.',
                price: 549000,
                isAccessory: false,
                createdBy: 2
            }
        ]
    })

    // --- Product Images ---
    await prisma.productImage.createMany({
        data: [
            { rootProductId: 61, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915970/product/heart_shaped_ivy_1_sdnmoq.jpg' },
            { rootProductId: 61, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915970/product/heart_shaped_ivy_2_x3nln4.jpg' },
            { rootProductId: 61, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915970/product/heart_shaped_ivy_3_kb7a0b.jpg' },
            { rootProductId: 61, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915970/product/heart_shaped_ivy_4_tjztuq.jpg' },
            { rootProductId: 61, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915970/product/heart_shaped_ivy_5_v9fu1n.jpg' },
            { rootProductId: 61, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915970/product/heart_shaped_ivy_6_sq2f5w.jpg' },
            { rootProductId: 62, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763919397/product/mk_circa_1_jittlj.jpg' },
            { rootProductId: 62, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763919398/product/mk_circa_2_xpidds.jpg' },
            { rootProductId: 62, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763919424/product/mk_circa_3_lqcmfp.jpg' },
            { rootProductId: 62, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763919965/product/mk_circa_4_jrgr2z.jpg' },
            { rootProductId: 63, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763923236/product/gcg_juno_phoi_day_da_nho_1_qjd7wq.jpg' },
            { rootProductId: 63, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763923171/product/gcg_juno_phoi_day_da_nho_2_dtbivj.jpg' },
            { rootProductId: 63, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763923171/product/gcg_juno_phoi_day_da_nho_3_o0faac.jpg' },
            { rootProductId: 63, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763923236/product/gcg_juno_phoi_day_da_nho_4_gsh334.jpg' },
            { rootProductId: 63, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763923171/product/gcg_juno_phoi_day_da_nho_5_ztpeer.jpg' },
            { rootProductId: 63, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763923213/product/gcg_juno_phoi_day_da_nho_6_ja4fxu.jpg' },
            { rootProductId: 63, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763923171/product/gcg_juno_phoi_day_da_nho_7_jrwvjl.jpg' },
            { rootProductId: 63, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763923171/product/gcg_juno_phoi_day_da_nho_8_him995.jpg' },
            { rootProductId: 64, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763924501/product/gcg_juno_mules_1_zoocgt.jpg' },
            { rootProductId: 64, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763924502/product/gcg_juno_mules_2_jjbv5h.jpg' },
            { rootProductId: 64, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763924501/product/gcg_juno_mules_3_zxu0xh.jpg' },
            { rootProductId: 64, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763924502/product/gcg_juno_mules_4_a6qftm.jpg' },
            { rootProductId: 64, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763924502/product/gcg_juno_mules_5_pxeeiu.jpg' },
            { rootProductId: 64, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763924503/product/gcg_juno_mules_6_bv8bo7.jpg' },
            { rootProductId: 64, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763924506/product/gcg_juno_mules_7_yvhp7z.jpg' },
            { rootProductId: 64, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763924505/product/gcg_juno_mules_8_s45aot.jpg' },
            { rootProductId: 65, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763925550/product/gbb_that_eo_1_zcxdmh.jpg' },
            { rootProductId: 65, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763925550/product/gbb_that_eo_2_vuqrhe.jpg' },
            { rootProductId: 65, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763925551/product/gbb_that_eo_3_w5fnga.jpg' },
            { rootProductId: 65, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763925550/product/gbb_that_eo_5_gcidze.jpg' },
            { rootProductId: 65, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763925550/product/gbb_that_eo_4_cetsed.jpg' },
            { rootProductId: 65, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763925551/product/gbb_that_eo_6_zz00k8.jpg' },
            { rootProductId: 65, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763925552/product/gbb_that_eo_7_vkuurx.jpg' },
            { rootProductId: 65, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763925555/product/gbb_that_eo_8_t2cidz.jpg' }
        ]
    })

    // --- Product Items ---
    await prisma.productItem.createMany({
        data: [
            { rootProductId: 61, stock: 12, barcode: generateProductBarcode() },
            { rootProductId: 62, stock: 18, barcode: generateProductBarcode() },
            { rootProductId: 63, size: '35', stock: 12, barcode: generateProductBarcode() },
            { rootProductId: 63, size: '36', stock: 15, barcode: generateProductBarcode() },
            { rootProductId: 63, size: '37', stock: 20, barcode: generateProductBarcode() },
            { rootProductId: 63, size: '38', stock: 18, barcode: generateProductBarcode() },
            { rootProductId: 63, size: '39', stock: 10, barcode: generateProductBarcode() },
            { rootProductId: 64, size: '35', stock: 11, barcode: generateProductBarcode() },
            { rootProductId: 64, size: '36', stock: 12, barcode: generateProductBarcode() },
            { rootProductId: 64, size: '37', stock: 22, barcode: generateProductBarcode() },
            { rootProductId: 64, size: '38', stock: 28, barcode: generateProductBarcode() },
            { rootProductId: 64, size: '39', stock: 18, barcode: generateProductBarcode() },
            { rootProductId: 65, size: '35', stock: 12, barcode: generateProductBarcode() },
            { rootProductId: 65, size: '36', stock: 15, barcode: generateProductBarcode() },
            { rootProductId: 65, size: '37', stock: 20, barcode: generateProductBarcode() },
            { rootProductId: 65, size: '38', stock: 18, barcode: generateProductBarcode() },
            { rootProductId: 65, size: '39', stock: 10, barcode: generateProductBarcode() }
        ]
    })

    // --- Shoe Features ---
    await prisma.shoeFeature.createMany({
        data: [
            {
                rootProductId: 63,
                categoryId: 5,
                gender: ShoeGender.FEMALE,
                upperMaterial: 'Si mờ tổng hợp',
                soleMaterial: 'Cao su',
                liningMaterial: 'Vải tổng hợp mềm',
                closureType: 'Khóa gài (Mary Jane Strap)',
                toeShape: 'Mũi nhọn',
                waterResistant: 'Thấp',
                breathability: 'Trung bình',
                pattern: 'Phối dây đá nhỏ lấp lánh, thiết kế sang trọng và nữ tính',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#cbccca',
                secondaryColor: null,
                heelHeight: 7.0,
                durabilityRating: 4.0,
                releaseYear: 2023
            },
            {
                rootProductId: 64,
                categoryId: 5,
                gender: ShoeGender.FEMALE,
                upperMaterial: 'Da tổng hợp (Si mờ trơn)',
                soleMaterial: 'Cao su tổng hợp',
                liningMaterial: 'Vải tổng hợp mềm',
                closureType: 'Slip-on (xỏ không quai hậu)',
                toeShape: 'Mũi nhọn',
                waterResistant: 'Thấp',
                breathability: 'Trung bình thấp',
                pattern: 'Đắp mũi chéo phối 2 chất liệu, thiết kế thanh lịch',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#eed8cc',
                secondaryColor: '#7f5e3f',
                heelHeight: 5.0,
                durabilityRating: 4.0,
                releaseYear: 2023
            },
            {
                rootProductId: 65,
                categoryId: 6,
                gender: ShoeGender.FEMALE,
                upperMaterial: 'Da tổng hợp (Si mờ vân)',
                soleMaterial: 'Cao su tổng hợp',
                liningMaterial: 'Vải tổng hợp mềm',
                closureType: 'Slip-on (không dây, không quai)',
                toeShape: 'Mũi nhọn',
                waterResistant: 'Thấp',
                breathability: 'Trung bình',
                pattern: 'Điểm nhấn nằm ở quai ngang mảnh "thắt eo" cách điệu, tạo kiểu dáng thanh lịch',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#e9e2d8',
                secondaryColor: null,
                heelHeight: 1.0,
                durabilityRating: 4.0,
                releaseYear: 2023
            }
        ]
    })

    // --- Shoe Feature - Occasion Tag ---
    await prisma.shoeFeatureOccasionTag.createMany({
        data: [
            { shoeFeatureId: 49, occasionTagId: 3 },
            { shoeFeatureId: 49, occasionTagId: 6 },
            { shoeFeatureId: 49, occasionTagId: 10 },
            { shoeFeatureId: 50, occasionTagId: 3 },
            { shoeFeatureId: 50, occasionTagId: 6 },
            { shoeFeatureId: 50, occasionTagId: 10 },
            { shoeFeatureId: 51, occasionTagId: 1 },
            { shoeFeatureId: 51, occasionTagId: 2 },
            { shoeFeatureId: 51, occasionTagId: 3 },
            { shoeFeatureId: 51, occasionTagId: 6 },
            { shoeFeatureId: 51, occasionTagId: 8 },
            { shoeFeatureId: 51, occasionTagId: 10 }
        ]
    })

    // --- Shoe Feature - Design Tag ---
    await prisma.shoeFeatureDesignTag.createMany({
        data: [
            { shoeFeatureId: 49, designTagId: 2 },
            { shoeFeatureId: 49, designTagId: 3 },
            { shoeFeatureId: 49, designTagId: 4 },
            { shoeFeatureId: 49, designTagId: 7 },
            { shoeFeatureId: 49, designTagId: 12 },
            { shoeFeatureId: 50, designTagId: 2 },
            { shoeFeatureId: 50, designTagId: 3 },
            { shoeFeatureId: 50, designTagId: 4 },
            { shoeFeatureId: 50, designTagId: 7 },
            { shoeFeatureId: 50, designTagId: 12 },
            { shoeFeatureId: 51, designTagId: 2 },
            { shoeFeatureId: 51, designTagId: 4 },
            { shoeFeatureId: 51, designTagId: 7 }
        ]
    })
}
