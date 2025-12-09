import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/PowerActionTypes'

export const getPowerOverivew = createAction(ACTION_TYPES.GET_POWER_OVERVIEW)
export const getPowerByTime = createAction(ACTION_TYPES.GET_POWER_BY_TIME)
export const getPowerByDays = createAction<number>(ACTION_TYPES.GET_POWER_BY_DAYS)
export const getComparePower = createAction<{ tagetDate: string; compareDate: string }>(ACTION_TYPES.GET_COMPARE_POWER)
