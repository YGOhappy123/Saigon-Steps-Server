import { parseTime } from '@/utils/timeHelpers'

export const buildWhereStatement = (filter: string = '{}') => {
    const parsedFilter = JSON.parse(filter)
    const where: any = {}

    for (const criteria in parsedFilter) {
        if (parsedFilter[criteria] !== undefined) {
            switch (criteria) {
                case 'startTime':
                    where.createdAt = { ...(where.createdAt || {}), gte: parseTime(parsedFilter[criteria]) }
                    break

                case 'endTime':
                    where.createdAt = {
                        ...(where.createdAt || {}),
                        lte: parseTime(parsedFilter[criteria].trim().length > 10 ? parsedFilter[criteria] : parsedFilter[criteria] + ' 23:59:59')
                    }
                    break

                case 'startReportedTime':
                    where.reportedAt = { ...(where.reportedAt || {}), gte: parseTime(parsedFilter[criteria]) }
                    break

                case 'endReportedTime':
                    where.reportedAt = {
                        ...(where.reportedAt || {}),
                        lte: parseTime(parsedFilter[criteria].trim().length > 10 ? parsedFilter[criteria] : parsedFilter[criteria] + ' 23:59:59')
                    }
                    break

                case 'startImportDate':
                    where.importDate = { ...(where.importDate || {}), gte: parseTime(parsedFilter[criteria]) }
                    break

                case 'endImportDate':
                    where.importDate = {
                        ...(where.importDate || {}),
                        lte: parseTime(parsedFilter[criteria].trim().length > 10 ? parsedFilter[criteria] : parsedFilter[criteria] + ' 23:59:59')
                    }
                    break

                case 'startApplyTime':
                    where.endDate = { gte: parseTime(parsedFilter[criteria]) }
                    break

                case 'endApplyTime':
                    where.startDate = { lte: parseTime(parsedFilter[criteria]) }
                    break

                case 'isActive':
                    where.account = { isActive: [true, 'true', 1].includes(parsedFilter[criteria]) }
                    break

                case 'isAvailable':
                    where.isActive = [true, 'true', 1].includes(parsedFilter[criteria])
                    break

                case 'name':
                    where.name = { contains: parsedFilter[criteria] }
                    break

                case 'customerName':
                    where.customer = { name: { contains: parsedFilter[criteria] } }
                    break

                case 'email':
                    where.email = { contains: parsedFilter[criteria] }
                    break

                case 'phoneNumber':
                    where.phoneNumber = { contains: parsedFilter[criteria] }
                    break

                case 'permissions':
                    where.AND = [
                        ...(where.AND || []),
                        ...parsedFilter[criteria].map((permissionId: number) => ({
                            permissions: { some: { permissionId: permissionId } }
                        }))
                    ]
                    break

                case 'products':
                    where.AND = [
                        ...(where.AND || []),
                        ...parsedFilter[criteria].map((productId: number) => ({
                            products: { some: { rootProductId: productId } }
                        }))
                    ]
                    break

                case 'minPrice':
                    where.price = {
                        ...(where.price || {}),
                        gte: parsedFilter[criteria]
                    }
                    break

                case 'maxPrice':
                    where.price = {
                        ...(where.price || {}),
                        lte: parsedFilter[criteria]
                    }
                    break

                case 'minTotalAmount':
                    where.totalAmount = {
                        ...(where.totalAmount || {}),
                        gte: parsedFilter[criteria]
                    }
                    break

                case 'maxTotalAmount':
                    where.totalAmount = {
                        ...(where.totalAmount || {}),
                        lte: parsedFilter[criteria]
                    }
                    break

                case 'brand':
                    where.brand = { name: parsedFilter[criteria] }
                    break

                case 'categoryId':
                    where.shoeFeature = { categoryId: parsedFilter[criteria] }
                    break

                case 'category':
                    where.shoeFeature = { category: { name: parsedFilter[criteria] } }
                    break

                case 'occasion':
                    where.shoeFeature = { occasionTags: { some: { occasionTag: { name: parsedFilter[criteria] } } } }
                    break

                case 'design':
                    where.shoeFeature = { designTags: { some: { designTag: { name: parsedFilter[criteria] } } } }
                    break

                case 'inStock':
                    if ([true, 'true', 1].includes(parsedFilter[criteria])) {
                        where.productItems = { some: { stock: { gt: 0 } } }
                    } else if ([false, 'false', 0].includes(parsedFilter[criteria])) {
                        where.productItems = { every: { stock: 0 } }
                    }
                    break

                default:
                    where[criteria] = parsedFilter[criteria]
                    break
            }
        }
    }

    return where
}
