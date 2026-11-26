import { api } from './api.service'
import { prefix_api_v2 } from '../constants/vars'
import type { TechInfoItem } from '../redux/domains/technology/technology.slice'

interface SpecificationsResponse {
  plantCode: string
  plantName: string
  specifications: TechInfoItem[]
}

export const Service = {
 getTechInfoApi
}

export const servicePattern = {
  getTechInfo: `${prefix_api_v2}/get_Specifications`,
}

function getTechInfoApi(currentPlantId: string, type: 'summary' | 'detail' = 'summary') {
  return api.get<SpecificationsResponse>(servicePattern.getTechInfo, {
    params: {
      currentPlantId,
      type,
    },
  })
}
