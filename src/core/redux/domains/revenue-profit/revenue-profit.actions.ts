import { createAction } from '@reduxjs/toolkit'

export const getProfit = createAction('GET_PROFIT')
export const getProfitFactDetail = createAction<{ currentPlantId: string }>('GET_PROFIT_FACT_DETAIL')
export const getRevenue = createAction('GET_REVENUE')
export const getRevenueFactDetail = createAction<{ currentPlantId: string }>('GET_REVENUE_FACT_DETAIL')
export const getRevenuePowerPrices = createAction<{ currentPlantId: string; date: string }>('GET_REVENUE_POWER_PRICES')
export const getRevenueTotalExpense = createAction<{ date: string }>('GET_REVENUE_TOTAL_EXPENSES')
export const getRevenueByPeriod = createAction<{ startDate: string; endDate: string; type: string }>('GET_REVENUE_BY_PERIOD')
export const getDailyAndCumulativeData = createAction<{ currentPlantId: string; date: string }>(
  'GET_DAILY_AND_CUMULATIVE_DATA',
)
export const getProfitByPeriod = createAction<{ startDate: string; endDate: string; currentPlantId: string }>(
  'GET_PROFIT_BY_PERIOD',
)
