import { api, get } from './api.service'
import { prefix_api_v2 } from '../constants/vars'
export const Service = {
 getLegalApi,
 getExistenceApi
}

export const servicePattern = {
  getLegal: `${prefix_api_v2}/get_Legal`,
  getExistence: `${prefix_api_v2}/get_Existence`,
}

function getLegalApi(companyId: string = '') {
  return api.get(`${servicePattern.getLegal}`, { params: { companyId: companyId } })
}

function getExistenceApi(currentPlantId: string = '') {
  return api.get(`${servicePattern.getExistence}`, {
    params: { currentPlantId: currentPlantId }
  })
}