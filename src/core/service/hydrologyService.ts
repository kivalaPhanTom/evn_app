import { prefix_api } from '../constants/vars'
import { apiFormUrlEncoded, get } from './api.service'

export const Service = {
  getHydrologyGraphicChartApi,
  getHydrologyFlowApi,
  getInflowOutflowApi,
}
export const servicePattern = {
  getHydrographicChart:`${prefix_api}/hydrographic_chart`,
  getHydrologyFlow: '',
  getInflowOutflow: `${prefix_api}/InflowOutflow`,
}
function getHydrologyGraphicChartApi(companyId: string) {
 return apiFormUrlEncoded.get(
    `${servicePattern.getHydrographicChart}/${companyId}`,
  )
}
function getHydrologyFlowApi() {}

function getInflowOutflowApi(hydroElectricId: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getInflowOutflow}?hydroElectricId=${encodeURIComponent(hydroElectricId)}`,
  )
}
