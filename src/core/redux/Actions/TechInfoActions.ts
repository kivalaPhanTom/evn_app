import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/TechInfoType'

export const getTechInfo = createAction<{ currentPlantId: string }>(ACTION_TYPES.GET_TECH_INFO)
export const getTechInfoDetail = createAction<{ currentPlantId: string }>(ACTION_TYPES.GET_TECH_INFO_DETAIL)
