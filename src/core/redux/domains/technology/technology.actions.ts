import { createAction } from '@reduxjs/toolkit'

export const getTechInfo = createAction<{ currentPlantId: string }>('GET_TECH_INFO')
export const getTechInfoDetail = createAction<{ currentPlantId: string }>('GET_TECH_INFO_DETAIL')