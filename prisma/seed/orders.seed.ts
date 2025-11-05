import { PrismaClient } from '@prisma/client'

export const seedOrderStatuses = async (prisma: PrismaClient) => {
    // --- Order Statuses ---
    await prisma.orderStatus.createMany({
        data: [
            {
                name: 'Chờ xử lý',
                description: 'Đơn hàng mới được tạo và đang chờ xử lý',
                isDefault: true,
                shouldReserveStock: true
            }, //1
            {
                name: 'Đã xác nhận',
                description: 'Đơn hàng đã được xác nhận và đang chuẩn bị đóng gói',
                shouldSendNotification: true
            },
            {
                name: 'Đã đóng gói',
                description: 'Đơn hàng đã được đóng gói và chuẩn bị giao cho đơn vị vận chuyển',
                shouldReleaseStock: true,
                shouldReduceStock: true
            },
            {
                name: 'Đang giao hàng',
                description: 'Đơn hàng đang được vận chuyển đến địa chỉ của khách hàng',
                shouldSendNotification: true
            },
            {
                name: 'Giao hàng thành công',
                description: 'Đơn hàng đã được giao thành công đến khách hàng',
                shouldMarkAsDelivered: true
            }, //5
            {
                name: 'Giao hàng thất bại',
                description: 'Đơn hàng không thể giao đến khách hàng và đã được trả lại',
                shouldIncreaseStock: true
            },
            {
                name: 'Bị từ chối',
                description: 'Đơn hàng bị nhân viên từ chối do không đáp ứng được yêu cầu',
                shouldReleaseStock: true,
                shouldSendNotification: true
            },
            {
                name: 'Đã hoàn trả',
                description: 'Đơn hàng đã được hoàn trả và hoàn tiền lại cho khách hàng',
                shouldIncreaseStock: true,
                shouldMarkAsRefunded: true
            } //8
        ]
    })

    // --- Order Status Transitions ---
    await prisma.orderStatusTransition.createMany({
        data: [
            { fromStatusId: 1, toStatusId: 2, label: 'Chấp nhận đơn hàng' },
            { fromStatusId: 1, toStatusId: 7, label: 'Từ chối đơn hàng' },
            { fromStatusId: 2, toStatusId: 3, label: 'Xác nhận đã đóng gói', isScanningRequired: true },
            { fromStatusId: 3, toStatusId: 4, label: 'Giao cho đơn vị vận chuyển' },
            { fromStatusId: 4, toStatusId: 5, label: 'Xác nhận giao hàng thành công' },
            { fromStatusId: 4, toStatusId: 6, label: 'Xác nhận giao hàng thất bại', isScanningRequired: true },
            { fromStatusId: 5, toStatusId: 8, label: 'Xác nhận hoàn hàng trả tiền', isScanningRequired: true }
        ]
    })
}
