import { api } from './api.service'
import { prefix_api_v2 } from '../constants/vars'

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

  getRevenueTotalExpenses: `${prefix_api_v2}/RevenueCostSummary`,
  getRevenueByPeriod: `${prefix_api_v2}/revenueByPeriod`,
  getDailyAndCumulative: `${prefix_api_v2}/dailyAndCumulative`,
  getProfitByPeriod: `${prefix_api_v2}/byPeriod`,
}

function getProfitApi(params: { companyId: string; currentPlantId?: string; date?: string }) {
  return api.get(servicePattern.getProfit, { params })
}

function getRevenueApi(params: { companyId: string; currentPlantId?: string; date?: string }) {
  return api.get(servicePattern.getRevenue, { params })
}

function getRevenuePowerPricesApi(params: { companyId: string; currentPlantId: string; date?: string }) {
  return api.get(servicePattern.getRevenuePowerPrices, { params })
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

function getDailyAndCumulativeApi(params: { companyId: string; currentPlantId?: string; date?: string }) {
  return api.get(servicePattern.getDailyAndCumulative, { params })
}

function getProfitByPeriodApi(params: { companyId: string; currentPlantId: string; startDate: string; endDate: string }) {
  return api.get(servicePattern.getProfitByPeriod, { params })
}
