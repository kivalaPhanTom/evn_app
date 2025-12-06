import { api } from './api.service'
import { prefix_api } from '../constants/vars'

export const Service = {
  getPowerOverviewApi,
  getPowerByTimeApi,
  getPowerByDaysApi
}
export const servicePattern = {
  getPowerOverview: `${prefix_api}/overview`,
  getPowerByTime: `${prefix_api}/power_by_time`,
  getPowerByDays: `${prefix_api}/Recent_days`,
}

function getPowerOverviewApi() {
  return api.get(`${servicePattern.getPowerOverview}`)
}

function getPowerByTimeApi() {
  return api.get(`${servicePattern.getPowerByTime}`)
}

function getPowerByDaysApi(dayNumber: number = 7) {
  return api.get(`${servicePattern.getPowerByDays}`, {
    params: { N: dayNumber }
  })
}