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
            const { type } = req.query
            const statisticData = await statisticService.getKeyCustomersStatistic(type as StatisticType)

            res.status(200).json({
                data: statisticData
            })
        } catch (error) {
            next(error)
        }
    },

    getRevenuesChart: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { type } = req.query
            const statisticData = await statisticService.getRevenuesChart(type as StatisticType)

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
            const { type } = req.query
            const statisticData = await statisticService.getOrdersChartByCustomerId(parseInt(customerId), type as StatisticType)

            res.status(200).json({
                data: statisticData
            })
        } catch (error) {
            next(error)
        }
    },

    getProductStatistic: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params
            const statisticData = await statisticService.getProductStatistic(parseInt(productId))

            res.status(200).json({
                data: statisticData
            })
        } catch (error) {
            next(error)
        }
    }
}

export default statisticController
