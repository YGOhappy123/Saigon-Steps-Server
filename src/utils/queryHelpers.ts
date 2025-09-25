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

                case 'isWorking':
                case 'isActive':
                    where.account = { isActive: [true, 'true', 1].includes(parsedFilter[criteria]) }
                    break

                case 'name':
                    where.name = { contains: parsedFilter[criteria], mode: 'insensitive' }
                    break

                case 'email':
                    where.email = { contains: parsedFilter[criteria], mode: 'insensitive' }
                    break

                case 'phoneNumber':
                    where.phoneNumber = { contains: parsedFilter[criteria], mode: 'insensitive' }
                    break

                case 'permissions':
                    where.AND = [
                        ...(where.AND || []),
                        ...parsedFilter[criteria].map((permissionId: number) => ({
                            permissions: { some: { permissionId: permissionId } }
                        }))
                    ]
                    break

                default:
                    where[criteria] = parsedFilter[criteria]
                    break
            }
        }
    }

    return where
}
