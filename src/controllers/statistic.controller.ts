import { Request, Response, NextFunction } from 'express'
import { StatisticType } from '@/interfaces/params'
import statisticService from '@/services/statistic.service'

const statisticController = {
    getSummaryStatistic: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { type } = req.query
            const statisticData = await statisticService.getSummaryStatistic(type as StatisticType)

            res.status(200).json({
                data: statisticData
            })
        } catch (error) {
            next(error)
        }
    },

    getKeyCustomersStatistic: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { from, to } = req.query
            const statisticData = await statisticService.getKeyCustomersStatistic(from as string | undefined, to as string | undefined)

            res.status(200).json({
                data: statisticData
            })
        } catch (error) {
            next(error)
        }
    },

    getRevenuesChart: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { from, to } = req.query
            const statisticData = await statisticService.getRevenuesChart(from as string | undefined, to as string | undefined)

            res.status(200).json({
                data: statisticData
            })
        } catch (error) {
            next(error)
        }
    },

    getOrdersChartByCustomerId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { customerId } = req.params
            const { from, to } = req.query
            const statisticData = await statisticService.getOrdersChartByCustomerId(
                parseInt(customerId),
                from as string | undefined,
                to as string | undefined
            )

            res.status(200).json({
                data: statisticData
            })
        } catch (error) {
            next(error)
        }
    },

    getProductsSalesStatistic: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { from, to, hasActivity } = req.query
            const statisticData = await statisticService.getProductsSalesStatistic(
                from as string | undefined,
                to as string | undefined,
                hasActivity === 'false' ? false : true
            )

            res.status(200).json({
                data: statisticData
            })
        } catch (error) {
            next(error)
        }
    }
}

export default statisticController
