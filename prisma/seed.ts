import { PrismaClient, ShoeGender, CouponType } from '@prisma/client'
import { url } from 'inspector'

const prisma = new PrismaClient()

const seedData = async () => {
    // --- Staff Roles ---
    await prisma.staffRole.createMany({
        data: [
            { name: 'Super Admin', isImmutable: true },
            { name: 'Nhân Viên Quản Lý Kho', isImmutable: false },
            { name: 'Nhân Viên Xử Lý Đơn Hàng', isImmutable: false },
            { name: 'Nhân Viên Tư Vấn', isImmutable: false },
            { name: 'Nhân Viên Marketing', isImmutable: false }
        ]
    })

    // --- Accounts ---
    await prisma.account.createMany({
        data: [
            { username: 'customer0001', password: '$2a$11$nkC/M88KMyKWGmd44/aQzeSuuwq7.mfCFoRpb8OGHykQG0JnEFROC', isActive: true },
            { username: 'customer0002', password: '$2a$11$KlwjhvWsKbfIi647k3qUr.ia9ZdQLZYcgITuEpueBO52AoyAhU9OK', isActive: true },
            { username: 'customer0003', password: '$2a$11$0BZ2SnQREPsbPRhVOhaaVeeSQAlyzsFADL595pKc70ZFd1zHaCcAa', isActive: true },
            { username: 'customer0004', password: '$2a$11$Oz.G5fwD8zq38K0lUCIYD.QZZ4B2cmqFkJuC47653Ev7PGqs71Zra', isActive: true },
            { username: 'customer0005', password: '$2a$11$3P2dvTISOITxoKZERhT/je25XYkC5v7TDacTfGO2HUubRLtC/SL9q', isActive: true },
            { username: 'staff0001', password: '$2a$11$ySwhpRk89aWrAvHI0iRtNuCpABHLbtgYym3ptSBA2ybwUy5H18.A2', isActive: true },
            { username: 'staff0002', password: '$2a$11$tths/WMBffLQUWt33aNrkOPDi2l/m3L2MGOVjn5gaP.SaOpSWu3Xa', isActive: true },
            { username: 'staff0003', password: '$2a$11$yjR8nOPp206keajtK2oupO.5tTICOhPHn/57tzN.MvcFShAQ9sZxe', isActive: true },
            { username: 'staff0004', password: '$2a$11$7rJW6QKXD0s8/1FTSYjSeuTJlQmVIJjFX8Pp0nPepDqzejE8cnLq2', isActive: true },
            { username: 'staff0005', password: '$2a$11$zqXsN0LPHcMoAKEe5/5pdOBsjnv/HH1fa0.E98pPhoIGkUCW2lj4u', isActive: true },
            { username: 'staff0006', password: '$2a$11$2X2QD.jtfFtjPY4Fz/hmkuoXe.GjpZscjs82RtegrLItV9R92fboW', isActive: true }
        ]
    })

    // --- Customers ---
    await prisma.customer.createMany({
        data: [
            {
                name: 'Trần Thị Vân Anh',
                email: 'vananhtt@gmail.com',
                avatar: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1748456563/avatar/uute8mhvnktvwyanwtef.jpg',
                createdAt: new Date(),
                accountId: 1
            },
            {
                name: 'Phạm Thị Kiều Trang',
                email: 'kieutrangpt@gmail.com',
                avatar: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1737043282/avatar/istockphoto-1395009090-612x612_cz9cl1.jpg',
                createdAt: new Date(),
                accountId: 2
            },
            {
                name: 'Hà Huyền My',
                email: 'huyenmyh@gmail.com',
                avatar: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1736128670/avatar/pexels-photo-573299_utp10s.jpg',
                createdAt: new Date(),
                accountId: 3
            },
            {
                name: 'Lâm Chí Cường',
                email: 'chicuongl@gmail.com',
                avatar: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1736128669/avatar/pexels-photo-1516680_ku3mbb.jpg',
                createdAt: new Date(),
                accountId: 4
            },
            {
                name: 'Nguyễn Văn Minh',
                email: 'vanminhn@gmail.com',
                avatar: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1736128668/avatar/pexels-photo-1680172_grg4ug.jpg',
                createdAt: new Date(),
                accountId: 5
            }
        ]
    })

    // --- Staffs ---
    await prisma.staff.createMany({
        data: [
            {
                createdBy: null,
                name: 'Nguyễn Văn Vũ',
                email: 'vanvun@gmail.com',
                avatar: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1752170940/avatar/photo-1742119897876-67e9935ac375_oiyq3t.avif',
                roleId: 1,
                createdAt: new Date(),
                accountId: 6
            },
            {
                createdBy: null,
                name: 'Huỳnh Thị Thu Nga',
                email: 'thungaht@gmail.com',
                avatar: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1752170987/avatar/photo-1676777455261-fcd8a99a9bca_z2t0de.jpg',
                roleId: 1,
                createdAt: new Date(),
                accountId: 7
            },
            {
                createdBy: 1,
                name: 'Lê Thành Công',
                email: 'thanhcongl@gmail.com',
                avatar: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1752170940/avatar/photo-1718209881006-f6e313e2e109_qjex5e.avif',
                roleId: 2,
                createdAt: new Date(),
                accountId: 8
            },
            {
                createdBy: 1,
                name: 'Nguyễn Trần Anh Quân',
                email: 'anhquannt@gmail.com',
                avatar: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1752426735/avatar/photo-1633332755192-727a05c4013d_p9ppsx.avif',
                roleId: 3,
                createdAt: new Date(),
                accountId: 9
            },
            {
                createdBy: 2,
                name: 'Hà Ánh Tuyết',
                email: 'anhtuyeth@gmail.com',
                avatar: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1752170940/avatar/photo-1718999398032-8fc0a58ed9c7_nezkcx.avif',
                roleId: 4,
                createdAt: new Date(),
                accountId: 10
            },
            {
                createdBy: 2,
                name: 'Phan Thu Hương',
                email: 'thuhuongp@gmail.com',
                avatar: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1752170940/avatar/photo-1596304250579-8cb49baae3f2_bepdku.avif',
                roleId: 5,
                createdAt: new Date(),
                accountId: 11
            }
        ]
    })

    // --- Customer Addresses ---
    await prisma.customerAddress.createMany({
        data: [
            {
                customerId: 1,
                recipientName: 'Trần Thị Vân Anh',
                phoneNumber: '0827376722',
                city: 'thành phố Hà Nội',
                ward: 'phường Ngọc Hà',
                addressLine: '8 Ng. 64 - Vĩnh Phúc',
                isDefault: true
            },
            {
                customerId: 1,
                recipientName: 'Trần Thị Vân Anh',
                phoneNumber: '0827376712',
                city: 'thành phố Hà Nội',
                ward: 'phường Đống Đa',
                addressLine: 'Xoan Cafe, số 5 ngõ 411 Trường Chinh',
                isDefault: false
            },
            {
                customerId: 2,
                recipientName: 'Phạm Thị Kiều Trang',
                phoneNumber: '0902125305',
                city: 'tỉnh Thanh Hóa',
                ward: 'phường Sầm Sơn',
                addressLine: '151 Nguyễn Hồng Lễ',
                isDefault: true
            },
            {
                customerId: 3,
                recipientName: 'Hà Huyền My',
                phoneNumber: '0827775408',
                city: 'tỉnh Long An',
                ward: 'xã Hậu Nghĩa',
                addressLine: '311 QLN2',
                isDefault: true
            },
            {
                customerId: 3,
                recipientName: 'Lê Song Nguyên',
                phoneNumber: '0969040220',
                city: 'thành phố Hồ Chí Minh',
                ward: 'phường Tăng Nhơn Phú',
                addressLine: '35 Man Thiện',
                isDefault: true
            },
            {
                customerId: 4,
                recipientName: 'Lâm Chí Cường',
                phoneNumber: '0941710934',
                city: 'thành phố Hồ Chí Minh',
                ward: 'phường Tân Đông Hiệp',
                addressLine: '64 Đường Nguyễn Thị Tươi',
                isDefault: true
            }
        ]
    })

    // --- App Permissions ---
    await prisma.appPermission.createMany({
        data: [
            // Authentication & staff roles
            { code: 'ACCESS_ROLE_DASHBOARD_PAGE', name: 'Truy cập trang quản lý vai trò' }, //1
            { code: 'ADD_NEW_ROLE', name: 'Thêm vai trò mới' },
            { code: 'UPDATE_ROLE', name: 'Chỉnh sửa vai trò' },
            { code: 'REMOVE_ROLE', name: 'Xóa vai trò' },

            // Customers & advisory
            { code: 'ACCESS_CUSTOMER_DASHBOARD_PAGE', name: 'Truy cập trang quản lý khách hàng' }, //5
            { code: 'DEACTIVATE_CUSTOMER_ACCOUNT', name: 'Khóa tài khoản khách hàng' },
            { code: 'ACCESS_ADVISORY_DASHBOARD_PAGE', name: 'Truy cập trang chăm sóc khách hàng' },
            { code: 'CHAT_WITH_CUSTOMER', name: 'Nhắn tin tư vấn cho khách hàng' },

            // Human resources
            { code: 'ACCESS_STAFF_DASHBOARD_PAGE', name: 'Truy cập trang quản lý nhân sự' },
            { code: 'ADD_NEW_STAFF', name: 'Tạo nhân viên mới' }, //10
            { code: 'UPDATE_STAFF_INFORMATION', name: 'Cập nhật thông tin nhân viên' },
            { code: 'CHANGE_STAFF_ROLE', name: 'Thay đổi vai trò của nhân viên' },
            { code: 'DEACTIVATE_STAFF_ACCOUNT', name: 'Khóa tài khoản nhân viên' },
            { code: 'MODIFY_PERSONAL_INFORMATION', name: 'Tự thay đổi thông tin cá nhân' },

            // Categories
            { code: 'ADD_NEW_SHOE_CATEGORY', name: 'Thêm danh mục giày dép mới' }, //15
            { code: 'UPDATE_SHOE_CATEGORY', name: 'Cập nhật danh mục giày dép' },
            { code: 'DELETE_SHOE_CATEGORY', name: 'Xóa danh mục giày dép' },

            // Brands
            { code: 'ADD_NEW_PRODUCT_BRAND', name: 'Thêm thương hiệu sản phẩm mới' },
            { code: 'UPDATE_PRODUCT_BRAND', name: 'Cập nhật thương hiệu sản phẩm' },
            { code: 'DELETE_PRODUCT_BRAND', name: 'Xóa thương hiệu sản phẩm' }, //20

            // Products
            { code: 'ADD_NEW_PRODUCT', name: 'Thêm sản phẩm mới' },
            { code: 'UPDATE_PRODUCT_INFORMATION', name: 'Cập nhật thông tin sản phẩm' },
            { code: 'UPDATE_PRODUCT_PRICE', name: 'Cập nhật giá sản phẩm' },
            { code: 'DELETE_PRODUCT', name: 'Xóa sản phẩm' },

            // Orders
            { code: 'ACCESS_ORDER_DASHBOARD_PAGE', name: 'Truy cập trang quản lý đơn hàng' }, //25
            { code: 'PROCESS_ORDER', name: 'Xử lý đơn hàng' },

            // Product imports
            { code: 'ACCESS_IMPORT_DASHBOARD_PAGE', name: 'Truy cập trang quản lý đơn nhập hàng' },
            { code: 'ADD_NEW_IMPORT', name: 'Thêm đơn nhập hàng mới' },

            // Promotions
            { code: 'ADD_NEW_PROMOTION', name: 'Thêm chương trình khuyến mãi mới' },
            { code: 'UPDATE_PROMOTION', name: 'Cập nhật chương trình khuyến mãi' }, //30
            { code: 'DISABLE_PROMOTION', name: 'Dừng chương trình khuyến mãi' },

            // Coupons
            { code: 'ACCESS_COUPON_DASHBOARD_PAGE', name: 'Truy cập trang quản lý phiếu giảm giá' },
            { code: 'ADD_NEW_COUPON', name: 'Thêm phiếu giảm giá mới' },
            { code: 'DISABLE_COUPON', name: 'Khóa phiếu giảm giá' },

            // Stock
            { code: 'ACCESS_DAMAGE_REPORT_DASHBOARD_PAGE', name: 'Truy cập trang quản lý báo cáo thiệt hại' }, //35
            { code: 'ADD_NEW_DAMAGE_REPORT', name: 'Thêm báo cáo thiệt hại mới' },

            // Statistics
            { code: 'ACCESS_PRODUCT_STATISTIC_PAGE', name: 'Truy cập trang thống kê sản phẩm' },
            { code: 'ACCESS_REVENUE_STATISTIC_PAGE', name: 'Truy cập trang thống kê doanh thu' } //38
        ]
    })

    // --- Role Permissions ---
    await prisma.rolePermission.createMany({
        data: [
            // Super Admin - full permissions
            { roleId: 1, permissionId: 1 },
            { roleId: 1, permissionId: 2 },
            { roleId: 1, permissionId: 3 },
            { roleId: 1, permissionId: 4 },
            { roleId: 1, permissionId: 5 },
            { roleId: 1, permissionId: 6 },
            { roleId: 1, permissionId: 7 },
            { roleId: 1, permissionId: 8 },
            { roleId: 1, permissionId: 9 },
            { roleId: 1, permissionId: 10 },
            { roleId: 1, permissionId: 11 },
            { roleId: 1, permissionId: 12 },
            { roleId: 1, permissionId: 13 },
            { roleId: 1, permissionId: 14 },
            { roleId: 1, permissionId: 15 },
            { roleId: 1, permissionId: 16 },
            { roleId: 1, permissionId: 17 },
            { roleId: 1, permissionId: 18 },
            { roleId: 1, permissionId: 19 },
            { roleId: 1, permissionId: 20 },
            { roleId: 1, permissionId: 21 },
            { roleId: 1, permissionId: 22 },
            { roleId: 1, permissionId: 23 },
            { roleId: 1, permissionId: 24 },
            { roleId: 1, permissionId: 25 },
            { roleId: 1, permissionId: 26 },
            { roleId: 1, permissionId: 27 },
            { roleId: 1, permissionId: 28 },
            { roleId: 1, permissionId: 29 },
            { roleId: 1, permissionId: 30 },
            { roleId: 1, permissionId: 31 },
            { roleId: 1, permissionId: 32 },
            { roleId: 1, permissionId: 33 },
            { roleId: 1, permissionId: 34 },
            { roleId: 1, permissionId: 35 },
            { roleId: 1, permissionId: 36 },
            { roleId: 1, permissionId: 37 },
            { roleId: 1, permissionId: 38 },

            // Warehouse Staff - inventory and damage report management
            { roleId: 2, permissionId: 27 },
            { roleId: 2, permissionId: 28 },
            { roleId: 2, permissionId: 35 },
            { roleId: 2, permissionId: 36 },

            // Order Processing Staff - order management
            { roleId: 3, permissionId: 25 },
            { roleId: 3, permissionId: 26 },

            // Advisory Staff - customer care and advisory
            { roleId: 4, permissionId: 5 },
            { roleId: 4, permissionId: 7 },
            { roleId: 4, permissionId: 8 },
            { roleId: 4, permissionId: 32 },

            // Marketing Staff - promotions and coupons
            { roleId: 5, permissionId: 29 },
            { roleId: 5, permissionId: 30 },
            { roleId: 5, permissionId: 31 },
            { roleId: 5, permissionId: 32 },
            { roleId: 5, permissionId: 33 },
            { roleId: 5, permissionId: 34 },
            { roleId: 5, permissionId: 37 }
        ]
    })

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
            }
        ]
    })

    // --- Root Products ---
    await prisma.rootProduct.createMany({
        data: [
            {
                brandId: 1,
                name: 'Nike V2K Run - Vintage Green',
                slug: 'nike-v2k-run-vintage-green',
                description:
                    'Tiến lên. Quay lại. Không quan trọng—đôi giày này đưa phong cách retro bước vào tương lai. V2K tái hiện tất cả những gì bạn yêu thích ở Vomero trong một diện mạo như được lấy thẳng từ catalog giày chạy bộ đầu những năm 2000. Thiết kế được xếp lớp với sự kết hợp của các chi tiết kim loại nổi bật, nhựa mang tính hoài niệm và phần đế giữa mang đậm vẻ cổ điển. Gót giày dày đảm bảo dù bạn đi đâu cũng luôn thoải mái.',
                price: 1760000,
                isAccessory: false,
                createdBy: 1
            },
            {
                brandId: 6,
                name: 'Túi Clutch Da KENZO Logo Size Lớn - Black / Yellow',
                slug: 'tui-clutch-da-kenzo-logo-size-lon-black-yellow',
                description:
                    'Túi clutch hiện nay không chỉ gói gọn dành cho phái đẹp mà còn là lựa chọn hoàn hảo cho các quý ông hiện đại. Túi Clutch KENZO Logo size lớn với thiết kế hiện đại, gam màu đen - vàng nổi bật cùng logo thương hiệu cá tính. Kiểu dáng thanh lịch, dễ dàng phối hợp cho nhiều phong cách từ sang trọng đến năng động.',
                price: 3260000,
                isAccessory: true,
                createdBy: 2
            },
            {
                brandId: 2,
                name: 'Ba Lô Adidas City Xplorer - Olive',
                slug: 'ba-lo-adidas-city-xplorer-olive',
                description:
                    'Ba lô Adidas City Xplorer màu Olive mang thiết kế hiện đại, trẻ trung với tông màu xanh rêu thời thượng. Được làm từ chất liệu bền chắc, chống thấm nhẹ, ba lô có nhiều ngăn tiện dụng giúp sắp xếp đồ đạc gọn gàng, từ laptop, sách vở cho đến phụ kiện cá nhân. Quai đeo êm ái, dễ dàng điều chỉnh, mang lại sự thoải mái suốt cả ngày. Lựa chọn lý tưởng cho học tập, làm việc hay những chuyến dã ngoại.',
                price: 1200000,
                isAccessory: true,
                createdBy: 2
            },
            {
                brandId: 1,
                name: 'Air Jordan 1 Mid Kid - Electro Orange',
                slug: 'air-jordan-1-mid-kid-electro-orange',
                description:
                    'Air Jordan 1 Mid Kid - Electro Orange mang đến diện mạo nổi bật với sự kết hợp tươi mới giữa sắc cam điện, trắng tinh tế và điểm nhấn đen cá tính. Thiết kế cổ trung đặc trưng giúp hỗ trợ cổ chân, đi kèm chất liệu da tổng hợp bền đẹp, dễ vệ sinh. Đế cao su chắc chắn cho độ bám tốt, mang lại cảm giác thoải mái khi vận động. Một lựa chọn hoàn hảo cho các bạn nhỏ yêu thích phong cách năng động và thời trang.',
                price: 1450000,
                isAccessory: false,
                createdBy: 1
            },
            {
                brandId: 5,
                name: 'Giày Gót Trụ Mary Jane Cut-Out - BMN 0734 - Màu Kem',
                slug: 'giay-got-tru-mary-jane-cut-out-bmn-0734-mau-kem',
                description:
                    'Giày Gót Trụ Mary Jane Cut-Out - BMN 0734 mang đến vẻ đẹp thanh lịch và hiện đại cho phái nữ. Thiết kế Mary Jane cổ điển được biến tấu với chi tiết cut-out tinh tế, vừa tạo điểm nhấn độc đáo vừa tôn lên sự duyên dáng cho đôi chân. Gam màu kem trang nhã, dễ dàng phối hợp cùng nhiều phong cách trang phục từ công sở, dạo phố cho đến dự tiệc. Đây chắc chắn sẽ là lựa chọn hoàn hảo cho những cô nàng yêu thích sự tinh tế, thanh lịch nhưng vẫn muốn khẳng định dấu ấn riêng.',
                price: 935000,
                isAccessory: false,
                createdBy: 1
            },
            {
                brandId: 5,
                name: 'Thắt Lưng Dây Bản Nhấn Chỉ Nổi - WAI 0041 - Màu Đen',
                slug: 'that-lung-day-ban-nhan-chi-noi-wai-0041-mau-den',
                description:
                    'Thắt Lưng Dây Bản Nhấn Chỉ Nổi - WAI 0041 sở hữu thiết kế tối giản nhưng tinh tế, với điểm nhấn đường chỉ nổi nổi bật trên nền da đen sang trọng. Kiểu dáng bản vừa hiện đại, dễ dàng kết hợp cùng nhiều trang phục từ quần jeans, quần tây cho đến đầm liền, giúp tôn dáng và tạo điểm nhấn thanh lịch. Sản phẩm không chỉ là phụ kiện thời trang mà còn mang lại sự tiện dụng và phong cách, phù hợp cho cả môi trường công sở lẫn những buổi dạo phố.',
                price: 339000,
                isAccessory: true,
                createdBy: 2
            },
            {
                brandId: 5,
                name: 'Kính Mát Dáng Tròn Margot - SRP 0001 - Màu Be',
                slug: 'kinh-mat-dang-tron-margot-srp-0001-mau-be',
                description:
                    'Kính Mát Dáng Tròn Margot - SRP 0001 mang hơi thở cổ điển pha lẫn hiện đại, với gọng tròn thanh lịch giúp tôn lên đường nét gương mặt. Tông màu be trang nhã, dễ phối hợp cùng nhiều phong cách khác nhau, từ trẻ trung năng động đến sang trọng tinh tế. Chất liệu gọng bền nhẹ, tròng kính chống nắng hiệu quả, bảo vệ đôi mắt tối ưu mà vẫn giữ được vẻ thời thượng. Đây là phụ kiện không thể thiếu để hoàn thiện phong cách cho những tín đồ yêu thời trang.',
                price: 725000,
                isAccessory: true,
                createdBy: 1
            },
            {
                brandId: 4,
                name: "Charm Trang Trí Giày Dép Biti's Màu Vàng AAUH04900VAG",
                slug: "charm-trang-tri-giay-dep-biti's-mau-vang-aauh04900vag",
                description:
                    "Charm Giày Dép Hình Ong Vàng - Biti's là phụ kiện nhỏ xinh giúp đôi giày thêm phần nổi bật và cá tính. Thiết kế hình ong đáng yêu với gam vàng nổi bật mang đến điểm nhấn trẻ trung, năng động và dễ thương. Phù hợp cho nhiều loại giày dép không chỉ riêng Biti's, charm ong vàng không chỉ làm đẹp mà còn thể hiện phong cách riêng, giúp bạn tự tin khẳng định cá tính ở bất cứ đâu.",
                price: 60000,
                isAccessory: true,
                createdBy: 1
            },
            {
                brandId: 4,
                name: "Giày Thể Thao Biti's Hunter X Nữ Màu Hồng HSW011700HOG",
                slug: "giay-the-thao-biti's-hunter-x-nu-mau-hong-hsw011700hog",
                description:
                    "Biti's Hunter HSW011700 màu Hồng mang đến sự kết hợp hoàn hảo giữa thiết kế nữ tính và tính năng vận động tối ưu. Thân giày làm từ vải lưới thoáng khí kết hợp da tổng hợp mềm mại, giúp tạo cảm giác thoáng mát, đồng thời ôm sát bàn chân một cách vừa vặn. Đế EVA nguyên khối siêu nhẹ hỗ trợ giảm áp lực lên bàn chân, cho từng bước di chuyển trở nên nhẹ nhàng và linh hoạt. Gam màu hồng pastel tinh tế, phối cùng tông trắng nhẹ nhàng, mang lại vẻ ngọt ngào nhưng vẫn năng động.",
                price: 955000,
                isAccessory: false,
                createdBy: 1
            },
            {
                brandId: 4,
                name: "Giày Thể Thao Biti's Hunter Phiên Bản Đặc Biệt 2/9 Nam Màu Kem Lợt HSM013500KEL",
                slug: "giay-the-thao-biti's-hunter-phien-ban-dac-biet-29-nam-mau-kem-lot-hsm013500kel",
                description:
                    'Giày thể thao Biti\'s Hunter Nam Kem Lợt - Phiên Bản Đặc Biệt 2/9 được thiết kế dành riêng cho phái mạnh yêu thích phong cách khỏe khoắn và ý nghĩa tinh thần dân tộc. Phối màu kem lợt sang trọng kết hợp điểm nhấn đỏ - vàng - xanh quân đội, cùng họa tiết ngôi sao vàng và chữ "HẠNH PHÚC" tạo nên diện mạo đậm chất tự hào Việt Nam. Điểm đặc biệt nằm ở tag kim loại khắc "Celebrating Vietnam" và mốc thời gian lịch sử 02.09.1945 - 02.09.2025, như một lời nhắc nhở và tôn vinh niềm tự hào dân tộc.',
                price: 1095000,
                isAccessory: false,
                createdBy: 1
            },
            {
                brandId: 3,
                name: 'Reebok Classic Leather Legacy - White / Black',
                slug: 'reebok-classic-leather-legacy-white-black',
                description:
                    'Reebok Classic Leather Legacy - White / Black mang phong cách cổ điển pha chút hiện đại, hoàn hảo cho những ai yêu thích sự tối giản nhưng vẫn nổi bật. Thiết kế da cao cấp kết hợp tông trắng – đen tinh tế mang đến vẻ ngoài thời thượng và dễ phối đồ. Đế EVA êm ái giúp di chuyển nhẹ nhàng, thoải mái suốt cả ngày. Một lựa chọn lý tưởng cho phong cách năng động và cá tính.',
                price: 1500000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 1,
                name: 'Nike Pegasus 41 - Ole Miss',
                slug: 'nike-pegasus-41-ole-miss',
                description: 
                    'Nike Pegasus 41 - Ole Miss là phiên bản đặc biệt mang đậm tinh thần thể thao và niềm tự hào đại học Ole Miss. Đôi giày kết hợp giữa hiệu năng vượt trội và phong cách cổ điển, trang bị đệm ZoomX + React cho cảm giác êm ái, phản hồi nhanh nhạy. Thiết kế phối màu xanh – đỏ – trắng đặc trưng giúp nổi bật trên mọi cung đường, lý tưởng cho cả chạy bộ lẫn sử dụng hằng ngày.',
                price: 1915000,
                isAccessory: false,
                createdBy: 1
            },
            {
                brandId: 1,
                name: 'Nike Sabrina 3 - Mint Foam',
                slug: 'nike-sabrina-3-mint-foam',
                description:
                    'Nike Sabrina 3 - Mint Foam là đôi giày bóng rổ thế hệ mới được thiết kế cho tốc độ, sự linh hoạt và kiểm soát tối đa. Phần upper nhẹ, ôm chân hoàn hảo, kết hợp hệ thống Zoom Air mang lại độ bật và phản hồi cực nhanh. Màu Mint Foam tươi mát tạo điểm nhấn hiện đại, vừa tinh tế vừa năng động. Lý tưởng cho các vận động viên muốn thống trị sân đấu với phong cách và hiệu suất đỉnh cao.',
                price: 2300000,
                isAccessory: false,
                createdBy: 1
            },
            {
                brandId: 2,
                name: 'adidas Italia 70s - Brown',
                slug: 'adidas-italia-70s-brown',
                description:
                    'Adidas Italia 70s Brown mang đậm dấu ấn retro từ thập niên 1970, kết hợp giữa phong cách cổ điển và sự tinh tế hiện đại. Thân giày làm từ da lộn cao cấp cùng tông nâu ấm áp, tạo cảm giác sang trọng và dễ phối đồ. Đế cao su bám tốt, mang lại sự thoải mái cho cả ngày dài. Một lựa chọn hoàn hảo cho những ai yêu thích vẻ đẹp hoài niệm và chất thời trang tinh giản.',
                price: 1500000,
                isAccessory: false,
                createdBy: 1
            },
            {
                brandId: 2,
                name: 'adidas Adistar 4 - Navy',
                slug: 'adidas-adistar-4-navy',
                description:
                    'Adidas Adistar 4 - Navy là đôi giày chạy bộ cao cấp hướng đến sự bền bỉ và thoải mái trên mọi quãng đường. Thiết kế tối giản với tông xanh navy sang trọng, kết hợp chất liệu lưới thoáng khí và lớp đệm EVA êm ái giúp giảm chấn hiệu quả. Đế ngoài bám chắc mang lại độ ổn định tuyệt vời. Hoàn hảo cho người yêu chạy bộ muốn cân bằng giữa hiệu suất, phong cách và độ bền vượt trội.',
                price: 2100000,
                isAccessory: false,
                createdBy: 1
            },
            {
                brandId: 2,
                name: 'adidas Japan Wales Bonner - Light Purple',
                slug: 'adidas-japan-wales-bonner-light-purple',
                description:
                    'Adidas Japan Wales Bonner - Light Purple là sự giao thoa tinh tế giữa di sản thể thao và phong cách thời trang cao cấp. Thiết kế lấy cảm hứng từ thập niên 70, kết hợp chất liệu da lộn mềm mại cùng sắc tím nhạt nhẹ nhàng, thanh lịch. Logo 3 sọc kinh điển và chi tiết khâu thủ công tạo điểm nhấn tinh xảo. Một lựa chọn hoàn hảo cho những ai yêu phong cách retro pha lẫn nét sang trọng hiện đại.',
                price: 2600000,
                isAccessory: false,
                createdBy: 1
            },
            {
                brandId: 2,
                name: 'adidas Tokyo - Black',
                slug: 'adidas-tokyo-black',
                description:
                    'Adidas Tokyo - Black mang tinh thần thể thao hiện đại kết hợp phong cách đường phố tối giản. Thiết kế tông đen toàn phần mạnh mẽ, dễ phối đồ, được làm từ chất liệu vải mesh thoáng khí giúp ôm chân nhẹ nhàng và linh hoạt. Đế cao su bền bỉ mang lại độ bám chắc và cảm giác di chuyển êm ái. Một đôi giày lý tưởng cho những ai yêu thích sự năng động, tinh gọn và phong cách chuẩn urban.',
                price: 1200000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 2,
                name: 'adidas Stan Smith - Cloud White/ Court Green',
                slug: 'adidas-stan-smith-cloud-white-court-green',
                description:
                    'Adidas Stan Smith - Cloud White/Court Green là biểu tượng bất hủ của phong cách tối giản và thanh lịch. Với phần upper da trắng mịn cùng điểm nhấn màu xanh lá ở gót giày, đôi sneaker này toát lên vẻ tinh tế và dễ phối trong mọi outfit. Đế cao su êm ái, bền bỉ mang lại cảm giác thoải mái suốt ngày dài. Một lựa chọn hoàn hảo cho những ai yêu thích sự cổ điển pha chút hiện đại.',
                price: 780000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 2,
                name: 'adidas Ozmillen - Black',
                slug: 'adidas-ozmillen-black',
                description:
                    'Adidas Ozmillen - Black mang thiết kế tương lai đậm chất Y2K, kết hợp giữa phong cách retro và công nghệ hiện đại. Tông đen huyền bí cùng chi tiết kim loại tạo nên vẻ ngoài mạnh mẽ, cá tính. Phần upper mesh thoáng khí giúp thoải mái khi di chuyển, trong khi đế Adiprene+ êm ái mang lại độ đàn hồi và hỗ trợ tối ưu. Hoàn hảo cho những ai muốn nổi bật với phong cách streetwear hiện đại.',
                price: 1080000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 3,
                name: 'Reebok Answer DMX - White',
                slug: 'reebok-answer-dmx-white',
                description:
                    'Reebok Answer DMX - White là biểu tượng của thời kỳ hoàng kim bóng rổ, gắn liền với huyền thoại Allen Iverson. Thiết kế mang đậm chất retro với phối màu trắng tinh khôi, kết hợp công nghệ đệm DMX huyền thoại cho cảm giác êm ái và phản hồi linh hoạt. Chất liệu da cao cấp cùng đường nét mạnh mẽ tạo nên vẻ ngoài sang trọng, thể thao. Một lựa chọn hoàn hảo cho người yêu phong cách cổ điển và hiệu năng đỉnh cao.',
                price: 2155000,
                isAccessory: false,
                createdBy: 2
            },
            {
                brandId: 3,
                name: 'Reebok Court Advance - Midnight Navy / Yellow',
                slug: 'reebok-court-advance-midnight-navy-yellow',
                description:
                    'Reebok Court Advance - Midnight Navy/Yellow mang phong cách cổ điển đậm chất sân đấu, kết hợp giữa nét retro và sự năng động hiện đại. Thân giày làm từ da cao cấp với phối màu xanh navy và vàng nổi bật, tạo điểm nhấn đầy cá tính. Đế cao su bền bỉ cho độ bám chắc, trong khi lớp đệm êm ái giúp di chuyển thoải mái suốt ngày dài. Lý tưởng cho người yêu thời trang vintage và phong cách thể thao tinh tế.',
                price: 500000,
                isAccessory: false,
                createdBy: 2
            }
        ]
    })

    // --- Product Images ---
    await prisma.productImage.createMany({
        data: [
            { rootProductId: 1, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758964861/product/nike_v2k_run_1_v5fill.jpg' },
            { rootProductId: 1, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758964859/product/nike_v2k_run_2_oatjvh.jpg' },
            { rootProductId: 1, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758964857/product/nike_v2k_run_3_zwepzz.jpg' },
            { rootProductId: 1, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758964855/product/nike_v2k_run_4_ur99h3.jpg' },
            { rootProductId: 1, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758964854/product/nike_v2k_run_5_dcmdrl.jpg' },
            { rootProductId: 1, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758964851/product/nike_v2k_run_6_xasu62.jpg' },
            { rootProductId: 1, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758964859/product/nike_v2k_run_7_iloajh.jpg' },
            { rootProductId: 1, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758964850/product/nike_v2k_run_8_vcuxe2.jpg' },
            { rootProductId: 2, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758988465/product/kenzo_clutch_3_pu0ghn.jpg' },
            { rootProductId: 2, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758988467/product/kenzo_clutch_2_rrrnq8.jpg' },
            { rootProductId: 2, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758988468/product/kenzo_clutch_1_cbkm1t.jpg' },
            { rootProductId: 2, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758988469/product/kenzo_clutch_4_neqseg.jpg' },
            { rootProductId: 3, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989279/product/adidas_city_xplorer_1_ywrack.jpg' },
            { rootProductId: 3, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989278/product/adidas_city_xplorer_2_pbmx0r.jpg' },
            { rootProductId: 3, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989276/product/adidas_city_xplorer_3_h6pfyt.jpg' },
            { rootProductId: 3, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989274/product/adidas_city_xplorer_4_u8sa0i.jpg' },
            { rootProductId: 3, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989278/product/adidas_city_xplorer_5_wwiczh.jpg' },
            { rootProductId: 3, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989273/product/adidas_city_xplorer_6_gf98tg.jpg' },
            { rootProductId: 4, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989789/product/aj1_mid_kid_1_qnyuve.png' },
            { rootProductId: 4, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989787/product/aj1_mid_kid_2_a3imwk.png' },
            { rootProductId: 4, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989785/product/aj1_mid_kid_3_mxreem.png' },
            { rootProductId: 4, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989784/product/aj1_mid_kid_4_izgtio.png' },
            { rootProductId: 4, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989781/product/aj1_mid_kid_5_wli2h1.png' },
            { rootProductId: 4, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989731/product/aj1_mid_kid_6_avn4my.png' },
            { rootProductId: 4, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989730/product/aj1_mid_kid_7_ugy182.png' },
            { rootProductId: 4, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758989738/product/aj1_mid_kid_8_kbm5s7.png' },
            { rootProductId: 5, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758994247/product/mary_jane_1_sodssh.jpg' },
            { rootProductId: 5, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758994207/product/mary_jane_2_w766eo.jpg' },
            { rootProductId: 5, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758994202/product/mary_jane_3_ax0agp.jpg' },
            { rootProductId: 5, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758994204/product/mary_jane_4_ps8mar.jpg' },
            { rootProductId: 5, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758994203/product/mary_jane_5_kscwxa.jpg' },
            { rootProductId: 6, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758995708/product/that_lung_wai_1_foc64y.jpg' },
            { rootProductId: 6, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758995704/product/that_lung_wai_2_r9358b.jpg' },
            { rootProductId: 6, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758995705/product/that_lung_wai_3_zg6wxf.jpg' },
            { rootProductId: 6, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758995704/product/that_lung_wai_4_uxwh2q.jpg' },
            { rootProductId: 7, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758995710/product/margot_be_1_ep6fpt.jpg' },
            { rootProductId: 7, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758995712/product/margot_be_2_v1d98m.jpg' },
            { rootProductId: 7, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758995714/product/margot_be_3_fx7kyn.jpg' },
            { rootProductId: 7, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758995716/product/margot_be_4_n5k5nk.jpg' },
            { rootProductId: 8, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758996264/product/charm_bee_1_dd6kbr.jpg' },
            { rootProductId: 8, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758996264/product/charm_bee_2_z6xetr.jpg' },
            { rootProductId: 8, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758996264/product/charm_bee_3_e6pfs3.jpg' },
            { rootProductId: 9, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997072/product/HSW011700HOG_1_hgbsta.jpg' },
            { rootProductId: 9, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997072/product/HSW011700HOG_2_yb9mvb.jpg' },
            { rootProductId: 9, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997071/product/HSW011700HOG_3_fbdwgh.jpg' },
            { rootProductId: 9, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997071/product/HSW011700HOG_4_ykbkwo.jpg' },
            { rootProductId: 9, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997071/product/HSW011700HOG_5_awo38y.jpg' },
            { rootProductId: 9, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997071/product/HSW011700HOG_6_o8v35v.jpg' },
            { rootProductId: 9, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997071/product/HSW011700HOG_7_bhdoko.jpg' },
            { rootProductId: 10, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997001/product/HSM013500KEL_1_qnjetz.jpg' },
            { rootProductId: 10, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997000/product/HSM013500KEL_2_giw7s0.jpg' },
            { rootProductId: 10, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997000/product/HSM013500KEL_3_z4sy3p.jpg' },
            { rootProductId: 10, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997000/product/HSM013500KEL_4_beoij6.jpg' },
            { rootProductId: 10, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997001/product/HSM013500KEL_5_bgf3rh.jpg' },
            { rootProductId: 10, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997000/product/HSM013500KEL_6_iqp5nq.jpg' },
            { rootProductId: 10, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1758997000/product/HSM013500KEL_7_pe2b0n.jpg' },
            { rootProductId: 11, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1759768208/product/rebook_club_1_f6zxob.jpg' },
            { rootProductId: 11, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1759768207/product/rebook_club_2_eqckmf.jpg' },
            { rootProductId: 11, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1759768207/product/rebook_club_3_yvnflt.jpg' },
            { rootProductId: 11, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1759768207/product/rebook_club_4_hxnzoz.jpg' },
            { rootProductId: 11, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1759768209/product/rebook_club_5_nqxbml.jpg' },
            { rootProductId: 11, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1759768202/product/rebook_club_6_uoqxhb.jpg' },
            { rootProductId: 11, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1759768207/product/rebook_club_7_xxgt5n.jpg' },
            { rootProductId: 11, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1759768203/product/rebook_club_8_lcqjhb.jpg' },
            { rootProductId: 11, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1759768202/product/rebook_club_9_slxz8f.jpg' },
            { rootProductId: 12, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760037403/product/nike_pegasus_1_zw3yb7.jpg' },
            { rootProductId: 12, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760037403/product/nike_pegasus_2_c2rkua.jpg' },
            { rootProductId: 12, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760037403/product/nike_pegasus_3_yawx1w.jpg' },
            { rootProductId: 12, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760037403/product/nike_pegasus_4_hf81y2.jpg' },
            { rootProductId: 12, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760037404/product/nike_pegasus_5_g6nr4r.jpg' },
            { rootProductId: 12, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760037403/product/nike_pegasus_6_apjgit.jpg' },
            { rootProductId: 12, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760037403/product/nike_pegasus_7_ftttxu.jpg' },
            { rootProductId: 12, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760037404/product/nike_pegasus_8_e92ha6.jpg' },
            { rootProductId: 13, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760147873/product/nike_sabrina_1_nv1owq.jpg' },
            { rootProductId: 13, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760147868/product/nike_sabrina_2_zifmfr.jpg' },
            { rootProductId: 13, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760147867/product/nike_sabrina_3_unzdf9.jpg' },
            { rootProductId: 13, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760147868/product/nike_sabrina_4_tj71ci.jpg' },
            { rootProductId: 13, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760147868/product/nike_sabrina_5_asvabl.jpg' },
            { rootProductId: 13, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760147868/product/nike_sabrina_6_ull5io.jpg' },
            { rootProductId: 13, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760147870/product/nike_sabrina_7_e59g89.jpg' },
            { rootProductId: 13, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760147870/product/nike_sabrina_8_tp3peh.jpg' },
            { rootProductId: 14, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149005/product/adidas_italia_70s_1_aa1hyy.jpg' },
            { rootProductId: 14, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149006/product/adidas_italia_70s_2_yrk1yh.jpg' },
            { rootProductId: 14, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149007/product/adidas_italia_70s_3_d3xwjx.jpg' },
            { rootProductId: 14, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149006/product/adidas_italia_70s_4_gmkhmc.jpg' },
            { rootProductId: 14, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149006/product/adidas_italia_70s_5_tmmsux.jpg' },
            { rootProductId: 14, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149006/product/adidas_italia_70s_6_frdst0.jpg' },
            { rootProductId: 14, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149006/product/adidas_italia_70s_7_slrfw2.jpg' },
            { rootProductId: 14, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149007/product/adidas_italia_70s_8_pewkkv.jpg' },
            { rootProductId: 14, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149009/product/adidas_italia_70s_9_otcdig.jpg' },
            { rootProductId: 14, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149011/product/adidas_italia_70s_10_xw27ds.jpg' },
            { rootProductId: 15, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149909/product/adidas_adistar_1_tadywm.jpg' },
            { rootProductId: 15, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149909/product/adidas_adistar_2_hhhyxl.jpg' },
            { rootProductId: 15, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149909/product/adidas_adistar_3_kjm9ck.jpg' },
            { rootProductId: 15, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149909/product/adidas_adistar_4_nou14n.jpg' },
            { rootProductId: 15, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149910/product/adidas_adistar_5_ccpnuu.jpg' },
            { rootProductId: 15, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149909/product/adidas_adistar_6_gyys23.jpg' },
            { rootProductId: 15, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149910/product/adidas_adistar_7_j8hxge.jpg' },
            { rootProductId: 15, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149910/product/adidas_adistar_8_l5nifa.jpg' },
            { rootProductId: 15, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760149910/product/adidas_adistar_9_xy1xds.jpg' },
            { rootProductId: 16, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760150893/product/adidas_japan_wb_1_qrugt1.jpg' },
            { rootProductId: 16, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760150894/product/adidas_japan_wb_2_gjreqs.jpg' },
            { rootProductId: 16, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760150894/product/adidas_japan_wb_3_z6jvvq.jpg' },
            { rootProductId: 16, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760150894/product/adidas_japan_wb_4_wjzrdn.jpg' },
            { rootProductId: 16, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760150895/product/adidas_japan_wb_5_g8trpn.jpg' },
            { rootProductId: 16, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760150895/product/adidas_japan_wb_6_ww4fgh.jpg' },
            { rootProductId: 17, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760153591/product/adidas_tokyo_b_1_tr7qju.jpg' },
            { rootProductId: 17, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760153591/product/adidas_tokyo_b_2_mp5xyq.jpg' },
            { rootProductId: 17, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760153591/product/adidas_tokyo_b_3_sr5ydw.jpg' },
            { rootProductId: 17, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760153591/product/adidas_tokyo_b_4_m4agyr.jpg' },
            { rootProductId: 17, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760153592/product/adidas_tokyo_b_5_upa6yc.jpg' },
            { rootProductId: 17, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760153592/product/adidas_tokyo_b_6_zhwyul.jpg' },
            { rootProductId: 17, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760153592/product/adidas_tokyo_b_7_efqiyh.jpg' },
            { rootProductId: 17, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760153593/product/adidas_tokyo_b_8_agrjv6.jpg' },
            { rootProductId: 17, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760153598/product/adidas_tokyo_b_9_x0agwx.jpg' },
            { rootProductId: 18, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760154409/product/adidasSS_Cloud_White_1_zaknye.jpg' },
            { rootProductId: 18, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760154410/product/adidasSS_Cloud_White_2_wuawcl.jpg' },
            { rootProductId: 18, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760154410/product/adidasSS_Cloud_White_3_sp4x7y.jpg' },
            { rootProductId: 18, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760154410/product/adidasSS_Cloud_White_4_gnswkn.jpg' },
            { rootProductId: 18, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760154410/product/adidasSS_Cloud_White_5_mwqr2r.jpg' },
            { rootProductId: 18, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760154411/product/adidasSS_Cloud_White_6_gjnuyp.jpg' },
            { rootProductId: 18, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760154415/product/adidasSS_Cloud_White_7_ppo60m.jpg' },
            { rootProductId: 18, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760154416/product/adidasSS_Cloud_White_8_z3mw0i.jpg' },
            { rootProductId: 18, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760154420/product/adidasSS_Cloud_White_9_fcin0j.jpg' },
            { rootProductId: 18, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760154418/product/adidasSS_Cloud_White_10_jhjobe.jpg' },
            { rootProductId: 19, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155122/product/adidas_ozmillen_1_gkblel.jpg' },
            { rootProductId: 19, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155128/product/adidas_ozmillen_2_kxmcwp.jpg' },
            { rootProductId: 19, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155122/product/adidas_ozmillen_3_fpi75r.jpg' },
            { rootProductId: 19, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155122/product/adidas_ozmillen_4_rz63tx.jpg' },
            { rootProductId: 19, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155123/product/adidas_ozmillen_5_g1wzs8.jpg' },
            { rootProductId: 19, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155123/product/adidas_ozmillen_6_alhyru.jpg' },
            { rootProductId: 19, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155125/product/adidas_ozmillen_7_dopexl.jpg' },
            { rootProductId: 19, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155128/product/adidas_ozmillen_8_hndw3e.jpg' },
            { rootProductId: 20, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155966/product/reebok_answer_dmx_1_i93xc3.jpg' },
            { rootProductId: 20, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155966/product/reebok_answer_dmx_2_xqchuc.jpg' },
            { rootProductId: 20, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155967/product/reebok_answer_dmx_3_x8qmlz.jpg' },
            { rootProductId: 20, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155968/product/reebok_answer_dmx_4_wlrqgy.jpg' },
            { rootProductId: 20, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155967/product/reebok_answer_dmx_5_qa9vrq.jpg' },
            { rootProductId: 20, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155972/product/reebok_answer_dmx_6_v9u4mc.jpg' },
            { rootProductId: 20, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155973/product/reebok_answer_dmx_7_owj2ix.jpg' },
            { rootProductId: 20, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155974/product/reebok_answer_dmx_8_b6cfou.jpg' },
            { rootProductId: 20, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760155976/product/reebok_answer_dmx_9_fhrg0j.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156773/product/reebok_court_advance_midnight_navy_1_hapfbm.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156774/product/reebok_court_advance_midnight_navy_2_k7znsr.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156775/product/reebok_court_advance_midnight_navy_3_blsn3w.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156774/product/reebok_court_advance_midnight_navy_4_bjzbvw.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156776/product/reebok_court_advance_midnight_navy_5_fr1jn8.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156780/product/reebok_court_advance_midnight_navy_6_baoloo.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156782/product/reebok_court_advance_midnight_navy_7_ky8t2f.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156782/product/reebok_court_advance_midnight_navy_8_e0aaid.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156786/product/reebok_court_advance_midnight_navy_9_yxz7zx.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156784/product/reebok_court_advance_midnight_navy_10_iapyg6.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156791/product/reebok_court_advance_midnight_navy_11_m5hs0i.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156786/product/reebok_court_advance_midnight_navy_12_oedzb4.jpg' },
            { rootProductId: 21, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1760156788/product/reebok_court_advance_midnight_navy_13_zyubcz.jpg' }
        ]
    })

    // --- Product Items ---
    await prisma.productItem.createMany({
        data: [
            { rootProductId: 1, size: '38.5', stock: 5 },
            { rootProductId: 1, size: '39', stock: 10 },
            { rootProductId: 1, size: '40', stock: 10 },
            { rootProductId: 1, size: '40.5', stock: 3 },
            { rootProductId: 1, size: '41', stock: 10 },
            { rootProductId: 1, size: '42', stock: 15 },
            { rootProductId: 1, size: '42.5', stock: 5 },
            { rootProductId: 1, size: '43', stock: 10 },
            { rootProductId: 1, size: '44', stock: 9 },
            { rootProductId: 2, stock: 20 },
            { rootProductId: 3, stock: 10 },
            { rootProductId: 4, size: '29.5', stock: 5 },
            { rootProductId: 4, size: '31', stock: 7 },
            { rootProductId: 4, size: '32', stock: 7 },
            { rootProductId: 4, size: '33', stock: 12 },
            { rootProductId: 4, size: '33.5', stock: 5 },
            { rootProductId: 4, size: '34', stock: 10 },
            { rootProductId: 4, size: '35', stock: 8 },
            { rootProductId: 5, size: '35', stock: 10 },
            { rootProductId: 5, size: '36', stock: 20 },
            { rootProductId: 5, size: '37', stock: 22 },
            { rootProductId: 5, size: '38', stock: 18 },
            { rootProductId: 5, size: '39', stock: 10 },
            { rootProductId: 6, stock: 40 },
            { rootProductId: 7, stock: 17 },
            { rootProductId: 8, stock: 50 },
            { rootProductId: 9, size: '35', stock: 20 },
            { rootProductId: 9, size: '36', stock: 25 },
            { rootProductId: 9, size: '37', stock: 40 },
            { rootProductId: 9, size: '38', stock: 40 },
            { rootProductId: 9, size: '39', stock: 15 },
            { rootProductId: 10, size: '40', stock: 15 },
            { rootProductId: 10, size: '41', stock: 12 },
            { rootProductId: 10, size: '42', stock: 35 },
            { rootProductId: 10, size: '43', stock: 35 },
            { rootProductId: 10, size: '44', stock: 20 },
            { rootProductId: 11, size: '42', stock: 30 },
            { rootProductId: 11, size: '42.5', stock: 10 },
            { rootProductId: 11, size: '43', stock: 20 },
            { rootProductId: 11, size: '44', stock: 20 },
            { rootProductId: 11, size: '44.5', stock: 10 },
            { rootProductId: 12, size: '42', stock: 20 },
            { rootProductId: 12, size: '43', stock: 22 },
            { rootProductId: 12, size: '44', stock: 40 },
            { rootProductId: 12, size: '44.5', stock: 16 },
            { rootProductId: 13, size: '40', stock: 30 },
            { rootProductId: 13, size: '40.5', stock: 13 },
            { rootProductId: 13, size: '41', stock: 40 },
            { rootProductId: 13, size: '42', stock: 30 },
            { rootProductId: 13, size: '42.5', stock: 10 },
            { rootProductId: 14, size: '38.5', stock: 12 },
            { rootProductId: 14, size: '39', stock: 34 },
            { rootProductId: 14, size: '40', stock: 40 },
            { rootProductId: 14, size: '40.5', stock: 30 },
            { rootProductId: 15, size: '41', stock: 20 },
            { rootProductId: 15, size: '42', stock: 40 },
            { rootProductId: 15, size: '42.5', stock: 10 },
            { rootProductId: 15, size: '43', stock: 25 },
            { rootProductId: 15, size: '44', stock: 30 },
            { rootProductId: 16, size: '41', stock: 20 },
            { rootProductId: 16, size: '42', stock: 20 },
            { rootProductId: 16, size: '43', stock: 48 },
            { rootProductId: 16, size: '43.5', stock: 10 },
            { rootProductId: 16, size: '44', stock: 25 },
            { rootProductId: 16, size: '44.5', stock: 20 },
            { rootProductId: 17, size: '38.5', stock: 15 },
            { rootProductId: 17, size: '39', stock: 30 },
            { rootProductId: 17, size: '40', stock: 41 },
            { rootProductId: 17, size: '40.5', stock: 10 },
            { rootProductId: 17, size: '41', stock: 20 },
            { rootProductId: 17, size: '42', stock: 30 },
            { rootProductId: 18, size: '36', stock: 25 },
            { rootProductId: 18, size: '36.5', stock: 16 },
            { rootProductId: 18, size: '37', stock: 30 },
            { rootProductId: 18, size: '38', stock: 35 },
            { rootProductId: 18, size: '38.5', stock: 14 },
            { rootProductId: 18, size: '39', stock: 20 },
            { rootProductId: 18, size: '40', stock: 15 },
            { rootProductId: 18, size: '41', stock: 10 },
            { rootProductId: 19, size: '38', stock: 30 },
            { rootProductId: 19, size: '38.5', stock: 10 },
            { rootProductId: 19, size: '39', stock: 40 },
            { rootProductId: 19, size: '40', stock: 41 },
            { rootProductId: 19, size: '40.5', stock: 23 },
            { rootProductId: 19, size: '41', stock: 45 },
            { rootProductId: 19, size: '42', stock: 33 },
            { rootProductId: 19, size: '42.5', stock: 10 },
            { rootProductId: 19, size: '43', stock: 20 },
            { rootProductId: 20, size: '40', stock: 20 },
            { rootProductId: 20, size: '41', stock: 30 },
            { rootProductId: 20, size: '42', stock: 47 },
            { rootProductId: 20, size: '42.5', stock: 10 },
            { rootProductId: 20, size: '43', stock: 30 },
            { rootProductId: 20, size: '44', stock: 18 },
            { rootProductId: 20, size: '44.5', stock: 10 },
            { rootProductId: 20, size: '45', stock: 15 },
            { rootProductId: 21, size: '36', stock: 42 },
            { rootProductId: 21, size: '36.5', stock: 15 },
            { rootProductId: 21, size: '37', stock: 30 },
            { rootProductId: 21, size: '38', stock: 35 },
            { rootProductId: 21, size: '38.5', stock: 10 },
            { rootProductId: 21, size: '39', stock: 20 },
            { rootProductId: 21, size: '40', stock: 20 },
            { rootProductId: 21, size: '41', stock: 23 },
            { rootProductId: 21, size: '42', stock: 41 },
            { rootProductId: 21, size: '43', stock: 43 }
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
            { name: 'Giày bệt', createdBy: 2 },
            { name: 'Giày trẻ em', createdBy: 1 },
            { name: 'Dép crocs', createdBy: 1 } //10
        ]
    })

    // --- Shoe Features ---
    await prisma.shoeFeature.createMany({
        data: [
            {
                rootProductId: 1,
                categoryId: 1,
                gender: ShoeGender.UNISEX,
                upperMaterial: 'Lưới + Da tổng hợp',
                soleMaterial: 'Đệm foam + Đế cao su',
                liningMaterial: 'Vải dệt',
                closureType: 'Dây buộc',
                toeShape: 'Mũi tròn',
                waterResistant: 'Không',
                breathability: 'Tốt',
                pattern: 'Phối kim loại bóng và chi tiết xếp lớp',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#253230',
                secondaryColor: '#bbc1c7',
                heelHeight: 4.0,
                durabilityRating: 8.5,
                releaseYear: 2024
            },
            {
                rootProductId: 4,
                categoryId: 9,
                gender: ShoeGender.MALE,
                upperMaterial: 'Da tổng hợp + Da thật',
                soleMaterial: 'Đệm air + Đế cao su',
                liningMaterial: 'Vải dệt',
                closureType: 'Dây buộc',
                toeShape: 'Mũi tròn',
                waterResistant: 'Không',
                breathability: 'Trung bình',
                pattern: 'Phối màu cam, đen và trắng nổi bật',
                countryOfOrigin: 'Trung Quốc',
                primaryColor: '#eb704c',
                secondaryColor: '#e3e3e3',
                heelHeight: 3.0,
                durabilityRating: 9.0,
                releaseYear: 2021
            },
            {
                rootProductId: 5,
                categoryId: 5,
                gender: ShoeGender.FEMALE,
                upperMaterial: 'Da tổng hợp',
                soleMaterial: 'Cao su',
                liningMaterial: 'Da tổng hợp',
                closureType: 'Khóa gài (Mary Jane strap)',
                toeShape: 'Mũi tròn',
                waterResistant: 'Không',
                breathability: 'Trung bình',
                pattern: 'Trơn, cut-out tinh tế',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#dec9b1',
                heelHeight: 7.0,
                durabilityRating: 8.0,
                releaseYear: 2023
            },
            {
                rootProductId: 9,
                categoryId: 1,
                gender: ShoeGender.FEMALE,
                upperMaterial: 'Vải lưới + Da tổng hợp',
                soleMaterial: 'Eva nguyên khối',
                liningMaterial: 'Vải + Lớp lót êm',
                closureType: 'Dây buộc',
                toeShape: 'Mũi tròn',
                waterResistant: 'Không',
                breathability: 'Cao',
                pattern: 'Phối hồng pastel - trắng',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#cfbab4',
                secondaryColor: '#c7c0b7',
                heelHeight: 3.5,
                durabilityRating: 8.0,
                releaseYear: 2025
            },
            {
                rootProductId: 10,
                categoryId: 1,
                gender: ShoeGender.MALE,
                upperMaterial: 'Da tổng hợp',
                soleMaterial: 'Cao su',
                liningMaterial: 'Vải + Lót êm',
                closureType: 'Dây buộc',
                toeShape: 'Mũi tròn',
                waterResistant: 'Không',
                breathability: 'Trung bình',
                pattern: 'Phối kem lợt - đỏ - vàng - xanh quân đội',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#cfcfcf',
                secondaryColor: '#5a5d4c',
                heelHeight: 4.0,
                durabilityRating: 8.5,
                releaseYear: 2025
            },
            {
                rootProductId: 11,
                categoryId: 1,
                gender: 'UNISEX',
                upperMaterial: 'Da tổng hợp',
                soleMaterial: 'Cao su',
                liningMaterial: 'Vải dệt mềm',
                closureType: 'Dây buộc',
                toeShape: 'Tròn',
                waterResistant: 'Không',
                breathability: 'Tốt',
                pattern: 'Trơn, điểm nhấn logo Reebok',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#d6d7d9',
                secondaryColor: '#43504b',
                heelHeight: 2.5,
                durabilityRating: 4.5,
                releaseYear: 2023
            },
            {
                rootProductId: 12,
                categoryId: 1,
                gender: ShoeGender.MALE,
                upperMaterial: 'Lưới kỹ thuật (engineered mesh)',
                soleMaterial: 'Cao su + bọt ReactX',
                liningMaterial: 'Vải tổng hợp thoáng khí',
                closureType: 'Dây buộc',
                toeShape: 'Tròn',
                waterResistant: 'Không',
                breathability: 'Rất tốt',
                pattern: 'Phối màu Ole Miss (Xanh navy - Đỏ - Trắng) cùng logo Nike Swoosh',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#1a2b57',
                secondaryColor: '#c8102e',
                heelHeight: 3.2,
                durabilityRating: 4.5,
                releaseYear: 2024
            },
            {
                rootProductId: 13,
                categoryId: 1,
                gender: ShoeGender.FEMALE,
                upperMaterial: 'Lưới dệt tổng hợp (engineered mesh) kết hợp fuse hỗ trợ',
                soleMaterial: 'Cao su + Zoom Air + bọt React',
                liningMaterial: 'Vải mềm thoáng khí',
                closureType: 'Dây buộc',
                toeShape: 'Tròn',
                waterResistant: 'Không',
                breathability: 'Rất tốt',
                pattern: 'Trơn với điểm nhấn logo Swoosh và chi tiết chữ ký Sabrina Ionescu',
                countryOfOrigin: 'Trung Quốc',
                primaryColor: '#b4e1d0',
                secondaryColor: '#ffffffff',
                heelHeight: 3.0,
                durabilityRating: 4.7,
                releaseYear: 2024
            },
            {
                rootProductId: 14,
                categoryId: 1,
                gender: 'UNISEX',
                upperMaterial: 'Da lộn (suede) cao cấp',
                soleMaterial: 'Cao su nguyên khối',
                liningMaterial: 'Vải dệt mềm',
                closureType: 'Dây buộc',
                toeShape: 'Tròn',
                waterResistant: 'Không',
                breathability: 'Trung bình',
                pattern: 'Phong cách retro với 3 sọc adidas cổ điển',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#6b4f36',
                secondaryColor: '#000000ff',
                heelHeight: 2.8,
                durabilityRating: 4.6,
                releaseYear: 2024
            },
            {
                rootProductId: 15,
                categoryId: 1,
                gender: ShoeGender.MALE,
                upperMaterial: 'Lưới kỹ thuật (engineered mesh) tái chế',
                soleMaterial: 'Cao su Continental + bọt REPETITOR 2.0',
                liningMaterial: 'Vải tổng hợp mềm thoáng khí',
                closureType: 'Dây buộc',
                toeShape: 'Tròn',
                waterResistant: 'Không',
                breathability: 'Rất tốt',
                pattern: 'Thiết kế hiện đại, phối 3 sọc adidas phản quang',
                countryOfOrigin: 'Trung Quốc',
                primaryColor: '#1a2b57',
                secondaryColor: '#d3d3d3',
                heelHeight: 3.5,
                durabilityRating: 4.8,
                releaseYear: 2024
            },
            {
                rootProductId: 16,
                categoryId: 1,
                gender: 'UNISEX',
                upperMaterial: 'Da lộn (suede) cao cấp kết hợp vải dệt thủ công',
                soleMaterial: 'Cao su tự nhiên',
                liningMaterial: 'Vải dệt mềm cao cấp',
                closureType: 'Dây buộc',
                toeShape: 'Tròn',
                waterResistant: 'Không',
                breathability: 'Tốt',
                pattern: 'Phong cách retro Nhật Bản, phối màu Wales Bonner đặc trưng',
                countryOfOrigin: 'Indonesia',
                primaryColor: '#918cc2',
                secondaryColor: '#9f876b',
                heelHeight: 2.7,
                durabilityRating: 4.6,
                releaseYear: 2024
            },
            {
                rootProductId: 17,
                categoryId: 1,
                gender: 'UNISEX',
                upperMaterial: 'Vải dệt Primeknit tái chế',
                soleMaterial: 'Cao su Continental + bọt EVA',
                liningMaterial: 'Vải tổng hợp thoáng khí',
                closureType: 'Dây buộc',
                toeShape: 'Tròn',
                waterResistant: 'Không',
                breathability: 'Rất tốt',
                pattern: 'Thiết kế tối giản lấy cảm hứng từ Tokyo với logo 3 sọc tinh tế',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#000000',
                secondaryColor: '#f5f5f5',
                heelHeight: 3.0,
                durabilityRating: 4.7,
                releaseYear: 2024
            },
            {
                rootProductId: 18,
                categoryId: 1,
                gender: 'UNISEX',
                upperMaterial: 'Da tổng hợp (Primegreen – vật liệu tái chế cao cấp)',
                soleMaterial: 'Cao su bền bỉ',
                liningMaterial: 'Vải tổng hợp mềm',
                closureType: 'Dây buộc',
                toeShape: 'Tròn',
                waterResistant: 'Không',
                breathability: 'Tốt',
                pattern: 'Thiết kế cổ điển Stan Smith với logo xanh Court Green ở gót',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#ffffff',
                secondaryColor: '#006400',
                heelHeight: 2.5,
                durabilityRating: 4.8,
                releaseYear: 2023
            },
            {
                rootProductId: 19,
                categoryId: 1,
                gender: 'UNISEX',
                upperMaterial: 'Vải lưới tổng hợp kết hợp da PU',
                soleMaterial: 'Cao su + bọt EVA',
                liningMaterial: 'Vải tổng hợp mềm thoáng khí',
                closureType: 'Dây buộc',
                toeShape: 'Tròn',
                waterResistant: 'Không',
                breathability: 'Tốt',
                pattern: 'Thiết kế chunky hiện đại lấy cảm hứng từ Y2K với logo 3 sọc phản quang',
                countryOfOrigin: 'Trung Quốc',
                primaryColor: '#000000',
                secondaryColor: '#e22523',
                heelHeight: 3.8,
                durabilityRating: 4.6,
                releaseYear: 2024
            },
            {
                rootProductId: 20,
                categoryId: 1,
                gender: ShoeGender.MALE,
                upperMaterial: 'Da thật kết hợp da tổng hợp cao cấp',
                soleMaterial: 'Cao su + công nghệ đệm DMX',
                liningMaterial: 'Vải tổng hợp mềm mại',
                closureType: 'Khóa kéo và dây buộc ẩn',
                toeShape: 'Tròn',
                waterResistant: 'Không',
                breathability: 'Trung bình',
                pattern: 'Thiết kế retro bóng rổ cổ điển với logo Reebok Vector ở hai bên',
                countryOfOrigin: 'Trung Quốc',
                primaryColor: '#ffffff',
                secondaryColor: '#a32227',
                heelHeight: 3.5,
                durabilityRating: 4.7,
                releaseYear: 2024
            },
            {
                rootProductId: 21,
                categoryId: 1,
                gender: 'UNISEX',
                upperMaterial: 'Da tổng hợp cao cấp',
                soleMaterial: 'Cao su lưu hóa',
                liningMaterial: 'Vải dệt mềm thoáng khí',
                closureType: 'Dây buộc',
                toeShape: 'Tròn',
                waterResistant: 'Không',
                breathability: 'Tốt',
                pattern: 'Thiết kế cổ điển phong cách sân quần vợt, logo Reebok vàng nổi bật',
                countryOfOrigin: 'Việt Nam',
                primaryColor: '#191970',
                secondaryColor: '#ffd700',
                heelHeight: 2.8,
                durabilityRating: 4.5,
                releaseYear: 2024
            }
        ]
    })

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

    // --- Shoe Feature - Occasion Tag ---
    await prisma.shoeFeatureOccasionTag.createMany({
        data: [
            { shoeFeatureId: 1, occasionTagId: 1 },
            { shoeFeatureId: 1, occasionTagId: 2 },
            { shoeFeatureId: 1, occasionTagId: 4 },
            { shoeFeatureId: 1, occasionTagId: 5 },
            { shoeFeatureId: 1, occasionTagId: 7 },
            { shoeFeatureId: 1, occasionTagId: 8 },
            { shoeFeatureId: 1, occasionTagId: 9 },
            { shoeFeatureId: 2, occasionTagId: 1 },
            { shoeFeatureId: 2, occasionTagId: 2 },
            { shoeFeatureId: 2, occasionTagId: 3 },
            { shoeFeatureId: 2, occasionTagId: 4 },
            { shoeFeatureId: 2, occasionTagId: 7 },
            { shoeFeatureId: 2, occasionTagId: 8 },
            { shoeFeatureId: 2, occasionTagId: 9 },
            { shoeFeatureId: 3, occasionTagId: 1 },
            { shoeFeatureId: 3, occasionTagId: 2 },
            { shoeFeatureId: 3, occasionTagId: 3 },
            { shoeFeatureId: 3, occasionTagId: 6 },
            { shoeFeatureId: 3, occasionTagId: 8 },
            { shoeFeatureId: 3, occasionTagId: 10 },
            { shoeFeatureId: 4, occasionTagId: 1 },
            { shoeFeatureId: 4, occasionTagId: 2 },
            { shoeFeatureId: 4, occasionTagId: 4 },
            { shoeFeatureId: 4, occasionTagId: 5 },
            { shoeFeatureId: 4, occasionTagId: 7 },
            { shoeFeatureId: 4, occasionTagId: 8 },
            { shoeFeatureId: 4, occasionTagId: 9 },
            { shoeFeatureId: 5, occasionTagId: 1 },
            { shoeFeatureId: 5, occasionTagId: 2 },
            { shoeFeatureId: 5, occasionTagId: 3 },
            { shoeFeatureId: 5, occasionTagId: 4 },
            { shoeFeatureId: 5, occasionTagId: 7 },
            { shoeFeatureId: 5, occasionTagId: 8 },
            { shoeFeatureId: 5, occasionTagId: 9 },
            { shoeFeatureId: 6, occasionTagId: 1 },
            { shoeFeatureId: 6, occasionTagId: 2 },
            { shoeFeatureId: 6, occasionTagId: 4 },
            { shoeFeatureId: 6, occasionTagId: 5 },
            { shoeFeatureId: 6, occasionTagId: 7 },
            { shoeFeatureId: 6, occasionTagId: 8 },
            { shoeFeatureId: 6, occasionTagId: 9 },
            { shoeFeatureId: 7, occasionTagId: 1 },
            { shoeFeatureId: 7, occasionTagId: 2 },
            { shoeFeatureId: 7, occasionTagId: 4 },
            { shoeFeatureId: 7, occasionTagId: 5 },
            { shoeFeatureId: 7, occasionTagId: 7 },
            { shoeFeatureId: 8, occasionTagId: 1 },
            { shoeFeatureId: 8, occasionTagId: 2 },
            { shoeFeatureId: 8, occasionTagId: 4 },
            { shoeFeatureId: 8, occasionTagId: 5 },
            { shoeFeatureId: 8, occasionTagId: 7 },
            { shoeFeatureId: 8, occasionTagId: 8 },
            { shoeFeatureId: 8, occasionTagId: 9 },
            { shoeFeatureId: 9, occasionTagId: 1 },
            { shoeFeatureId: 9, occasionTagId: 2 },
            { shoeFeatureId: 9, occasionTagId: 3 },
            { shoeFeatureId: 9, occasionTagId: 7 },
            { shoeFeatureId: 9, occasionTagId: 10 },
            { shoeFeatureId: 10, occasionTagId: 1 },
            { shoeFeatureId: 10, occasionTagId: 2 },
            { shoeFeatureId: 10, occasionTagId: 4 },
            { shoeFeatureId: 10, occasionTagId: 8 },
            { shoeFeatureId: 10, occasionTagId: 9 },
            { shoeFeatureId: 11, occasionTagId: 1 },
            { shoeFeatureId: 11, occasionTagId: 2 },
            { shoeFeatureId: 11, occasionTagId: 7 },
            { shoeFeatureId: 11, occasionTagId: 8 },
            { shoeFeatureId: 12, occasionTagId: 1 },
            { shoeFeatureId: 12, occasionTagId: 2 },
            { shoeFeatureId: 12, occasionTagId: 3 },
            { shoeFeatureId: 12, occasionTagId: 7 },
            { shoeFeatureId: 12, occasionTagId: 8 },
            { shoeFeatureId: 13, occasionTagId: 1 },
            { shoeFeatureId: 13, occasionTagId: 2 },
            { shoeFeatureId: 13, occasionTagId: 3 },
            { shoeFeatureId: 13, occasionTagId: 7 },
            { shoeFeatureId: 13, occasionTagId: 8 },
            { shoeFeatureId: 14, occasionTagId: 1 },
            { shoeFeatureId: 14, occasionTagId: 2 },
            { shoeFeatureId: 14, occasionTagId: 5 },
            { shoeFeatureId: 14, occasionTagId: 8 },
            { shoeFeatureId: 15, occasionTagId: 1 },
            { shoeFeatureId: 15, occasionTagId: 2 },
            { shoeFeatureId: 15, occasionTagId: 4 },
            { shoeFeatureId: 15, occasionTagId: 8 },
            { shoeFeatureId: 15, occasionTagId: 9 },
            { shoeFeatureId: 16, occasionTagId: 1 },
            { shoeFeatureId: 16, occasionTagId: 2 },
            { shoeFeatureId: 16, occasionTagId: 5 },
            { shoeFeatureId: 16, occasionTagId: 7 },
            { shoeFeatureId: 16, occasionTagId: 8 }
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

    // --- Shoe Feature - Design Tag ---
    await prisma.shoeFeatureDesignTag.createMany({
        data: [
            { shoeFeatureId: 1, designTagId: 3 },
            { shoeFeatureId: 1, designTagId: 5 },
            { shoeFeatureId: 1, designTagId: 6 },
            { shoeFeatureId: 1, designTagId: 9 },
            { shoeFeatureId: 1, designTagId: 10 },
            { shoeFeatureId: 1, designTagId: 11 },
            { shoeFeatureId: 2, designTagId: 3 },
            { shoeFeatureId: 2, designTagId: 5 },
            { shoeFeatureId: 2, designTagId: 6 },
            { shoeFeatureId: 2, designTagId: 9 },
            { shoeFeatureId: 2, designTagId: 11 },
            { shoeFeatureId: 3, designTagId: 2 },
            { shoeFeatureId: 3, designTagId: 4 },
            { shoeFeatureId: 3, designTagId: 7 },
            { shoeFeatureId: 3, designTagId: 11 },
            { shoeFeatureId: 4, designTagId: 3 },
            { shoeFeatureId: 4, designTagId: 5 },
            { shoeFeatureId: 4, designTagId: 6 },
            { shoeFeatureId: 4, designTagId: 9 },
            { shoeFeatureId: 4, designTagId: 10 },
            { shoeFeatureId: 4, designTagId: 11 },
            { shoeFeatureId: 5, designTagId: 3 },
            { shoeFeatureId: 5, designTagId: 5 },
            { shoeFeatureId: 5, designTagId: 6 },
            { shoeFeatureId: 5, designTagId: 9 },
            { shoeFeatureId: 5, designTagId: 11 },
            { shoeFeatureId: 6, designTagId: 2 },
            { shoeFeatureId: 6, designTagId: 3 },
            { shoeFeatureId: 6, designTagId: 5 },
            { shoeFeatureId: 6, designTagId: 6 },
            { shoeFeatureId: 6, designTagId: 9 },
            { shoeFeatureId: 7, designTagId: 1 },
            { shoeFeatureId: 7, designTagId: 5 },
            { shoeFeatureId: 7, designTagId: 6 },
            { shoeFeatureId: 7, designTagId: 9 },
            { shoeFeatureId: 7, designTagId: 10 },
            { shoeFeatureId: 8, designTagId: 3 },
            { shoeFeatureId: 8, designTagId: 5 },
            { shoeFeatureId: 8, designTagId: 6 },
            { shoeFeatureId: 8, designTagId: 9 },
            { shoeFeatureId: 8, designTagId: 11 },
            { shoeFeatureId: 9, designTagId: 1 },
            { shoeFeatureId: 9, designTagId: 2 },
            { shoeFeatureId: 9, designTagId: 4 },
            { shoeFeatureId: 9, designTagId: 7 },
            { shoeFeatureId: 10, designTagId: 3 },
            { shoeFeatureId: 10, designTagId: 5 },
            { shoeFeatureId: 10, designTagId: 6 },
            { shoeFeatureId: 10, designTagId: 8 },
            { shoeFeatureId: 10, designTagId: 9 },
            { shoeFeatureId: 10, designTagId: 10 },
            { shoeFeatureId: 10, designTagId: 11 },
            { shoeFeatureId: 10, designTagId: 12 },
            { shoeFeatureId: 11, designTagId: 1 },
            { shoeFeatureId: 11, designTagId: 2 },
            { shoeFeatureId: 11, designTagId: 3 },
            { shoeFeatureId: 11, designTagId: 4 },
            { shoeFeatureId: 11, designTagId: 7 },
            { shoeFeatureId: 12, designTagId: 2 },
            { shoeFeatureId: 12, designTagId: 3 },
            { shoeFeatureId: 12, designTagId: 5 },
            { shoeFeatureId: 12, designTagId: 6 },
            { shoeFeatureId: 12, designTagId: 10 },
            { shoeFeatureId: 13, designTagId: 1 },
            { shoeFeatureId: 13, designTagId: 2 },
            { shoeFeatureId: 13, designTagId: 3 },
            { shoeFeatureId: 13, designTagId: 5 },
            { shoeFeatureId: 13, designTagId: 6 },
            { shoeFeatureId: 14, designTagId: 3 },
            { shoeFeatureId: 14, designTagId: 5 },
            { shoeFeatureId: 14, designTagId: 6 },
            { shoeFeatureId: 14, designTagId: 8 },
            { shoeFeatureId: 14, designTagId: 10 },
            { shoeFeatureId: 14, designTagId: 11 },
            { shoeFeatureId: 15, designTagId: 1 },
            { shoeFeatureId: 15, designTagId: 5 },
            { shoeFeatureId: 15, designTagId: 6 },
            { shoeFeatureId: 15, designTagId: 8 },
            { shoeFeatureId: 15, designTagId: 9 },
            { shoeFeatureId: 15, designTagId: 11 },
            { shoeFeatureId: 16, designTagId: 1 },
            { shoeFeatureId: 16, designTagId: 2 },
            { shoeFeatureId: 16, designTagId: 5 },
            { shoeFeatureId: 16, designTagId: 6 },
            { shoeFeatureId: 16, designTagId: 11 }
        ]
    })

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

seedData().finally(async () => {
    await prisma.$disconnect()
})
