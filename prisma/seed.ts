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
            { rootProductId: 11, url: 'https://res.cloudinary.com/dagaqa0ly/image/upload/v1759768202/product/rebook_club_9_slxz8f.jpg' }
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
            { rootProductId: 11, size: '44.5', stock: 10 }
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
            { shoeFeatureId: 6, occasionTagId: 9 }
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
            { shoeFeatureId: 6, designTagId: 9 }
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
            { promotionId: 2, rootProductId: 2 },
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
