import { prefix_api } from '../constants/vars'
import { apiFormUrlEncoded, api } from './api.service'

export const Service = {
  getHydrologyGraphicChartApi,
  getHydrologyFlowApi,
  getInflowOutflowApi,
  getHydrologyPlantsParamApi,
  getHydrologyPlantsInfoApi,
}
export const servicePattern = {
  getHydrographicChart: `${prefix_api}/hydrographic_chart`,
  getHydrologyFlow: `${prefix_api}/FlowDiagram`,
  getInflowOutflow: `${prefix_api}/InflowOutflow`,
  getHydrologyPlantsParam: `${prefix_api}/hydrologyplant_parameters`,
  getHydrologyPlantsInfo: `${prefix_api}/HydrologyPlantInformation`,
}
function getHydrologyGraphicChartApi(companyId: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getHydrographicChart}/${companyId}`,
  )
}
function getHydrologyFlowApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getHydrologyFlow}?currentPlantId=${currentPlantId}&date=${date}`,
  )
}

function getInflowOutflowApi(hydroElectricId: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getInflowOutflow}?hydroElectricId=${encodeURIComponent(hydroElectricId)}`,
  )
}
function getHydrologyPlantsParamApi() {
  return api.get(`${servicePattern.getHydrologyPlantsParam}`)
}

function getHydrologyPlantsInfoApi(plantId: string) {
  return api.get(`${servicePattern.getHydrologyPlantsInfo}?id=${plantId}`)
}
