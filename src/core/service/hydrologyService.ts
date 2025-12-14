import { prefix_api } from '../constants/vars'
import { apiFormUrlEncoded, api } from './api.service'

export const Service = {
  getHydrologyFlowApi,
  getInflowOutflowApi,
  getHydrologyPlantsParamApi,
}
export const servicePattern = {
  getHydrologyFlow: '',
  getInflowOutflow: `${prefix_api}/InflowOutflow`,
  getHydrologyPlantsParam: `${prefix_api}/hydrologyplant_parameters`,
}

function getHydrologyFlowApi() {}

function getInflowOutflowApi(hydroElectricId: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getInflowOutflow}?hydroElectricId=${encodeURIComponent(hydroElectricId)}`,
  )
}
function getHydrologyPlantsParamApi() {
  return api.get(`${servicePattern.getHydrologyPlantsParam}`)
}
