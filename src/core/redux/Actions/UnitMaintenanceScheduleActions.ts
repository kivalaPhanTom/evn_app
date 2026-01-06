import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/UnitMaintenanceScheduleActionTypes'

export const getRepairSchedule = createAction(ACTION_TYPES.GET_REPAIR_SCHEDULE)
