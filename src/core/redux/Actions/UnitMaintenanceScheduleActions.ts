import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/UnitMaintenanceScheduleActionTypes'

export const getRepairSchedule = createAction(ACTION_TYPES.GET_REPAIR_SCHEDULE)
export const getDetailRepairSchedule = createAction<{ currentPlantId: string }>(ACTION_TYPES.GET_DETAIL_REPAIR_SCHEDULE)
