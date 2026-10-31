import { api } from './api.service'
import { prefix_api_v2 } from '../constants/vars'

export const Service = {
  getModulesApi,
}
export const servicePattern = {
  getModules: `${prefix_api_v2}/Get_Modules`,
}
function getModulesApi(companyId: string, username: string) {
  return api.get(`${servicePattern.getModules}`, { params: { companyId, username } })
}
