import { api, get } from './api.service'
import { prefix_api_v2 } from '../constants/vars'
export const Service = {
  getRepairScheduleApi,
  getDetailRepairScheduleApi,
}

export const servicePattern = {
  getRepairSchedule: `${prefix_api_v2}/repairSchedule_v2`,
  getDetailRepairSchedule: `${prefix_api_v2}/detailRepairSchedule_v2`,
}

function getRepairScheduleApi(year: number, companyId: string) {
  return api.get(`${servicePattern.getRepairSchedule}`, {
    params: {
      year: year,
      companyId: companyId,
    },
  })
}
function getDetailRepairScheduleApi(currentPlantId: string, year: number) {
  return api.get(`${servicePattern.getDetailRepairSchedule}`, {
    params: {
      currentPlantId: currentPlantId,
      year: year,
    },
  })
}