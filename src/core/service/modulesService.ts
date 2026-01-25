import { api } from './api.service'
import { prefix_api } from '../constants/vars'

export const Service = {
    getModulesApi,
}
export const servicePattern = {
  getModules: `${prefix_api}/Get_Modules`,
}
function getModulesApi() {
  return api.get(`${servicePattern.getModules}`)
}
