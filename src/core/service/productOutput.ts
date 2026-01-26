import { api } from './api.service'
import { prefix_api } from '../constants/vars'
import { ProductCummulativeOutputParams } from '../model/productOutput.request'
import dayjs from 'dayjs'
import { current } from '@reduxjs/toolkit'

export const Service = {
  getProductOutputByHoursApi,
  getProductOutputOverviewApi,
  getProductOutputByDaysApi,
  getProductCummulativeOutputApi,
  getCompareProductOutputApi,
  getProductOutputOverviewFactDetailApi,
  getProductOutputByHoursFactDetailApi,
  getProductOutputByDaysFactDetailApi
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

function getProductOutputByDaysApi(dayNumber: number = 7, samePeriod: number = new Date().getFullYear() - 1) {
  return api.get(`${servicePattern.getProductOutputByDays}`, {
    params: { nString: dayNumber, samePeriod: samePeriod }
  })
}

function getProductCummulativeOutputApi(params: ProductCummulativeOutputParams) {
  return api.get(`${servicePattern.getProductCummulativeOutput}`, {
    params: {
      type: params.type,
      from: params.from,
      to: params.to,
      currentPlantId: params.currentPlantId || ''
    }
  })
}

function getCompareProductOutputApi(tagetDate: string, compareDate: string, currentPlantId: string) {
  return api.get(`${servicePattern.getCompareProductOutput}`, {
    params: {
      tagetDate: tagetDate,
      compareDate: compareDate,
      currentPlantId: currentPlantId
    }
  })
}

function getProductOutputOverviewFactDetailApi(factoryId: string = '') {
  return api.get(`${servicePattern.getProductOutputOverview}`, {
    params: { currentPlantId: factoryId },
  })
}

function getProductOutputByHoursFactDetailApi(factoryId: string = '') {
  return api.get(`${servicePattern.getProductOutputByHours}`, {
    params: {
      currentPlantId: factoryId
    }
  })
}

function getProductOutputByDaysFactDetailApi(factoryId: string = '') {
  return api.get(`${servicePattern.getProductOutputByDays}`, {
    params: { currentPlantId: factoryId },
  })
}