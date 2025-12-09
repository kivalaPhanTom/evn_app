import { prefix_api } from '../constants/vars'
import { apiFormUrlEncoded, get } from './api.service'

export const Service = {
  getHydrologyFlowApi,
  getInflowOutflowApi,
}
export const servicePattern = {
  getHydrologyFlow: '',
  getInflowOutflow: `${prefix_api}/InflowOutflow`,
}

function getHydrologyFlowApi() {}

function getInflowOutflowApi(hydroElectricId: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getInflowOutflow}?hydroElectricId=${encodeURIComponent(hydroElectricId)}`,
  )
}
