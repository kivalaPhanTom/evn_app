import { createAction } from '@reduxjs/toolkit'

export const getPowerOverivew = createAction<{ companyId?: string | null }>('GET_POWER_OVERVIEW')
export const getPowerByTime = createAction<{ companyId?: string | null }>('GET_POWER_BY_TIME')
export const getPowerByDays = createAction<{ dayNumber?: number; companyId?: string | null }>('GET_POWER_BY_DAYS')
export const getComparePower = createAction<{
  tagetDate: string
  compareDate: string
  currentPlantId: string
  companyId?: string | null
}>('GET_COMPARE_POWER')
export const getPowerOverivewFactDetail = createAction<{
  factoryId: string
  companyId?: string | null
  getDataFromApi: any
  setLoading: any
}>('GET_POWER_OVERVIEW_FACT_DETAIL')
export const getPowerByTimeFactDetail = createAction<{
  factoryId: string
  companyId?: string | null
  getDataFromApi: any
  setLoading: any
}>('GET_POWER_BY_TIME_FACT_DETAIL')
export const getPowerByDaysFactDetail = createAction<{
  factoryId: string
  companyId?: string | null
  getDataFromApi: any
  setLoading: any
}>('GET_POWER_BY_DAYS_FACT_DETAIL')
