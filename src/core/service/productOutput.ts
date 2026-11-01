import { api } from './api.service'
import { prefix_api, prefix_api_v2 } from '../constants/vars'
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
  getProductOutputByDaysFactDetailApi,
  getProductOutputCompareChartApi,
}
export const servicePattern = {
  getProductOutputByHours: `${prefix_api_v2}/ProductByHours`,
  getProductOutputOverview: `${prefix_api_v2}/ProductOutputOverview`,
  getProductOutputByDays: `${prefix_api_v2}/Product_Recent_Days`,
  getProductCummulativeOutput: `${prefix_api_v2}/ProductCummulativeOutput`,
  getCompareProductOutput: `${prefix_api_v2}/CompareProductOutput`,
  getProductOutputCompareChart: `${prefix_api_v2}/ProductOutput_compare_chart`,
}

function getProductOutputByHoursApi(companyId: string = '') {
  return api.get(`${servicePattern.getProductOutputByHours}`, {
    params: {
      date: dayjs().format('DD/MM/YYYY'),
      companyId: companyId
    },
  })
}

function getProductOutputOverviewApi(companyId: string = '') {
  return api.get(`${servicePattern.getProductOutputOverview}`, { params: { companyId: companyId, currentPlantId: '' } })
}

function getProductOutputByDaysApi(dayNumber: number = 7, samePeriod: number = new Date().getFullYear() - 1, companyId: string = '') {
  return api.get(`${servicePattern.getProductOutputByDays}`, {
    params: {
      nString: dayNumber,
      samePeriod: samePeriod,
      companyId: companyId
    },
  })
}

function getProductCummulativeOutputApi(params: ProductCummulativeOutputParams) {
  return api.get(`${servicePattern.getProductCummulativeOutput}`, {
    params: {
      type: params.type,
      from: params.from,
      to: params.to,
      currentPlantId: params.currentPlantId || '',
      companyId: params.companyId || '',
      ...(params.startEndOnly && { startEndOnly: true }),
    },
  })
}

function getCompareProductOutputApi(tagetDate: string, compareDate: string, currentPlantId: string, companyId: string = '') {
  return api.get(`${servicePattern.getCompareProductOutput}`, {
    params: {
      tagetDate: tagetDate,
      compareDate: compareDate,
      currentPlantId: currentPlantId,
      companyId: companyId
    },
  })
}

function getProductOutputOverviewFactDetailApi(factoryId: string = '', companyId: string = '') {
  return api.get(`${servicePattern.getProductOutputOverview}`, {
    params: { currentPlantId: factoryId, companyId: companyId },
  })
}

function getProductOutputByHoursFactDetailApi(factoryId: string = '', companyId: string = '') {
  return api.get(`${servicePattern.getProductOutputByHours}`, {
    params: {
      currentPlantId: factoryId,
      companyId: companyId,
    },
  })
}

function getProductOutputByDaysFactDetailApi(factoryId: string = '', companyId: string = '', samePeriod: number = new Date().getFullYear() - 1) {
  return api.get(`${servicePattern.getProductOutputByDays}`, {
    params: { currentPlantId: factoryId, companyId: companyId, samePeriod: samePeriod },
  })
}

function getProductOutputCompareChartApi(
  currentFromDate: string = '',
  currentToDate: string = '',
  compareFromDate: string = '',
  compareToDate: string = '',
  currentPlantId: string = '',
  companyId: string = '',
) {
  return api.get(`${servicePattern.getProductOutputCompareChart}`, {
    params: {
      currentFromDate: currentFromDate,
      currentToDate: currentToDate,
      compareFromDate: compareFromDate,
      compareToDate: compareToDate,
      currentPlantId: currentPlantId,
      companyId: companyId
    },
  })
}
