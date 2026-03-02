import { prefix_api } from '../constants/vars'
import { apiFormUrlEncoded, api, get } from './api.service'

export const Service = {
  getHydrologyGraphicChartApi,
  getHydrologyFlowApi,
  getInflowOutflowApi,
  getHydrologyPlantsParamApi,
  getHydrologyPlantsInfoApi,
  getUpstreamWaterLevelApi,
  getInflowApi,
  getOutflowApi,
  getTurbineFlowApi,
  getPowerStoreInLake,
  getOperateWaterLevel,
  getPowerStoreInLakeFactDetail,
}
export const servicePattern = {
  getHydrographicChart: `${prefix_api}/hydrographic_chart`,
  getHydrologyFlow: `${prefix_api}/FlowDiagram`,
  getInflowOutflow: `${prefix_api}/InflowOutflow_v2`,
  getHydrologyPlantsParam: `${prefix_api}/hydrologyplant_detail`,
  getHydrologyPlantsInfo: `${prefix_api}/HydrologyPlantInformation`,
  getUpstreamWaterLevel: `${prefix_api}/GetUpstreamWaterLevel`,
  getInflow: `${prefix_api}/getInflow`,
  getOutflow: `${prefix_api}/getOutflow`,
  getTurbineflow: `${prefix_api}/getTurbineflow`,
  getPowerStoreInLake: `${prefix_api}/PowerStoreInLake`,
  getPowerStoreInLakeFactDetail: `${prefix_api}/PowerStoreInLakeOfFactory`,
  getOperateWaterLevel: `${prefix_api}/GetOperateWaterLevel`,
}
function getHydrologyGraphicChartApi(companyId: string, type: string) {
  return apiFormUrlEncoded.get(`${servicePattern.getHydrographicChart}/${companyId}`, {
    params: {
      type: type ? type : null,
    }
  })
}
function getHydrologyFlowApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(`${servicePattern.getHydrologyFlow}?currentPlantId=${currentPlantId}&date=${date}`)
}

function getInflowOutflowApi(hydroElectricId: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getInflowOutflow}?currentPlantId=${encodeURIComponent(hydroElectricId)}`,
  )
}
function getHydrologyPlantsParamApi(currentPlantId?: string) {
  const params: { currentPlantId?: string } = {}
  if (currentPlantId) {
    params.currentPlantId = currentPlantId
  }
  return api.get(`${servicePattern.getHydrologyPlantsParam}`, {
    params: params
  })
}

function getHydrologyPlantsInfoApi(plantId: string, date: string) {
  return api.get(`${servicePattern.getHydrologyPlantsInfo}?currentPlantId=${plantId}&date=${date}`)
}

function getUpstreamWaterLevelApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getUpstreamWaterLevel}?currentPlantId=${encodeURIComponent(currentPlantId)}&date=${encodeURIComponent(date)}`,
  )
}
function getInflowApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getInflow}?currentPlantId=${encodeURIComponent(currentPlantId)}&date=${encodeURIComponent(date)}`,
  )
}
function getOutflowApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getOutflow}?currentPlantId=${encodeURIComponent(currentPlantId)}&date=${encodeURIComponent(date)}`,
  )
}
function getTurbineFlowApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getTurbineflow}?currentPlantId=${encodeURIComponent(currentPlantId)}&date=${encodeURIComponent(date)}`,
  )
}
function getPowerStoreInLake() {
  return apiFormUrlEncoded.get(
    `${servicePattern.getPowerStoreInLake}`,
  )
}

function getPowerStoreInLakeFactDetail(currentPlantId: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getPowerStoreInLakeFactDetail}`, {
    params: {
      currentPlantId: currentPlantId,
    }
  }
  )
}

function getOperateWaterLevel(selectedMonth: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getOperateWaterLevel}?selectedMonth=${selectedMonth}`,
  )
}


