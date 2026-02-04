import { api, get } from './api.service'
import { prefix_api } from '../constants/vars'
export const Service = {
  getRepairScheduleApi,
  getDetailRepairScheduleApi,
}

export const servicePattern = {
  getRepairSchedule: `${prefix_api}/repairSchedule_v2`,
  getDetailRepairSchedule: `${prefix_api}/detailRepairSchedule_v2`,
}

function getRepairScheduleApi(year: number) {
  return api.get(`${servicePattern.getRepairSchedule}`, {
    params: {
      year: year,
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