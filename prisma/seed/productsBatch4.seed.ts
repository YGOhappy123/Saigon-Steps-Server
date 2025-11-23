import { PrismaClient, ShoeGender } from '@prisma/client'
import { generateProductBarcode } from '../../src/utils/stringHelpers'

export const seedProducts = async (prisma: PrismaClient) => {
    // --- Root Products ---
    await prisma.rootProduct.createMany({
        data: [
            {
                brandId: 1,
                name: 'Giày Nike Air Zoom Pegasus 36 Gunsmoke AQ2203-001',
                slug: 'giay-nike-air-zoom-pegasus-36-gunsmoke-aq2203-001',
                description:
                    'Thoáng khí hơn - Êm hơn - Mượt mà trên từng sải bước! Nike Air Zoom Pegasus 36 là phiên bản nâng cấp của dòng Pegasus huyền thoại, hướng đến người chạy muốn sự cân bằng hoàn hảo giữa tốc độ, độ êm và độ bền. Màu Gunsmoke / Black mang lại vẻ ngoài mạnh mẽ, hiện đại và dễ phối đồ cho cả luyện tập lẫn đi lại hằng ngày.',
                price: 3600000,
                isAccessory: false,
                createdBy: 1
            },
            {
                brandId: 5,
                name: 'Giày Ballerina Mary Janes Quai Đôi Đính Nút Tán Kim Loại - GBB 0443 - Màu Đỏ',
                slug: 'giay-ballerina-mary-janes-quai-doi-dinh-nut-tan-kim-loai-gbb-0443-mau-do',
                description:
                    'Giày ballerina Mary Janes - GBB 0443 - màu đỏ sở hữu thiết kế quai đôi nữ tính kết hợp nút tán kim loại nổi bật, mang đến vẻ sang trọng và hiện đại. Chất liệu da nhân tạo bóng đẹp, form ôm chân thoải mái, dễ phối cùng trang phục đi làm, đi học hay dạo phố. Một lựa chọn tinh tế dành cho phong cách thanh lịch nhưng vẫn muốn tạo điểm nhấn.',
                price: 785000,
                isAccessory: false,
                createdBy: 1
            },
            {
                brandId: 5,
                name: 'Giày Ballerina Phom Mềm - GBB 0434 - Màu Bạc',
                slug: 'giay-ballerina-phom-mem-gbb-0434-mau-bac',
                description:
                    'Một đôi ballerina thanh lịch với phom mềm ôm chân nhẹ nhàng, giúp di chuyển thoải mái suốt ngày dài. Màu bạc bóng sang, chất liệu da nhân tạo bền đẹp, mũi tròn cổ điển. Phù hợp cho cả đi làm, đi học hay dạo phố - mang đến phong cách nữ tính truyền thống nhưng cũng không kém phần hiện đại.',
                price: 735000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 5,
                name: 'Ví Cầm Tay Monotone Nhấn Line Trang Trí - WAL 0333 - Màu Xanh Lá',
                slug: 'vi-cam-tay-monotone-nhan-line-trang-tri-wal-0333-mau-xanh-la',
                description:
                    'Ví cầm tay monotone - WAL 0333 - Màu xanh lá mang trong mình thiết kế thanh lịch, hiện đại với tông xanh lá chủ đạo, điểm xuyết bởi đường “line” trang trí tinh tế. Form ví gọn gàng, dễ cầm hoặc đút vào túi xách. Chất liệu da nhân tạo cao cấp, bền đẹp với đường may tỉ mỉ. Bên trong bố trí ngăn đựng thẻ, tiền và giấy tờ hợp lý - rất lý tưởng cho những ngày dạo phố hay các buổi tối cần mang theo vật dụng nhỏ gọn mà vẫn sang trọng.',
                price: 765000,
                isAccessory: true,
                createdBy: 2
            },
            {
                brandId: 6,
                name: "KENZO 'Boke Flower 2.0' Leather Phone Case - Black",
                slug: 'kenzo-boke-flower-2-0-leather-phone-case-black',
                description:
                    "KENZO 'Boke Flower 2.0' Leather Phone Case - Black được chế tác từ da cao cấp với độ hoàn thiện tinh xảo, mang lại cảm giác sang trọng và bền bỉ đúng chuẩn dòng sản phẩm high-end. Logo Kenzo Paris dập nổi sắc nét, thiết kế tối giản hiện đại, đi kèm ngăn thẻ tiện dụng và hộp tai nghe rời. Một phụ kiện đẳng cấp giúp nâng tầm phong cách, phù hợp cho người yêu thích sự tinh tế và thời thượng.",
                price: 4625000,
                isAccessory: true,
                createdBy: 1
            },
            {
                brandId: 1,
                name: 'Jordan Everyday Max No-Show Socks (3 Pairs) - Multi-Color',
                slug: 'jordan-everyday-max-no-show-socks-3-pairs-multi-color',
                description:
                    'Ba đôi vớ no-show Jordan Everyday Max tông multi-color - sự kết hợp hoàn hảo giữa phong cách thể thao và tiện dụng mỗi ngày. Được làm từ chất liệu tổng hợp cao cấp, vớ áp dụng công nghệ Dri-FIT giúp hút ẩm hiệu quả và giữ cho bàn chân luôn khô thoáng. Thiết kế lưới thoáng khí ở phần trên mang lại khả năng thông gió tốt, trong khi phần gót và mũi chân được gia cố để tăng độ bền. Band ôm vòm chân mang lại cảm giác vừa vặn, chắc chắn. Phù hợp cho cả hoạt động thường ngày lẫn tập luyện, dễ giặt máy và mang lại sự thoải mái lâu dài.',
                price: 210000,
                isAccessory: true,
                createdBy: 1
            },
            {
                brandId: 1,
                name: 'Nike Zoom Insole - Black',
                slug: 'nike-zoom-insole-black',
                description:
                    'Lót giày Nike Zoom Insole - Black là phụ kiện cao cấp giúp nâng đỡ tối ưu với công nghệ Zoom Air, mang lại độ đàn hồi nhạy bén và khả năng hấp thụ lực khi di chuyển. Thiết kế mỏng nhẹ, thoáng khí kết hợp lớp đệm êm ái giúp tăng cường sự thoải mái cho bàn chân suốt ngày dài. Phù hợp dùng thay lót gốc hoặc để cải thiện trải nghiệm khi mang giày thể thao hàng ngày.',
                price: 100000,
                isAccessory: true,
                createdBy: 1
            },
            {
                brandId: 9,
                name: 'Sneaker Dincox DC42 Matcha',
                slug: 'sneaker-dincox-dc42-matcha',
                description:
                    'Sneaker Dincox DC42 Matcha - Với tông xanh matcha thanh lịch và chất liệu canvas cao cấp, đôi sneaker này mang phong cách năng động nhưng vẫn rất tinh tế. Lót memory foam êm ái, đế cao 3 cm bằng cao su tự nhiên khâu chắc chắn, giúp bạn tự tin di chuyển mỗi ngày — từ dạo phố đến hoạt động hàng ngày.',
                price: 495000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 9,
                name: 'Sneaker Dincox DC47 Kiên Trì Brown',
                slug: 'sneaker-dincox-dc47-kien-tri-brown',
                description:
                    'Sneaker Dincox DC47 "Kiên Trì" Brown - Đôi sneaker truyền tải tinh thần mạnh mẽ và bền bỉ: tông nâu trầm "Kiên Trì", kết hợp chất liệu suede mềm và linen canvas khỏe khoắn. Đế cao su khâu chắc chắn, lót memory-foam êm ái, thiết kế vừa nam tính vừa tinh tế - là lựa chọn lý tưởng cho những bước chân quyết đoán, không ngại thử thách.',
                price: 585000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 9,
                name: 'Sneaker Dincox DC39 Berry Soda',
                slug: 'sneaker-dincox-dc39-berry-soda',
                description:
                    'Sneaker Dincox DC39 "Berry Soda" - Một đôi sneaker unisex tinh tế mang tông màu Berry Soda độc đáo, được làm từ microfiber leather cao cấp cho độ bền và cảm giác như da thật. Lót memory foam êm ái, đế cao su thiên nhiên khâu chắc chắn cao khoảng 3 cm giúp di chuyển nhẹ nhàng mà vẫn vững chãi. Thiết kế vừa phong cách vừa thoải mái - lý tưởng cho cả dạo phố và dùng hàng ngày.',
                price: 555000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 9,
                name: 'Gel Vệ Sinh Giày Dincox',
                slug: 'gel-ve-sinh-giay-dincox',
                description:
                    'Gel vệ sinh giày DinCox 100 ml - Một sản phẩm vệ sinh chuyên dụng, dạng gel đậm đặc giúp làm sạch nhanh chóng mọi vết bẩn cứng đầu trên giày. Với bảng thành phần dịu nhẹ gồm nước, glycerin và chiết xuất trái cây, gel không gây hại nhưng vẫn hiệu quả cao. Dung tích 100 ml, dễ sử dụng, giúp đôi giày của bạn luôn sáng sạch như mới.',
                price: 60000,
                isAccessory: true,
                createdBy: 1
            },
            {
                brandId: 9,
                name: 'Gel Tẩy Ố Giày Dincox',
                slug: 'gel-tay-o-giay-dincox',
                description:
                    'Gel tẩy ố đế giày DinCox 100 ml - Gel chuyên dụng cao cấp giúp loại bỏ vết ố vàng trên đế giày cao su và các chi tiết cao su khác. Công thức mạnh mẽ nhưng an toàn, dễ sử dụng - chỉ cần bôi lên, chà nhẹ, để nắng vài giờ và lau sạch - giúp phục hồi vẻ sạch sáng như ban đầu cho đôi giày của bạn.',
                price: 60000,
                isAccessory: true,
                createdBy: 1
            },
            {
                brandId: 9,
                name: 'Sneaker Dincox DC47 Năng Lượng Black Pink',
                slug: 'sneaker-dincox-dc47-nang-luong-black-pink',
                description:
                    'Sneaker Dincox DC47 "Năng Lượng" Black Pink - Đôi sneaker mang phong cách trẻ trung với phối tông đen - hồng nổi bật. Được làm từ chất liệu suede mềm kết hợp linen, lót memory-foam êm ái và đế cao su khâu chắc chắn. Thiết kế năng động, hiện đại, phù hợp cho cả việc dạo phố lẫn hoạt động năng suất mỗi ngày.',
                price: 585000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 9,
                name: 'Dincox Ballerina Pink Milk',
                slug: 'dincox-ballerina-pink-milk',
                description:
                    'Dincox Ballerina "Pink Milk" - Đôi giày búp bê nữ tính với tông hồng nhạt dịu dàng, được làm từ chất liệu da tổng hợp mịn màng. Thiết kế mũi tròn cổ điển, quai Mary Janes tinh tế, lót êm với memory-foam và đế cao su nhẹ giúp mang thoải mái suốt ngày. Phù hợp cho phong cách thanh lịch, nữ tính nhưng vẫn rất tiện dụng khi di chuyển hàng ngày.',
                price: 565000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 8,
                name: 'Túi Xách Nhỏ JUNO TXN933 3 Ngăn Đính Logo Cách Điệu',
                slug: 'tui-xach-nho-juno-txn933-3-ngan-dinh-logo-cach-dieu',
                description:
                    'Túi Xách Nhỏ 3 Ngăn Đính Logo Cách Điệu từ JUNO - Thiết kế thời trang tiện dụng với 3 ngăn riêng biệt giúp bạn tổ chức đồ dùng gọn gàng. Chất liệu da tổng hợp cao cấp, logo thương hiệu được cách điệu nổi bật, dây đeo dài có thể điều chỉnh - là lựa chọn lý tưởng cho phong cách hiện đại, năng động mỗi ngày.',
                price: 799000,
                isAccessory: true,
                createdBy: 1
            }
        ]
    })

    // --- Product Images ---
    await prisma.productImage.createMany({
        data: [
            { rootProductId: 46, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763730510/product/air_zoom_pegasus_1_s5jz64.png' },
            { rootProductId: 46, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763730509/product/air_zoom_pegasus_2_zzuh91.png' },
            { rootProductId: 46, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763730509/product/air_zoom_pegasus_3_e5vwvf.png' },
            { rootProductId: 46, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763730510/product/air_zoom_pegasus_4_pl0af1.png' },
            { rootProductId: 46, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763730511/product/air_zoom_pegasus_5_nqfsyw.png' },
            { rootProductId: 47, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763741220/product/mary_jane_do_1_mluosw.jpg' },
            { rootProductId: 47, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763741220/product/mary_jane_do_2_exhyxu.jpg' },
            { rootProductId: 47, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763741221/product/mary_jane_do_3_idpev6.jpg' },
            { rootProductId: 47, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763741221/product/mary_jane_do_4_tmm0yo.jpg' },
            { rootProductId: 47, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763741221/product/mary_jane_do_5_g5egen.jpg' },
            { rootProductId: 48, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763743096/product/ballerina_gap_gon_bac_1_oemu0w.jpg' },
            { rootProductId: 48, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763743096/product/ballerina_gap_gon_bac_2_aljfhl.jpg' },
            { rootProductId: 48, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763743096/product/ballerina_gap_gon_bac_3_wtdb62.jpg' },
            { rootProductId: 48, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763743096/product/ballerina_gap_gon_bac_4_y3fk6f.jpg' },
            { rootProductId: 48, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763743097/product/ballerina_gap_gon_bac_5_nxvh3o.jpg' },
            { rootProductId: 48, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763743096/product/ballerina_gap_gon_bac_6_mlzveg.jpg' },
            {
                rootProductId: 49,
                url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763745281/product/vi_monotone_nhan_line_xanh_la_1_cs4gfc.jpg'
            },
            {
                rootProductId: 49,
                url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763745282/product/vi_monotone_nhan_line_xanh_la_2_zpjrx1.jpg'
            },
            {
                rootProductId: 49,
                url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763745282/product/vi_monotone_nhan_line_xanh_la_3_qigaud.jpg'
            },
            {
                rootProductId: 49,
                url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763745284/product/vi_monotone_nhan_line_xanh_la_4_jlpax4.jpg'
            },
            {
                rootProductId: 49,
                url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763745281/product/vi_monotone_nhan_line_xanh_la_5_go9sna.jpg'
            },
            {
                rootProductId: 49,
                url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763745281/product/vi_monotone_nhan_line_xanh_la_6_o5t14s.jpg'
            },
            { rootProductId: 50, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763746219/product/kenzo_leather_phone_case_1_chsnbz.jpg' },
            { rootProductId: 50, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763746218/product/kenzo_leather_phone_case_2_mphphn.jpg' },
            { rootProductId: 50, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763746218/product/kenzo_leather_phone_case_3_gydlez.jpg' },
            { rootProductId: 50, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763746218/product/kenzo_leather_phone_case_4_rinwiw.jpg' },
            { rootProductId: 50, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763746217/product/kenzo_leather_phone_case_5_chkfbb.jpg' },
            { rootProductId: 50, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763746217/product/kenzo_leather_phone_case_6_j7akbi.jpg' },
            { rootProductId: 51, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763815877/product/jordan_everyday_max_1_twfstp.jpg' },
            { rootProductId: 51, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763815877/product/jordan_everyday_max_2_jcoksi.jpg' },
            { rootProductId: 52, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763816182/product/zoom_insole_1_szal6t.jpg' },
            { rootProductId: 53, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763816585/product/dc41_matcha_1_zmk9hs.jpg' },
            { rootProductId: 53, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763816585/product/dc41_matcha_2_pb6vr6.jpg' },
            { rootProductId: 53, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763816585/product/dc41_matcha_3_ylaf1b.jpg' },
            { rootProductId: 53, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763816585/product/dc41_matcha_4_gnhdy9.jpg' },
            { rootProductId: 54, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763818734/product/dc47_kien_tri_1_fv4vcv.png' },
            { rootProductId: 54, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763818733/product/dc47_kien_tri_2_wd9sld.jpg' },
            { rootProductId: 54, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763818733/product/dc47_kien_tri_3_ol2iaf.jpg' },
            { rootProductId: 54, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763818733/product/dc47_kien_tri_4_npl8xd.jpg' },
            { rootProductId: 54, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763818733/product/dc47_kien_tri_5_iqfvtn.jpg' },
            { rootProductId: 54, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763818733/product/dc47_kien_tri_6_d4ctjr.jpg' },
            { rootProductId: 55, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763821167/product/dc39_berry_soda_1_qkupbd.jpg' },
            { rootProductId: 55, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763821168/product/dc39_berry_soda_2_asoq5d.jpg' },
            { rootProductId: 55, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763821168/product/dc39_berry_soda_3_r3aymo.jpg' },
            { rootProductId: 55, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763821167/product/dc39_berry_soda_4_rlt1s1.jpg' },
            { rootProductId: 56, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763822125/product/gel_vs_giay_1_iclpf1.png' },
            { rootProductId: 56, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763822125/product/gel_vs_giay_2_qj0u3y.png' },
            { rootProductId: 56, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763822001/product/gel_vs_giay_3_pbjt1b.jpg' },
            { rootProductId: 57, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763821975/product/gel_tay_o_giay_1_ficq3a.png' },
            { rootProductId: 57, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763821973/product/gel_tay_o_giay_2_xbe8vz.png' },
            { rootProductId: 57, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763821992/product/gel_tay_o_giay_3_h4uqhj.jpg' },
            { rootProductId: 58, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763822907/product/dc47_nang_luong_1_aghbi1.jpg' },
            { rootProductId: 58, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763822906/product/dc47_nang_luong_2_u3ryl3.jpg' },
            { rootProductId: 58, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763822888/product/dc47_nang_luong_3_mvee07.jpg' },
            { rootProductId: 58, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763822888/product/dc47_nang_luong_4_eiskhc.jpg' },
            { rootProductId: 58, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763822887/product/dc47_nang_luong_5_ivyl90.jpg' },
            { rootProductId: 58, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763822887/product/dc47_nang_luong_6_n5anke.jpg' },
            { rootProductId: 59, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763823995/product/ballerina_pink_milk_1_tkszgq.jpg' },
            { rootProductId: 59, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763823995/product/ballerina_pink_milk_2_f80rbs.jpg' },
            { rootProductId: 59, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763823994/product/ballerina_pink_milk_3_elgmab.jpg' },
            { rootProductId: 59, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763823994/product/ballerina_pink_milk_4_ck4wbm.jpg' },
            { rootProductId: 59, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763823994/product/ballerina_pink_milk_5_etgise.jpg' },
            { rootProductId: 59, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763823993/product/ballerina_pink_milk_6_dty2gq.jpg' },
            { rootProductId: 59, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763823994/product/ballerina_pink_milk_7_mhh1d9.jpg' },
            { rootProductId: 60, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915290/product/tui_3_ngan_logo_1_sf9cbx.jpg' },
            { rootProductId: 60, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915290/product/tui_3_ngan_logo_2_oklwri.jpg' },
            { rootProductId: 60, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915290/product/tui_3_ngan_logo_3_zfvyrq.jpg' },
            { rootProductId: 60, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915289/product/tui_3_ngan_logo_4_mkfwoq.jpg' },
            { rootProductId: 60, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915290/product/tui_3_ngan_logo_5_b2oxax.jpg' },
            { rootProductId: 60, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915291/product/tui_3_ngan_logo_6_jz0wyv.jpg' },
            { rootProductId: 60, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763915290/product/tui_3_ngan_logo_7_dnl5qs.jpg' }
        ]
    })

    // --- Product Items ---
    await prisma.productItem.createMany({
        data: [
            { rootProductId: 46, size: '39', stock: 8, barcode: generateProductBarcode() },
            { rootProductId: 46, size: '40', stock: 22, barcode: generateProductBarcode() },
            { rootProductId: 46, size: '40.5', stock: 9, barcode: generateProductBarcode() },
            { rootProductId: 46, size: '41', stock: 27, barcode: generateProductBarcode() },
            { rootProductId: 46, size: '42', stock: 25, barcode: generateProductBarcode() },
            { rootProductId: 46, size: '42.5', stock: 9, barcode: generateProductBarcode() },
            { rootProductId: 46, size: '43', stock: 23, barcode: generateProductBarcode() },
            { rootProductId: 47, size: '35', stock: 7, barcode: generateProductBarcode() },
            { rootProductId: 47, size: '36', stock: 15, barcode: generateProductBarcode() },
            { rootProductId: 47, size: '37', stock: 20, barcode: generateProductBarcode() },
            { rootProductId: 47, size: '38', stock: 24, barcode: generateProductBarcode() },
            { rootProductId: 47, size: '39', stock: 11, barcode: generateProductBarcode() },
            { rootProductId: 48, size: '35', stock: 12, barcode: generateProductBarcode() },
            { rootProductId: 48, size: '36', stock: 15, barcode: generateProductBarcode() },
            { rootProductId: 48, size: '37', stock: 20, barcode: generateProductBarcode() },
            { rootProductId: 48, size: '38', stock: 19, barcode: generateProductBarcode() },
            { rootProductId: 48, size: '39', stock: 10, barcode: generateProductBarcode() },
            { rootProductId: 49, stock: 6, barcode: generateProductBarcode() },
            { rootProductId: 50, stock: 3, barcode: generateProductBarcode() },
            { rootProductId: 51, stock: 50, barcode: generateProductBarcode() },
            { rootProductId: 52, stock: 30, barcode: generateProductBarcode() },
            { rootProductId: 53, size: '39', stock: 10, barcode: generateProductBarcode() },
            { rootProductId: 53, size: '40', stock: 15, barcode: generateProductBarcode() },
            { rootProductId: 53, size: '41', stock: 22, barcode: generateProductBarcode() },
            { rootProductId: 53, size: '42', stock: 24, barcode: generateProductBarcode() },
            { rootProductId: 53, size: '43', stock: 15, barcode: generateProductBarcode() },
            { rootProductId: 53, size: '44', stock: 10, barcode: generateProductBarcode() },
            { rootProductId: 54, size: '39', stock: 8, barcode: generateProductBarcode() },
            { rootProductId: 54, size: '40', stock: 15, barcode: generateProductBarcode() },
            { rootProductId: 54, size: '41', stock: 20, barcode: generateProductBarcode() },
            { rootProductId: 54, size: '42', stock: 22, barcode: generateProductBarcode() },
            { rootProductId: 54, size: '43', stock: 15, barcode: generateProductBarcode() },
            { rootProductId: 54, size: '44', stock: 10, barcode: generateProductBarcode() },
            { rootProductId: 55, size: '39', stock: 6, barcode: generateProductBarcode() },
            { rootProductId: 55, size: '40', stock: 15, barcode: generateProductBarcode() },
            { rootProductId: 55, size: '41', stock: 20, barcode: generateProductBarcode() },
            { rootProductId: 55, size: '42', stock: 28, barcode: generateProductBarcode() },
            { rootProductId: 55, size: '43', stock: 15, barcode: generateProductBarcode() },
            { rootProductId: 55, size: '44', stock: 10, barcode: generateProductBarcode() },
            { rootProductId: 56, stock: 50, barcode: generateProductBarcode() },
            { rootProductId: 57, stock: 50, barcode: generateProductBarcode() },
            { rootProductId: 58, size: '36', stock: 10, barcode: generateProductBarcode() },
            { rootProductId: 58, size: '37', stock: 22, barcode: generateProductBarcode() },
            { rootProductId: 58, size: '38', stock: 20, barcode: generateProductBarcode() },
            { rootProductId: 58, size: '39', stock: 12, barcode: generateProductBarcode() },
            { rootProductId: 59, size: '36', stock: 10, barcode: generateProductBarcode() },
            { rootProductId: 59, size: '37', stock: 27, barcode: generateProductBarcode() },
            { rootProductId: 59, size: '38', stock: 24, barcode: generateProductBarcode() },
            { rootProductId: 59, size: '39', stock: 4, barcode: generateProductBarcode() },
            { rootProductId: 60, stock: 14, barcode: generateProductBarcode() }
        ]
    })

    // --- Shoe Features ---
    await prisma.shoeFeature.createMany({
        data: [
            {
                rootProductId: 46,
                categoryId: 1,
                gender: ShoeGender.MALE,
                upperMaterial: 'Lưới kỹ thuật Engineered Mesh thoáng khí',
                soleMaterial: 'Cao su + Foam Cushlon + Air Zoom',
                liningMaterial: 'Vải lưới mềm',
                closureType: 'Dây buộc',
                toeShape: 'Mũi tròn thể thao',
                waterResistant: 'Không',
                breathability: 'Rất tốt',
                pattern: 'Thiết kế streamline khí động học với logo Nike và các đường cắt thoáng khí',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#6E6E6E',
                secondaryColor: '#000000',
                heelHeight: 3.0,
                durabilityRating: 4.6,
                releaseYear: 2019
            },
            {
                rootProductId: 47,
                categoryId: 6,
                gender: ShoeGender.FEMALE,
                upperMaterial: 'Da nhân tạo phủ bóng',
                soleMaterial: 'Cao su',
                liningMaterial: 'Da nhân tạo',
                closureType: 'Quai đôi (2 quai Mary Jane)',
                toeShape: 'Mũi tròn',
                waterResistant: 'Không',
                breathability: 'Trung bình',
                pattern: 'Quai đôi trang trí với nút tán kim loại nổi bật',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#893e47',
                secondaryColor: null,
                heelHeight: 1.0,
                durabilityRating: 4.0,
                releaseYear: 2023
            },
            {
                rootProductId: 48,
                categoryId: 6,
                gender: ShoeGender.FEMALE,
                upperMaterial: 'Da nhân tạo',
                soleMaterial: 'Cao su / đế bánh mì',
                liningMaterial: 'Vải tổng hợp mềm',
                closureType: 'Trượt (Slip-On)',
                toeShape: 'Mũi tròn',
                waterResistant: 'Không',
                breathability: 'Trung bình',
                pattern: 'Phom mềm giản đơn, không họa tiết nổi bật',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#efeef2',
                secondaryColor: null,
                heelHeight: 1.0,
                durabilityRating: 6.0,
                releaseYear: 2023
            },
            {
                rootProductId: 53,
                categoryId: 1,
                gender: ShoeGender.MALE,
                upperMaterial: 'Vải Canvas cao cấp',
                soleMaterial: 'Cao su chống trượt',
                liningMaterial: 'Vải + Memory Foam (lót đệm)',
                closureType: 'Dây buộc',
                toeShape: 'Mũi tròn',
                waterResistant: 'Không',
                breathability: 'Tốt',
                pattern: 'Màu matcha trơn, phong cách đơn giản năng động',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#5c5d4a',
                secondaryColor: '#e8d5b6',
                heelHeight: 3.0,
                durabilityRating: 6.0,
                releaseYear: 2024
            },
            {
                rootProductId: 54,
                categoryId: 1,
                gender: ShoeGender.MALE,
                upperMaterial: 'Da suede + Linen Canvas',
                soleMaterial: 'Cao su (đế vulcanized)',
                liningMaterial: 'Vải tổng hợp + Canvas',
                closureType: 'Dây buộc',
                toeShape: 'Mũi tròn',
                waterResistant: 'Không',
                breathability: 'Trung bình',
                pattern: 'Tông nâu đậm, kết hợp mảng vật liệu da và linen - cá tính ổn định',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#816550',
                secondaryColor: '#291208',
                heelHeight: 3.0,
                durabilityRating: 6.0,
                releaseYear: 2024
            },
            {
                rootProductId: 55,
                categoryId: 1,
                gender: ShoeGender.UNISEX,
                upperMaterial: 'Vải Microfiber',
                soleMaterial: 'Cao su chống trượt',
                liningMaterial: 'Vải tổng hợp + Memory Foam',
                closureType: 'Dây buộc',
                toeShape: 'Mũi tròn',
                waterResistant: 'Trung bình',
                breathability: 'Trung bình',
                pattern: 'Màu trắng soda trơn thiết kế tối giản, được điểm nhấn bởi vân đỏ berry nổi bật',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#e2deca',
                secondaryColor: '#703132',
                heelHeight: 3.0,
                durabilityRating: 6.0,
                releaseYear: 2024
            },
            {
                rootProductId: 58,
                categoryId: 1,
                gender: ShoeGender.FEMALE,
                upperMaterial: 'Da suede + Linen Canvas',
                soleMaterial: 'Cao su (đế vulcanized)',
                liningMaterial: 'Vải tổng hợp + Canvas',
                closureType: 'Dây buộc',
                toeShape: 'Mũi tròn',
                waterResistant: 'Không',
                breathability: 'Trung bình',
                pattern: 'Tông đen đậm với các chi tiết hồng nổi bật, kết hợp mảng vật liệu da và linen - cá tính ổn định',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#1c1c1e',
                secondaryColor: '#a88292',
                heelHeight: 3.0,
                durabilityRating: 6.0,
                releaseYear: 2024
            },
            {
                rootProductId: 59,
                categoryId: 6,
                gender: ShoeGender.FEMALE,
                upperMaterial: 'Da tổng hợp',
                soleMaterial: 'Cao su',
                liningMaterial: 'Vải + Nỉ mỏng',
                closureType: 'Trượt (Slip-On)',
                toeShape: 'Mũi tròn',
                waterResistant: 'Thấp',
                breathability: 'Trung bình',
                pattern: 'Màu trắng sữa kết hợp hồng pastel nữ tính, phong cách nhẹ nhàng, nàng thơ',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#e3e9f0',
                secondaryColor: '#d9cbd6',
                heelHeight: 1.0,
                durabilityRating: 4.0,
                releaseYear: 2024
            }
        ]
    })

    // --- Shoe Feature - Occasion Tag ---
    await prisma.shoeFeatureOccasionTag.createMany({
        data: [
            { shoeFeatureId: 41, occasionTagId: 1 },
            { shoeFeatureId: 41, occasionTagId: 2 },
            { shoeFeatureId: 41, occasionTagId: 4 },
            { shoeFeatureId: 41, occasionTagId: 5 },
            { shoeFeatureId: 41, occasionTagId: 8 },
            { shoeFeatureId: 41, occasionTagId: 9 },
            { shoeFeatureId: 42, occasionTagId: 1 },
            { shoeFeatureId: 42, occasionTagId: 2 },
            { shoeFeatureId: 42, occasionTagId: 3 },
            { shoeFeatureId: 42, occasionTagId: 6 },
            { shoeFeatureId: 42, occasionTagId: 8 },
            { shoeFeatureId: 42, occasionTagId: 10 },
            { shoeFeatureId: 43, occasionTagId: 1 },
            { shoeFeatureId: 43, occasionTagId: 2 },
            { shoeFeatureId: 43, occasionTagId: 3 },
            { shoeFeatureId: 43, occasionTagId: 6 },
            { shoeFeatureId: 43, occasionTagId: 8 },
            { shoeFeatureId: 43, occasionTagId: 10 },
            { shoeFeatureId: 44, occasionTagId: 1 },
            { shoeFeatureId: 44, occasionTagId: 2 },
            { shoeFeatureId: 44, occasionTagId: 3 },
            { shoeFeatureId: 44, occasionTagId: 7 },
            { shoeFeatureId: 44, occasionTagId: 8 },
            { shoeFeatureId: 44, occasionTagId: 9 },
            { shoeFeatureId: 45, occasionTagId: 1 },
            { shoeFeatureId: 45, occasionTagId: 2 },
            { shoeFeatureId: 45, occasionTagId: 3 },
            { shoeFeatureId: 45, occasionTagId: 7 },
            { shoeFeatureId: 45, occasionTagId: 8 },
            { shoeFeatureId: 45, occasionTagId: 9 },
            { shoeFeatureId: 46, occasionTagId: 1 },
            { shoeFeatureId: 46, occasionTagId: 2 },
            { shoeFeatureId: 46, occasionTagId: 3 },
            { shoeFeatureId: 46, occasionTagId: 7 },
            { shoeFeatureId: 46, occasionTagId: 8 },
            { shoeFeatureId: 46, occasionTagId: 9 },
            { shoeFeatureId: 47, occasionTagId: 1 },
            { shoeFeatureId: 47, occasionTagId: 2 },
            { shoeFeatureId: 47, occasionTagId: 3 },
            { shoeFeatureId: 47, occasionTagId: 7 },
            { shoeFeatureId: 47, occasionTagId: 8 },
            { shoeFeatureId: 47, occasionTagId: 9 },
            { shoeFeatureId: 48, occasionTagId: 1 },
            { shoeFeatureId: 48, occasionTagId: 2 },
            { shoeFeatureId: 48, occasionTagId: 3 },
            { shoeFeatureId: 48, occasionTagId: 6 },
            { shoeFeatureId: 48, occasionTagId: 8 },
            { shoeFeatureId: 48, occasionTagId: 10 }
        ]
    })

    // --- Shoe Feature - Design Tag ---
    await prisma.shoeFeatureDesignTag.createMany({
        data: [
            { shoeFeatureId: 41, designTagId: 2 },
            { shoeFeatureId: 41, designTagId: 3 },
            { shoeFeatureId: 41, designTagId: 5 },
            { shoeFeatureId: 41, designTagId: 6 },
            { shoeFeatureId: 41, designTagId: 9 },
            { shoeFeatureId: 41, designTagId: 10 },
            { shoeFeatureId: 41, designTagId: 11 },
            { shoeFeatureId: 42, designTagId: 2 },
            { shoeFeatureId: 42, designTagId: 4 },
            { shoeFeatureId: 42, designTagId: 7 },
            { shoeFeatureId: 43, designTagId: 2 },
            { shoeFeatureId: 43, designTagId: 3 },
            { shoeFeatureId: 43, designTagId: 4 },
            { shoeFeatureId: 43, designTagId: 7 },
            { shoeFeatureId: 44, designTagId: 1 },
            { shoeFeatureId: 44, designTagId: 2 },
            { shoeFeatureId: 44, designTagId: 5 },
            { shoeFeatureId: 44, designTagId: 6 },
            { shoeFeatureId: 44, designTagId: 10 },
            { shoeFeatureId: 44, designTagId: 11 },
            { shoeFeatureId: 45, designTagId: 1 },
            { shoeFeatureId: 45, designTagId: 2 },
            { shoeFeatureId: 45, designTagId: 5 },
            { shoeFeatureId: 45, designTagId: 6 },
            { shoeFeatureId: 45, designTagId: 10 },
            { shoeFeatureId: 45, designTagId: 11 },
            { shoeFeatureId: 46, designTagId: 1 },
            { shoeFeatureId: 46, designTagId: 2 },
            { shoeFeatureId: 46, designTagId: 5 },
            { shoeFeatureId: 46, designTagId: 6 },
            { shoeFeatureId: 46, designTagId: 10 },
            { shoeFeatureId: 46, designTagId: 11 },
            { shoeFeatureId: 47, designTagId: 1 },
            { shoeFeatureId: 47, designTagId: 2 },
            { shoeFeatureId: 47, designTagId: 5 },
            { shoeFeatureId: 47, designTagId: 6 },
            { shoeFeatureId: 47, designTagId: 10 },
            { shoeFeatureId: 47, designTagId: 11 },
            { shoeFeatureId: 48, designTagId: 2 },
            { shoeFeatureId: 48, designTagId: 5 },
            { shoeFeatureId: 48, designTagId: 6 },
            { shoeFeatureId: 48, designTagId: 11 }
        ]
    })
}
