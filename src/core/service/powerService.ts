import { api } from './api.service'
import { prefix_api } from '../constants/vars'

export const Service = {
  getPowerOverviewApi,
  getPowerByTimeApi,
}
export const servicePattern = {
  getPowerOverview: `${prefix_api}/overview`,
  getPowerByTime: `${prefix_api}/power_by_time`,
}

function getPowerOverviewApi() {
  return api.get(`${servicePattern.getPowerOverview}`)
}

function getPowerByTimeApi() {
  return api.get(`${servicePattern.getPowerByTime}`)
}
