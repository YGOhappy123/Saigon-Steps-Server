import { PrismaClient, ShoeGender } from '@prisma/client'

export const seedBrandsAndCategories = async (prisma: PrismaClient) => {
    // --- Product Brands ---
    await prisma.productBrand.createMany({
        data: [
            {
                name: 'Nike',
                description:
                    'Nike là một trong những thương hiệu thể thao hàng đầu thế giới, được thành lập năm 1964 tại Mỹ với tên ban đầu là Blue Ribbon Sports và chính thức đổi thành Nike, Inc. vào năm 1971. Với biểu tượng "Swoosh" nổi tiếng và khẩu hiệu "Just Do It", Nike đã trở thành biểu tượng của sự sáng tạo, năng động và tinh thần bứt phá. Thương hiệu chuyên sản xuất và kinh doanh giày, quần áo, phụ kiện, đồng thời không ngừng ứng dụng công nghệ tiên tiến để nâng cao trải nghiệm thể thao. Nike cũng gắn liền với nhiều vận động viên và sự kiện thể thao lớn trên toàn cầu.',
                logoUrl: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758962530/brand/nike-logo_mw4rb5.png'
            },
            {
                name: 'Adidas',
                description:
                    'Adidas là thương hiệu thể thao nổi tiếng toàn cầu, được thành lập năm 1949 tại Đức bởi Adolf Dassler. Với biểu tượng ba dòng kẻ đặc trưng, Adidas nhanh chóng trở thành một trong những "ông lớn" trong lĩnh vực giày dép, quần áo và phụ kiện thể thao. Thương hiệu này nổi bật nhờ sự kết hợp giữa công nghệ hiện đại, thiết kế sáng tạo và phong cách thời trang đường phố, đáp ứng nhu cầu đa dạng của cả vận động viên chuyên nghiệp lẫn giới trẻ yêu thích thời trang. Adidas cũng đồng hành cùng nhiều giải đấu, câu lạc bộ và ngôi sao thể thao hàng đầu thế giới.',
                logoUrl: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758962705/brand/adidas-logo_z4h7un.png'
            },
            {
                name: 'Reebok',
                description:
                    'Reebok là thương hiệu thể thao quốc tế có nguồn gốc từ Anh, được thành lập năm 1958 bởi hai anh em Joe và Jeff Foster. Reebok nổi tiếng với các sản phẩm giày, quần áo và phụ kiện thể thao, đặc biệt chú trọng vào sự thoải mái và hiệu suất cho người dùng. Thương hiệu này từng tạo dấu ấn mạnh mẽ trong lĩnh vực giày chạy bộ và aerobic vào thập niên 1980. Hiện nay, Reebok thuộc sở hữu của Authentic Brands Group và tiếp tục phát triển theo hướng gắn kết thể thao với phong cách sống năng động, sáng tạo, đồng hành cùng các vận động viên và cộng đồng yêu thể thao toàn cầu.',
                logoUrl: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758962940/brand/reebok-logo_bjfnia.png'
            },
            {
                name: "Biti's",
                description:
                    "Biti's là thương hiệu giày dép hàng đầu Việt Nam, được thành lập năm 1982. Với khẩu hiệu \"Nâng niu bàn chân Việt\", Biti's gắn liền với chất lượng bền bỉ, sự thoải mái và thân thiện cho người tiêu dùng trong nước. Thương hiệu nổi bật với nhiều dòng sản phẩm đa dạng, từ dép, giày thể thao đến giày da công sở. Những năm gần đây, Biti's đặc biệt gây tiếng vang với dòng Biti's Hunter - hướng đến giới trẻ năng động, hiện đại. Biti's không chỉ khẳng định vị thế tại thị trường nội địa mà còn mở rộng ra quốc tế, trở thành niềm tự hào của ngành giày dép Việt Nam.",
                logoUrl: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758963466/brand/bitis-logo_gkgpqa.png'
            },
            {
                name: 'Vascara',
                description:
                    'Vascara là thương hiệu thời trang Việt Nam ra đời năm 2007, chuyên về giày dép, túi xách và phụ kiện dành cho nữ. Với phong cách hiện đại, tinh tế và đa dạng, Vascara nhanh chóng trở thành lựa chọn quen thuộc của nhiều phụ nữ thành thị yêu thích sự thanh lịch và tiện dụng. Thương hiệu không chỉ chú trọng đến thiết kế thời thượng mà còn đề cao chất lượng và giá trị sử dụng. Hiện nay, Vascara sở hữu hệ thống cửa hàng rộng khắp trên toàn quốc và không ngừng mở rộng kênh bán hàng trực tuyến, khẳng định vị thế trong ngành thời trang Việt Nam.',
                logoUrl: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758963839/brand/vascara-logo_g8mcjz.png'
            },
            {
                name: 'Kenzo',
                description:
                    'Kenzo là thương hiệu thời trang cao cấp đến từ Pháp, được nhà thiết kế người Nhật Bản Kenzo Takada sáng lập năm 1970. Thương hiệu nhanh chóng gây ấn tượng nhờ phong cách độc đáo, kết hợp giữa tinh hoa thời trang châu Âu và sự phóng khoáng, rực rỡ của văn hóa châu Á. Kenzo nổi bật với những họa tiết hoa, màu sắc tươi sáng và thiết kế táo bạo, mang đến tinh thần trẻ trung, tự do và sáng tạo. Ngày nay, Kenzo không chỉ được biết đến qua trang phục mà còn qua các dòng nước hoa danh tiếng, trở thành biểu tượng của sự hiện đại và cá tính trong làng thời trang quốc tế.',
                logoUrl: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758962938/brand/Kenzo-logo_wp9he4.webp'
            },
            {
                name: 'New Balance',
                description:
                    'New Balance là thương hiệu giày thể thao lâu đời đến từ Mỹ, được thành lập năm 1906 tại Boston, Massachusetts. Với triết lý "đặt sự thoải mái và hiệu suất lên hàng đầu", New Balance nổi tiếng nhờ những đôi giày mang phong cách cổ điển kết hợp công nghệ hiện đại, mang lại cảm giác êm ái và ổn định cho người mang. Thương hiệu này tập trung vào chất lượng, độ bền và sự phù hợp cho mọi hoạt động — từ chạy bộ, tập luyện cho đến thời trang hàng ngày. New Balance cũng được biết đến với việc duy trì sản xuất tại Mỹ và Anh, thể hiện cam kết về tay nghề và giá trị truyền thống.',
                logoUrl: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760456916/brand/newbalance_sy8bpk.png'
            },
            {
                name: 'Juno',
                description:
                    'Juno là thương hiệu thời trang Việt Nam nổi tiếng, thành lập năm 2005, chuyên cung cấp giày dép, túi xách và phụ kiện dành cho phái nữ. Juno hướng đến phong cách hiện đại, trẻ trung nhưng vẫn tinh tế, phù hợp với nhiều lứa tuổi. Thương hiệu nổi bật nhờ thiết kế đa dạng, chất lượng sản phẩm cao và giá cả hợp lý. Juno cũng chú trọng trải nghiệm mua sắm tiện lợi, với hệ thống cửa hàng rộng khắp và dịch vụ trực tuyến hiện đại, trở thành lựa chọn quen thuộc của nhiều tín đồ thời trang Việt.',
                logoUrl: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763746875/brand/juno-logo_u7toer.png'
            },
            {
                name: 'Dincox',
                description:
                    'DinCox là thương hiệu giày dép Việt Nam thuộc Bimbi Shoes, nổi bật với khẩu hiệu "Giày chuẩn Âu - Giá ưu Việt". Thương hiệu chuyên sản xuất sneaker, giày da và canvas với thiết kế hiện đại, tinh tế, phù hợp cả nam và nữ. Sản phẩm DinCox nổi bật về chất lượng, độ bền cao và giá cả hợp lý, đồng thời có chính sách bảo hành và đổi size tiện lợi. Với phong cách trẻ trung, đơn giản nhưng thời thượng, DinCox nhanh chóng trở thành lựa chọn yêu thích của giới trẻ Việt.',
                logoUrl: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763747297/brand/dincox-logo_pp7yfd.png'
            },
            {
                name: 'Ananas',
                description:
                    'Ananas là thương hiệu giày dép và thời trang Việt Nam nổi bật với các thiết kế trẻ trung, năng động và hiện đại. Thành lập từ năm 2008, Ananas chú trọng chất lượng sản phẩm với giá cả hợp lý, phù hợp phong cách sống năng động của giới trẻ. Thương hiệu nổi bật nhờ các dòng sneaker độc đáo, phối màu sáng tạo và thoải mái khi sử dụng. Với hệ thống cửa hàng rộng khắp và kênh bán hàng trực tuyến tiện lợi, Ananas đã trở thành lựa chọn yêu thích của nhiều tín đồ thời trang Việt.',
                logoUrl: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763747695/brand/ananas-logo_rpy935.png'
            },
            {
                name: 'Converse',
                description:
                    'Converse là thương hiệu thời trang thể thao nổi tiếng của Mỹ, ra đời từ năm 1908 và được biết đến rộng rãi với dòng giày Chuck Taylor All Star mang tính biểu tượng. Với thiết kế đơn giản, bền bỉ và dễ phối đồ, Converse trở thành lựa chọn yêu thích của nhiều thế hệ trên toàn thế giới. Thương hiệu thể hiện tinh thần tự do, sáng tạo và cá tính, phù hợp nhiều phong cách từ hiện đại đến cổ điển. Ngày nay, Converse vẫn giữ được sức hút mạnh mẽ nhờ sự kết hợp giữa truyền thống và những cải tiến thời trang mới.',
                logoUrl: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763749963/brand/converse-logo_afq6vz.png'
            },
            {
                name: 'Crocs',
                description:
                    'Crocs là thương hiệu giày dép nổi tiếng của Mỹ, ra mắt năm 2002 và nhanh chóng gây chú ý với thiết kế dép clog độc đáo làm từ chất liệu Croslite nhẹ, êm và kháng nước. Sự thoải mái, bền bỉ và tính ứng dụng cao giúp Crocs trở thành lựa chọn phổ biến trong cả sinh hoạt hàng ngày lẫn các hoạt động ngoài trời. Thương hiệu cũng tạo dấu ấn nhờ khả năng tùy biến với các phụ kiện Jibbitz, cho phép người dùng thể hiện cá tính riêng. Ngày nay, Crocs là biểu tượng của phong cách thoải mái, trẻ trung và khác biệt.',
                logoUrl: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1763749992/brand/crocs-logo_ia5nrs.png'
            }
        ]
    })

    // --- Shoe Categories ---
    await prisma.shoeCategory.createMany({
        data: [
            { name: 'Giày sneaker', createdBy: 1 }, //1
            { name: 'Dép sandal', createdBy: 1 },
            { name: 'Dép xỏ ngón', createdBy: 1 },
            { name: 'Giày Tây', createdBy: 1 },
            { name: 'Giày cao gót', createdBy: 2 }, //5
            { name: 'Giày búp bê', createdBy: 2 },
            { name: 'Giày boots', createdBy: 2 },
            { name: 'Dép guốc', createdBy: 2 },
            { name: 'Giày trẻ em', createdBy: 1 },
            { name: 'Dép crocs', createdBy: 1 } //10
        ]
    })
}

export const seedProductTags = async (prisma: PrismaClient) => {
    // --- Occasion Tags ---
    await prisma.occasionTag.createMany({
        data: [
            { name: 'Đi học' }, //1
            { name: 'Đi chơi' },
            { name: 'Dự tiệc / sự kiện' },
            { name: 'Chơi thể thao' },
            { name: 'Tập gym' }, //5
            { name: 'Công sở' },
            { name: 'Hằng ngày' },
            { name: 'Du lịch' },
            { name: 'Hoạt động ngoài trời' },
            { name: 'Trang trọng' } //10
        ]
    })

    // --- Design Tags ---
    await prisma.designTag.createMany({
        data: [
            { name: 'Cổ điển' }, //1
            { name: 'Tối giản' },
            { name: 'Hiện đại' },
            { name: 'Trưởng thành' },
            { name: 'Năng động' }, //5
            { name: 'Trẻ trung' },
            { name: 'Sang trọng' },
            { name: 'Phá cách' },
            { name: 'Tối ưu hiệu suất' },
            { name: 'Đường phố' }, //10
            { name: 'Cá tính' },
            { name: 'Thời thượng' }
        ]
    })
}
