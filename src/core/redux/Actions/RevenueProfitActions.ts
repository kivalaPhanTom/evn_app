import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/RevenueProfitTypes'

export const getProfit = createAction(ACTION_TYPES.GET_PROFIT)
export const getProfitFactDetail = createAction<{ currentPlantId: string }>(ACTION_TYPES.GET_PROFIT_FACT_DETAIL)
export const getRevenue = createAction(ACTION_TYPES.GET_REVENUE)
export const getRevenueFactDetail = createAction<{ currentPlantId: string }>(ACTION_TYPES.GET_REVENUE_FACT_DETAIL)
export const getRevenuePowerPrices = createAction<{ currentPlantId: string; date: string }>(
  ACTION_TYPES.GET_REVENUE_POWER_PRICES,
)
export const getRevenueTotalExpense = createAction<{ date: string }>(ACTION_TYPES.GET_REVENUE_TOTAL_EXPENSES)
export const getRevenueByPeriod = createAction<{ startDate: string; endDate: string; type: string }>(
  ACTION_TYPES.GET_REVENUE_BY_PERIOD,
)
export const getDailyAndCumulativeData = createAction<{ currentPlantId: string; date: string }>(
  ACTION_TYPES.GET_DAILY_AND_CUMULATIVE_DATA,
)
export const getProfitByPeriod = createAction<{ startDate: string; endDate: string; currentPlantId: string }>(
  ACTION_TYPES.GET_PROFIT_BY_PERIOD,
)
