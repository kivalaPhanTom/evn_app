import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/PowerActionTypes'

export const getPowerOverivew = createAction(ACTION_TYPES.GET_POWER_OVERVIEW)
export const getPowerByTime = createAction(ACTION_TYPES.GET_POWER_BY_TIME)
