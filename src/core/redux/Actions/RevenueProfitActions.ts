import { createAction } from "@reduxjs/toolkit"
import * as ACTION_TYPES from '../ActionTypes/RevenueProfitTypes'

export const getProfit = createAction(ACTION_TYPES.GET_PROFIT)
export const getRevenue = createAction(ACTION_TYPES.GET_REVENUE)