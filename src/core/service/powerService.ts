import { api } from './api.service'
import { prefix_api } from '../constants/vars'

export const Service = {
  getPowerOverviewApi,
  getPowerByTimeApi,
  getPowerByDaysApi,
  getComparePowerApi,
  getPowerOverviewFactDetailApi,
  getPowerByDaysFactDetailApi
}
export const servicePattern = {
  getPowerOverview: `${prefix_api}/overview`,
  getPowerByTime: `${prefix_api}/power_by_time`,
  getPowerByDays: `${prefix_api}/Recent_days`,
  getComparePower: `${prefix_api}/ComparePower`,
}

function getPowerOverviewApi() {
  return api.get(`${servicePattern.getPowerOverview}`)
}

function getPowerByTimeApi() {
  return api.get(`${servicePattern.getPowerByTime}`)
}

function getPowerByDaysApi(dayNumber: number = 7) {
  return api.get(`${servicePattern.getPowerByDays}`, {
    params: { N: dayNumber },
  })
}

function getComparePowerApi(tagetDate: string = '', compareDate: string = '') {
  const url = `${servicePattern.getComparePower}?tagetDate=${encodeURIComponent(tagetDate)}&compareDate=${encodeURIComponent(compareDate)}`
  return api.get(url)
}

function getPowerOverviewFactDetailApi(factoryId: string = '') {
  return api.get(`${servicePattern.getPowerOverview}?currentPlantId=${factoryId}`)
}

function getPowerByDaysFactDetailApi(factoryId: string = '') {
  return api.get(`${servicePattern.getPowerByDays}`, {
    params: { currentPlantId: factoryId },
  })
}