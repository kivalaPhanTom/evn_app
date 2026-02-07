import { api, get } from './api.service'
import { prefix_api } from '../constants/vars'
export const Service = {
 getLegalApi,
 getExistenceApi
}

export const servicePattern = {
  getLegal: `${prefix_api}/get_Legal`,
  getExistence: `${prefix_api}/get_Existence`,
}

function getLegalApi() {
  return api.get(`${servicePattern.getLegal}`)
}

function getExistenceApi(currentPlantId: string) {
  return api.get(`${servicePattern.getExistence}?currentPlantId=${currentPlantId}`)
}