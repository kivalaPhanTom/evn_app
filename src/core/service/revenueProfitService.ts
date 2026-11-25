import { api, get } from './api.service'
import { prefix_api, prefix_api_v2 } from '../constants/vars'

export const Service = {
  getProfitApi,
  getRevenueApi,
  getRevenuePowerPricesApi,
  getRevenueTotalExpensesApi,
  getRevenueByPeriodApi,
  getDailyAndCumulativeApi,
  getProfitByPeriodApi,
}
export const servicePattern = {
  getProfit: `${prefix_api_v2}/profit`,
  getRevenue: `${prefix_api_v2}/revenue`,

  getRevenuePowerPrices: `${prefix_api_v2}/electricityPrices`,

  getRevenueTotalExpenses: `${prefix_api}/revenueCostSummary`,
  getRevenueByPeriod: `${prefix_api}/revenueByPeriod`,
  getDailyAndCumulative: `${prefix_api_v2}/dailyAndCumulative`,
  getProfitByPeriod: `${prefix_api_v2}/byPeriod`,
}

function getProfitApi(currentPlantId: string = '') {
  return api.get(`${servicePattern.getProfit}`, {
    params: {
      currentPlantId: currentPlantId,
    },
  })
}

function getRevenueApi(currentPlantId: string = '') {
  return api.get(`${servicePattern.getRevenue}`, {
    params: {
      currentPlantId: currentPlantId,
    },
  })
}

function getRevenuePowerPricesApi(currentPlantId: string, date: string) {
  return api.get(`${servicePattern.getRevenuePowerPrices}`, {
    params: {
      currentPlantId: currentPlantId,
      date: date,
    },
  })
}

function getRevenueTotalExpensesApi(date: string) {
  return api.get(`${servicePattern.getRevenueTotalExpenses}`, {
    params: {
      date: date,
    },
  })
}

function getRevenueByPeriodApi(startDate: string, endDate: string, type: string) {
  return api.get(`${servicePattern.getRevenueByPeriod}`, {
    params: {
      startDate: startDate,
      endDate: endDate,
      type: type,
    },
  })
}

function getDailyAndCumulativeApi(currentPlantId: string, date: string) {
  return api.get(`${servicePattern.getDailyAndCumulative}`, {
    params: {
      currentPlantId: currentPlantId,
      date: date,
    },
  })
}

function getProfitByPeriodApi(startDate: string, endDate: string, currentPlantId: string) {
  return api.get(`${servicePattern.getProfitByPeriod}`, {
    params: {
      startDate: startDate,
      endDate: endDate,
      currentPlantId: currentPlantId,
    },
  })
}
