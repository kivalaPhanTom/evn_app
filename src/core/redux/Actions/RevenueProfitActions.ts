import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/RevenueProfitTypes'

export const getProfit = createAction(ACTION_TYPES.GET_PROFIT)
export const getRevenue = createAction(ACTION_TYPES.GET_REVENUE)
export const getRevebnuePowerPrices = createAction<{ currentPlantId: string; date: string }>(
  ACTION_TYPES.GET_REVENUE_POWER_PRICES,
)
export const getRevenueTotalExpense = createAction<{ date: string }>(ACTION_TYPES.GET_REVENUE_TOTAL_EXPENSES)
export const getRevenueByPeriod = createAction<{ startDate: string; endDate: string; type: string }>(
  ACTION_TYPES.GET_REVENUE_BY_PERIOD,
)
