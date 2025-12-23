import { api } from './api.service'
import { prefix_api } from '../constants/vars'
import { ProductCummulativeOutputParams } from '../model/productOutput.request'
import dayjs from 'dayjs'

export const Service = {
  getProductOutputByHoursApi,
  getProductOutputOverviewApi,
  getProductOutputByDaysApi,
  getProductCummulativeOutputApi,
  getCompareProductOutputApi
}
export const servicePattern = {
  getProductOutputByHours: `${prefix_api}/ProductByHours`,
  getProductOutputOverview: `${prefix_api}/ProductOutputOverview`,
  getProductOutputByDays: `${prefix_api}/Product_Recent_Days`,
  getProductCummulativeOutput: `${prefix_api}/ProductCummulativeOutput`,
  getCompareProductOutput: `${prefix_api}/CompareProductOutput`
}

function getProductOutputByHoursApi() {
  return api.get(`${servicePattern.getProductOutputByHours}`, {
    params: {
      date: dayjs().format('DD/MM/YYYY')
    }
  })
}

function getProductOutputOverviewApi() {
  return api.get(`${servicePattern.getProductOutputOverview}`, { params: { currentPlantId: '' } })
}

function getProductOutputByDaysApi(dayNumber: number = 7) {
  return api.get(`${servicePattern.getProductOutputByDays}`, {
    params: { N: dayNumber }
  })
}

function getProductCummulativeOutputApi(params: ProductCummulativeOutputParams) {
  return api.get(`${servicePattern.getProductCummulativeOutput}`, {
    params: {
      type: params.type,
      from: params.from,
      to: params.to
    }
  })
}

function getCompareProductOutputApi(tagetDate: string, compareDate: string) {
  return api.get(`${servicePattern.getCompareProductOutput}`, {
    params: {
      tagetDate: tagetDate,
      compareDate: compareDate
    }
  })
}
