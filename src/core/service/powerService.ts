import { api } from './api.service'
import { prefix_api } from '../constants/vars'

export const Service = {
  getPowerOverviewApi,
  getPowerByTimeApi,
  getPowerByDaysApi,
  getComparePowerApi,
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
  console.log('Calling getComparePowerApi with params:', { tagetDate, compareDate })
  const url = `${servicePattern.getComparePower}?tagetDate=${encodeURIComponent(tagetDate)}&compareDate=${encodeURIComponent(compareDate)}`
  console.log('Request URL:', url)
  return api.get(url)
}
