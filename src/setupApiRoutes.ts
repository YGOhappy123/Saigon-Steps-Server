import { Express } from 'express'
import * as routes from '@/routes'

export const setupApiRoutes = (app: Express) => {
    const routeMap: [string, any][] = [
        ['/auth', routes.authRoutes],
        ['/files', routes.fileRoutes],
        ['/roles', routes.roleRoutes],
        ['/customers', routes.customerRoutes],
        ['/staffs', routes.staffRoutes],
        ['/brands', routes.brandRoutes],
        ['/categories', routes.categoryRoutes],
        ['/products', routes.productRoutes],
        ['/promotions', routes.promotionRoutes],
        ['/orders', routes.orderRoutes],
        ['/order-statuses', routes.statusRoutes],
        ['/reports', routes.reportRoutes],
        ['/statistics', routes.statisticRoutes],
        ['/chats', routes.chatRoutes],
        ['/ai', routes.aiRoutes]
    ]

    routeMap.forEach(([path, router]) => {
        app.use(path, router)
    })
}
