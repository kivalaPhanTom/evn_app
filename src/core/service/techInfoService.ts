import { api, get } from './api.service'
import { prefix_api } from '../constants/vars'
export const Service = {
 getTechInfoApi
}

export const servicePattern = {
  getTechInfo: `${prefix_api}/get_Specifications`,
}

function getTechInfoApi(currentPlantId: string, type?: string) {
  return api.get(`${servicePattern.getTechInfo}`, {
    params: {
      currentPlantId: currentPlantId,
      type: type || '',
    },
  })
}