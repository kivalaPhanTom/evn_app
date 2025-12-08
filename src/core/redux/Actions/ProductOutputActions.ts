import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/ProductOutputTypes'
import { ProductCummulativeOutputParams } from '@/core/model/productOutput.request'

export const getProductOutputByHours = createAction(ACTION_TYPES.GET_PRODUCT_BY_HOURS)
export const getProductOutputOverview = createAction(ACTION_TYPES.GET_PRODUCT_OUTPUT_OVERVIEW)
export const getProductOutputByDays = createAction<number>(ACTION_TYPES.GET_PRODUCT_OUTPUT_BY_DAYS)
export const getProductCummulativeOutput = createAction<ProductCummulativeOutputParams>(ACTION_TYPES.GET_PRODUCT_CUMMULATIVE_OUTPUT)
export const getCompareProductOutput = createAction<{ tagetDate: string; compareDate: string }>(ACTION_TYPES.GET_COMPARE_PRODUCT_OUTPUT)
