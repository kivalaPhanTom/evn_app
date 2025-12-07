import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/ProductOutputTypes'

export const getProductOutputByHours = createAction(ACTION_TYPES.GET_PRODUCT_BY_HOURS)
export const getProductOutputOverview = createAction(ACTION_TYPES.GET_PRODUCT_OUTPUT_OVERVIEW)
export const getProductOutputByDays = createAction<number>(ACTION_TYPES.GET_PRODUCT_OUTPUT_BY_DAYS)