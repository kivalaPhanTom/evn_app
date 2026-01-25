import { api, get } from './api.service'
import { prefix_api } from '../constants/vars'
export const Service = {
  getRepairScheduleApi,
  getDetailRepairScheduleApi,
}

export const servicePattern = {
  getRepairSchedule: `${prefix_api}/repairSchedule`,
  getDetailRepairSchedule: `${prefix_api}/detailRepairSchedule_v2`,
}

function getRepairScheduleApi() {
  return api.get(`${servicePattern.getRepairSchedule}`, {})
}
function getDetailRepairScheduleApi(currentPlantId: string) {
  return api.get(`${servicePattern.getDetailRepairSchedule}`, {
    params: {
      currentPlantId: currentPlantId,
    },
  })
}