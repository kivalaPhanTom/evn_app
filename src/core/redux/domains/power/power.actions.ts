import { createAction } from '@reduxjs/toolkit'

export const getPowerOverivew = createAction('GET_POWER_OVERVIEW')
export const getPowerByTime = createAction('GET_POWER_BY_TIME')
export const getPowerByDays = createAction<number>('GET_POWER_BY_DAYS')
export const getComparePower = createAction<{ tagetDate: string; compareDate: string; currentPlantId: string }>(
  'GET_COMPARE_POWER',
)
export const getPowerOverivewFactDetail = createAction<{ factoryId: string; getDataFromApi: any; setLoading: any }>(
  'GET_POWER_OVERVIEW_FACT_DETAIL',
)
export const getPowerByTimeFactDetail = createAction<{ factoryId: string; getDataFromApi: any; setLoading: any }>(
  'GET_POWER_BY_TIME_FACT_DETAIL',
)
export const getPowerByDaysFactDetail = createAction<{ factoryId: string; getDataFromApi: any; setLoading: any }>(
  'GET_POWER_BY_DAYS_FACT_DETAIL',
)
