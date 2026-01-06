import { api, get } from './api.service'
import { prefix_api } from '../constants/vars'
export const Service = {
  getRepairScheduleApi,
}

export const servicePattern = {
  getRepairSchedule: `${prefix_api}/repairSchedule`,
}

function getRepairScheduleApi() {
  return api.get(`${servicePattern.getRepairSchedule}`, {})
}
