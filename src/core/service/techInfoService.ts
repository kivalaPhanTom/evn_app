import { api, get } from './api.service'
import { prefix_api } from '../constants/vars'
export const Service = {
 getTechInfoApi
}

export const servicePattern = {
  getTechInfo: ``,
}

function getTechInfoApi(currentPlantId: string) {
  return api.get(`${servicePattern.getTechInfo}`, {
    params: {
      currentPlantId: currentPlantId,
    },
  })
}