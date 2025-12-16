import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/HydrologyActionType'

export const getHydrologyflowChart = createAction<{currentPlantId:string, date:string}>(ACTION_TYPES.GET_HYDROLOGY_FLOW_CHART)
export const getInflowOutflow = createAction<{ hydroElectricId: string }>(ACTION_TYPES.GET_INFLOW_OUTFLOW)
export const getHydrographicChart = createAction<{ companyId: string }>(ACTION_TYPES.GET_HYDROLOGY_GRAPHIC_CHART)
export const getHydrologyPlantsParam = createAction(ACTION_TYPES.GET_HYDROLOGY_PLANTS_PARAM)
