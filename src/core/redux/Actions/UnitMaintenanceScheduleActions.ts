import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/UnitMaintenanceScheduleActionTypes'

export const getRepairSchedule = createAction<{ year: number }>(ACTION_TYPES.GET_REPAIR_SCHEDULE)
export const getDetailRepairSchedule = createAction<{ currentPlantId: string, year: number }>(ACTION_TYPES.GET_DETAIL_REPAIR_SCHEDULE)
