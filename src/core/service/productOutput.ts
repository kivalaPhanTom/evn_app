import { api } from './api.service'
import { prefix_api } from '../constants/vars'

export const Service = {
  getProductOutputByHoursApi,
}
export const servicePattern = {
  getProductOutputByHours: `${prefix_api}/ProductByHours`,
}

function getProductOutputByHoursApi() {
  return api.get(`${servicePattern.getProductOutputByHours}`)
}
