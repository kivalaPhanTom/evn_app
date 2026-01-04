import { api, get } from './api.service'
import { prefix_api } from '../constants/vars'

export const Service = {
  getProfitApi,
  getRevenueApi,
  getRevenuePowerPricesApi,
  getRevenueTotalExpensesApi,
  getRevenueByPeriodApi,
  getDailyAndCumulativeApi,
}
export const servicePattern = {
  getProfit: `${prefix_api}/profit`,
  getRevenue: `${prefix_api}/revenue`,

  getRevenuePowerPrices: `${prefix_api}/electricityPrices`,

  getRevenueTotalExpenses: `${prefix_api}/revenueCostSummary`,
  getRevenueByPeriod: `${prefix_api}/revenueByPeriod`,
  getDailyAndCumulative: `${prefix_api}/dailyAndCumulative`,
}

function getProfitApi() {
  return api.get(`${servicePattern.getProfit}`)
}

function getRevenueApi() {
  return api.get(`${servicePattern.getRevenue}`)
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
    }
  })
}