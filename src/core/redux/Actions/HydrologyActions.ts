import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/HydrologyActionType'

export const getHydrologyflowChart = createAction<{ currentPlantId: string; date: string }>(
  ACTION_TYPES.GET_HYDROLOGY_FLOW_CHART,
)
export const getInflowOutflow = createAction<{ hydroElectricId: string }>(ACTION_TYPES.GET_INFLOW_OUTFLOW)
export const getHydrographicChart = createAction<{ companyId: string }>(ACTION_TYPES.GET_HYDROLOGY_GRAPHIC_CHART)
export const getHydrologyPlantsParam = createAction(ACTION_TYPES.GET_HYDROLOGY_PLANTS_PARAM)
export const getUpstreamWaterLevel = createAction<{ currentPlantId: string; date: string }>(
  ACTION_TYPES.GET_UPSTREAM_WATER_LEVEL,
)
export const getInflow = createAction<{ currentPlantId: string; date: string }>(ACTION_TYPES.GET_INFLOW)
export const getOutflow = createAction<{ currentPlantId: string; date: string }>(ACTION_TYPES.GET_OUTFLOW)
export const getTurbineflow = createAction<{ currentPlantId: string; date: string }>(ACTION_TYPES.GET_TURBINE_FLOW)
export const getHydrologyPlantsInfo = createAction<{ plantId: string, date:string }>(ACTION_TYPES.GET_HYDROLOGY_PLANTS_INFO)
export const getPowerStoreInLake = createAction(ACTION_TYPES.GET_POWER_STORE_IN_LAKE)
export const getPowerStoreInLakeFactDetail = createAction<{ currentPlantId: string }>(ACTION_TYPES.GET_POWER_STORE_IN_LAKE_FACT_DETAIL)
export const getOperateWaterLevel = createAction<{ selectedMonth: string }>(ACTION_TYPES.GET_OPERATE_WATER_LEVEL)
