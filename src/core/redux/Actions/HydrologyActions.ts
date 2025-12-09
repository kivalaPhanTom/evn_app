import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/HydrologyActionType'

export const getHydrologyflowChart = createAction(ACTION_TYPES.GET_HYDROLOGY_FLOW_CHART)
export const getInflowOutflow = createAction<{ hydroElectricId: string }>(ACTION_TYPES.GET_INFLOW_OUTFLOW)
