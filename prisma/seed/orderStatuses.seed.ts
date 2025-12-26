import { PrismaClient } from '@prisma/client'

export const seedOrderStatuses = async (prisma: PrismaClient) => {
    // --- Order Statuses ---
    await prisma.orderStatus.createMany({
        data: [
            {
                name: 'Chờ xử lý',
                description: 'Đơn hàng mới được tạo và đang chờ xử lý',
                color: '#71717b',
                isDefault: true,
                shouldReserveStock: true
            }, //1
            {
                name: 'Đã xác nhận',
                description: 'Đơn hàng đã được xác nhận và đang chuẩn bị đóng gói',
                color: '#2b7fff',
                shouldSendNotification: true
            },
            {
                name: 'Đã đóng gói',
                description: 'Đơn hàng đã được đóng gói và chuẩn bị giao cho đơn vị vận chuyển hoặc đợi khách đến lấy',
                color: '#fcc800',
                shouldReleaseStock: true,
                shouldReduceStock: true
            },
            {
                name: 'Đang giao hàng',
                description: 'Đơn hàng đang được vận chuyển đến địa chỉ của khách hàng',
                color: '#fcc800',
                shouldSendNotification: true
            },
            {
                name: 'Giao hàng thành công',
                description: 'Đơn hàng đã được giao thành công đến khách hàng',
                color: '#5ea500',
                shouldMarkAsDelivered: true
            }, //5
            {
                name: 'Giao hàng thất bại',
                description: 'Đơn hàng không thể giao đến khách hàng và đã được trả lại',
                color: '#e7000b',
                shouldIncreaseStock: true,
                isExplanationRequired: true,
                explanationLabel: 'Lý do giao hàng thất bại'
            },
            {
                name: 'Bị từ chối',
                description: 'Đơn hàng bị nhân viên từ chối do không đáp ứng được yêu cầu',
                color: '#e7000b',
                shouldReleaseStock: true,
                shouldSendNotification: true,
                isExplanationRequired: true,
                explanationLabel: 'Lý do từ chối đơn hàng'
            },
            {
                name: 'Đã hoàn trả',
                description: 'Đơn hàng đã được hoàn trả và hoàn tiền lại cho khách hàng',
                color: '#54b8d2',
                shouldIncreaseStock: true,
                shouldMarkAsRefunded: true,
                isExplanationRequired: true,
                explanationLabel: 'Lý do hoàn trả đơn hàng'
            },
            {
                name: 'Đã giao trực tiếp',
                description: 'Đơn hàng được khách hàng đến lấy trực tiếp tại cửa hàng',
                color: '#5ea500',
                shouldMarkAsDelivered: true,
                shouldSendNotification: true
            } //9
        ]
    })

    // --- Order Status Transitions ---
    await prisma.orderStatusTransition.createMany({
        data: [
            { fromStatusId: 1, toStatusId: 2, label: 'Chấp nhận đơn hàng' },
            { fromStatusId: 1, toStatusId: 7, label: 'Từ chối đơn hàng' },
            { fromStatusId: 2, toStatusId: 3, label: 'Xác nhận đã đóng gói', isScanningRequired: true },
            { fromStatusId: 3, toStatusId: 9, label: 'Xác nhận khách hàng đến lấy trực tiếp' },
            { fromStatusId: 3, toStatusId: 4, label: 'Giao cho đơn vị vận chuyển' },
            { fromStatusId: 4, toStatusId: 5, label: 'Xác nhận giao hàng thành công' },
            { fromStatusId: 4, toStatusId: 6, label: 'Xác nhận giao hàng thất bại', isScanningRequired: true },
            { fromStatusId: 5, toStatusId: 8, label: 'Xác nhận hoàn hàng trả tiền', isScanningRequired: true },
            { fromStatusId: 9, toStatusId: 8, label: 'Xác nhận hoàn hàng trả tiền', isScanningRequired: true }
        ]
    })
}
