import { PrismaClient } from '@prisma/client'

export const seedRolesAndPermissions = async (prisma: PrismaClient) => {
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

            // Order statuses
            { code: 'ADD_NEW_ORDER_STATUS', name: 'Thêm trạng thái đơn hàng mới' },
            { code: 'UPDATE_ORDER_STATUS', name: 'Cập nhật trạng thái đơn hàng' },
            { code: 'DELETE_ORDER_STATUS', name: 'Xóa trạng thái đơn hàng' },
            { code: 'ACCESS_TRANSITION_DASHBOARD_PAGE', name: 'Truy cập trang quản lý hướng chuyển đổi trạng thái' }, //30
            { code: 'ADD_NEW_TRANSITION', name: 'Thêm hướng chuyển đổi trạng thái mới' },
            { code: 'DELETE_TRANSITION', name: 'Xóa hướng chuyển đổi trạng thái' },

            // Product imports
            { code: 'ACCESS_IMPORT_DASHBOARD_PAGE', name: 'Truy cập trang quản lý đơn nhập hàng' },
            { code: 'ADD_NEW_IMPORT', name: 'Thêm đơn nhập hàng mới' },

            // Promotions
            { code: 'ADD_NEW_PROMOTION', name: 'Thêm chương trình khuyến mãi mới' }, //35
            { code: 'UPDATE_PROMOTION', name: 'Cập nhật chương trình khuyến mãi' },
            { code: 'DISABLE_PROMOTION', name: 'Dừng chương trình khuyến mãi' },

            // Coupons
            { code: 'ACCESS_COUPON_DASHBOARD_PAGE', name: 'Truy cập trang quản lý phiếu giảm giá' },
            { code: 'ADD_NEW_COUPON', name: 'Thêm phiếu giảm giá mới' },
            { code: 'DISABLE_COUPON', name: 'Khóa phiếu giảm giá' }, //40

            // Stock
            { code: 'ACCESS_INVENTORY_DASHBOARD_PAGE', name: 'Truy cập trang quản lý tồn kho' },
            { code: 'ACCESS_DAMAGE_REPORT_DASHBOARD_PAGE', name: 'Truy cập trang quản lý báo cáo thiệt hại' },
            { code: 'ADD_NEW_DAMAGE_REPORT', name: 'Thêm báo cáo thiệt hại mới' },

            // Statistics
            { code: 'ACCESS_PRODUCT_STATISTIC_PAGE', name: 'Truy cập trang thống kê sản phẩm' },
            { code: 'ACCESS_REVENUE_STATISTIC_PAGE', name: 'Truy cập trang thống kê doanh thu' } //45
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
            { roleId: 1, permissionId: 39 },
            { roleId: 1, permissionId: 40 },
            { roleId: 1, permissionId: 41 },
            { roleId: 1, permissionId: 42 },
            { roleId: 1, permissionId: 43 },
            { roleId: 1, permissionId: 44 },
            { roleId: 1, permissionId: 45 },

            // Warehouse Staff - inventory and damage report management
            { roleId: 2, permissionId: 33 },
            { roleId: 2, permissionId: 34 },
            { roleId: 2, permissionId: 41 },
            { roleId: 2, permissionId: 42 },
            { roleId: 2, permissionId: 43 },

            // Order Processing Staff - order management
            { roleId: 3, permissionId: 25 },
            { roleId: 3, permissionId: 26 },
            { roleId: 3, permissionId: 30 },

            // Advisory Staff - customer care and advisory
            { roleId: 4, permissionId: 5 },
            { roleId: 4, permissionId: 7 },
            { roleId: 4, permissionId: 8 },
            { roleId: 4, permissionId: 38 },

            // Marketing Staff - promotions and coupons
            { roleId: 5, permissionId: 35 },
            { roleId: 5, permissionId: 36 },
            { roleId: 5, permissionId: 37 },
            { roleId: 5, permissionId: 38 },
            { roleId: 5, permissionId: 39 },
            { roleId: 5, permissionId: 40 },
            { roleId: 5, permissionId: 44 }
        ]
    })
}

export const seedAccountsAndUsers = async (prisma: PrismaClient) => {
    // --- Accounts ---
    await prisma.account.createMany({
        data: [
            { username: 'customer0001', password: '$2a$11$nkC/M88KMyKWGmd44/aQzeSuuwq7.mfCFoRpb8OGHykQG0JnEFROC', isActive: true },
            { username: 'customer0002', password: '$2a$11$KlwjhvWsKbfIi647k3qUr.ia9ZdQLZYcgITuEpueBO52AoyAhU9OK', isActive: true },
            { username: 'customer0003', password: '$2a$11$0BZ2SnQREPsbPRhVOhaaVeeSQAlyzsFADL595pKc70ZFd1zHaCcAa', isActive: true },
            { username: 'customer0004', password: '$2a$11$Oz.G5fwD8zq38K0lUCIYD.QZZ4B2cmqFkJuC47653Ev7PGqs71Zra', isActive: true },
            { username: 'customer0005', password: '$2b$10$OllPT0huDJmHKRg93KvFKuFzKhadFLA5zP2Q4F4Qp1/5q6w2ddoua', isActive: true },
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
}
