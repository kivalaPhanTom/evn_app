import { prefix_api } from '../constants/vars'
import { apiFormUrlEncoded, api, get } from './api.service'

export const Service = {
  getHydrologyGraphicChartApi,
  getHydrologyFlowApi,
  getInflowOutflowApi,
  getHydrologyPlantsParamApi,
  getUpstreamWaterLevelApi,
  getInflowApi,
  getOutflowApi,
  getTurbineFlowApi,
}
export const servicePattern = {
  getHydrographicChart: `${prefix_api}/hydrographic_chart`,
  getHydrologyFlow: `${prefix_api}/FlowDiagram`,
  getInflowOutflow: `${prefix_api}/InflowOutflow`,
  getHydrologyPlantsParam: `${prefix_api}/hydrologyplant_parameters`,
  getUpstreamWaterLevel: `${prefix_api}/GetUpstreamWaterLevel`,
  getInflow: `${prefix_api}/getInflow`,
  getOutflow: `${prefix_api}/getOutflow`,
  getTurbineflow: `${prefix_api}/getTurbineflow`,
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
