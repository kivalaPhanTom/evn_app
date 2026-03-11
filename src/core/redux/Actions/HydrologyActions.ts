import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/HydrologyActionType'

export const getHydrologyflowChart = createAction<{ currentPlantId: string; date: string }>(
  ACTION_TYPES.GET_HYDROLOGY_FLOW_CHART,
)
export const getInflowOutflow = createAction<{ hydroElectricId: string }>(ACTION_TYPES.GET_INFLOW_OUTFLOW)
export const getHydrographicChart = createAction<{ companyId: string, type: string }>(ACTION_TYPES.GET_HYDROLOGY_GRAPHIC_CHART)
export const getHydrologyPlantsParam = createAction<{ currentPlantId?: string }>(ACTION_TYPES.GET_HYDROLOGY_PLANTS_PARAM)
export const getUpstreamWaterLevel = createAction<{ currentPlantId: string; date: string }>(
  ACTION_TYPES.GET_UPSTREAM_WATER_LEVEL,
)
export const getInflow = createAction<{ currentPlantId: string; date: string }>(ACTION_TYPES.GET_INFLOW)
export const getOutflow = createAction<{ currentPlantId: string; date: string }>(ACTION_TYPES.GET_OUTFLOW)
export const getTurbineflow = createAction<{ currentPlantId: string; date: string }>(ACTION_TYPES.GET_TURBINE_FLOW)
export const getHydrologyPlantsInfo = createAction<{ plantId: string, date: string }>(ACTION_TYPES.GET_HYDROLOGY_PLANTS_INFO)
export const getPowerStoreInLake = createAction(ACTION_TYPES.GET_POWER_STORE_IN_LAKE)
export const getPowerStoreInLakeFactDetail = createAction<{ currentPlantId: string }>(ACTION_TYPES.GET_POWER_STORE_IN_LAKE_FACT_DETAIL)
export const getOperateWaterLevel = createAction<{ selectedMonth: string }>(ACTION_TYPES.GET_OPERATE_WATER_LEVEL)


export const getUpstreamWaterLevel_2 = createAction<{ currentPlantId: string; currentDate: string, compareDate: string, type: string }>(ACTION_TYPES.GET_UPSTREAM_WATER_LEVEL_2)
export const getUpstreamWaterLevel_3 = createAction<{ currentPlantId: string; currentFromDate: string, currentToDate: string, compareFromDate: string, compareToDate: string, type: string }>(ACTION_TYPES.GET_UPSTREAM_WATER_LEVEL_3)
export const getInflow2 = createAction<{ currentPlantId: string; currentDate: string, compareDate: string, type: string }>(ACTION_TYPES.GET_INFLOW_2)
export const getInflow3 = createAction<{ currentPlantId: string; currentFromDate: string, currentToDate: string, compareFromDate: string, compareToDate: string, type: string }>(ACTION_TYPES.GET_INFLOW_3)
export const getOutflow2 = createAction<{ currentPlantId: string; currentDate: string, compareDate: string, type: string }>(ACTION_TYPES.GET_OUTFLOW_2)
export const getOutflow3 = createAction<{ currentPlantId: string; currentFromDate: string, currentToDate: string, compareFromDate: string, compareToDate: string, type: string }>(ACTION_TYPES.GET_OUTFLOW_3)
export const getTurbineflow2 = createAction<{ currentPlantId: string; currentDate: string, compareDate: string, type: string }>(ACTION_TYPES.GET_TURBINE_FLOW_2)
export const getTurbineflow3 = createAction<{ currentPlantId: string; currentFromDate: string, currentToDate: string, compareFromDate: string, compareToDate: string, type: string }>(ACTION_TYPES.GET_TURBINE_FLOW_3)