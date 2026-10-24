import { createAction } from '@reduxjs/toolkit'
import type { ProductCummulativeOutputParams } from '@/core/model/productOutput.request'

export const getProductOutputByHours = createAction('GET_PRODUCT_BY_HOURS')
export const getProductOutputOverview = createAction<{ companyId?: string | null }>('GET_PRODUCT_OUTPUT_OVERVIEW')
export const getProductOutputByDays = createAction<{ n: number; samePeriodYear: number; companyId?: string | null }>(
  'GET_PRODUCT_OUTPUT_BY_DAYS',
)
export const getProductCummulativeOutput = createAction<ProductCummulativeOutputParams>('GET_PRODUCT_CUMMULATIVE_OUTPUT')
export const getCompareProductOutput = createAction<{ tagetDate: string; compareDate: string; currentPlantId: string; companyId?: string | null }>(
  'GET_COMPARE_PRODUCT_OUTPUT',
)
export const getProductOutputOverviewFactDetail = createAction<{
  factoryId: string
  companyId?: string | null
  getDataFromApi: any
  setLoading: any
}>('GET_PRODUCT_OUTPUT_OVERVIEW_FACT_DETAIL')
export const getProductOutputByHoursFactDetail = createAction<{
  factoryId: string
  getDataFromApi: any
  setLoading: any
}>('GET_PRODUCT_BY_HOURS_FACT_DETAIL')
export const getProductOutputByDaysFactDetail = createAction<{
  factoryId: string
  companyId?: string | null
  getDataFromApi: any
  setLoading: any
}>('GET_PRODUCT_OUTPUT_BY_DAYS_FACT_DETAIL')
export const getProductOutputCompareChart = createAction<{
  currentFromDate: string
  currentToDate: string
  compareFromDate: string
  compareToDate: string
  currentPlantId: string
  companyId?: string | null
}>('GET_PRODUCT_OUTPUT_COMPARE_CHART')
