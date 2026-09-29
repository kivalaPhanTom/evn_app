import { createAction } from '@reduxjs/toolkit'

export const getRepairSchedule = createAction<{ year: number }>('GET_REPAIR_SCHEDULE')
export const getDetailRepairSchedule = createAction<{ currentPlantId: string; year: number }>(
  'GET_DETAIL_REPAIR_SCHEDULE',
)