import { api } from './api.service'
import { prefix_api } from '../constants/vars'

export const Service = {
  getProductOutputByHoursApi,
  getProductOutputOverviewApi,
  getProductOutputByDaysApi,
}
export const servicePattern = {
  getProductOutputByHours: `${prefix_api}/ProductByHours`,
  getProductOutputOverview: `${prefix_api}/ProductOutputOverview`,
  getProductOutputByDays: `${prefix_api}/Prodct_Recent_Days`,
}

function getProductOutputByHoursApi() {
  return api.get(`${servicePattern.getProductOutputByHours}`)
}

function getProductOutputOverviewApi() {
  return api.get(`${servicePattern.getProductOutputOverview}`)
}

function getProductOutputByDaysApi(dayNumber: number = 7) {
  return api.get(`${servicePattern.getProductOutputByDays}`, {
    params: { N: dayNumber }
  })
}