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
}
export const servicePattern = {
  getHydrographicChart: `${prefix_api}/hydrographic_chart`,
  getHydrologyFlow: `${prefix_api}/FlowDiagram`,
  getInflowOutflow: `${prefix_api}/InflowOutflow`,
  getHydrologyPlantsParam: `${prefix_api}/hydrologyplant_parameters`,
  getHydrologyPlantsInfo: `${prefix_api}/HydrologyPlantInformation`,
  getUpstreamWaterLevel: `${prefix_api}/GetUpstreamWaterLevel`,
  getInflow: `${prefix_api}/getInflow`,
  getOutflow: `${prefix_api}/getOutflow`,
  getTurbineflow: `${prefix_api}/getTurbineflow`,
  getPowerStoreInLake: `${prefix_api}/PowerStoreInLake`,
}
function getHydrologyGraphicChartApi(companyId: string) {
  return apiFormUrlEncoded.get(`${servicePattern.getHydrographicChart}/${companyId}`)
}
function getHydrologyFlowApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(`${servicePattern.getHydrologyFlow}?currentPlantId=${currentPlantId}&date=${date}`)
}

function getInflowOutflowApi(hydroElectricId: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getInflowOutflow}?hydroElectricId=${encodeURIComponent(hydroElectricId)}`,
  )
}
function getHydrologyPlantsParamApi() {
  return api.get(`${servicePattern.getHydrologyPlantsParam}`)
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


