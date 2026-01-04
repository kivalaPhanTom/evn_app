import { api } from './api.service'
import { prefix_api } from '../constants/vars'

export const Service = {
  getProfitApi,
  getRevenueApi,
  getRevenuePowerPricesApi,
  getRevenueTotalExpensesApi
}
export const servicePattern = {
  getProfit: `${prefix_api}/profit`,
  getRevenue: `${prefix_api}/revenue`,

  getRevenuePowerPrices: `${prefix_api}/electricityPrices`,

  getRevenueTotalExpenses: `${prefix_api}/revenueCostSummary`,
}

function getProfitApi(currentPlantId: string = '') {
  return api.get(`${servicePattern.getProfit}`, {
    params: {
      currentPlantId: currentPlantId,
    }
  })
}

function getRevenueApi(currentPlantId: string = '') {
  return api.get(`${servicePattern.getRevenue}`, {
    params: {
      currentPlantId: currentPlantId,
    }
  })
}

function getRevenuePowerPricesApi(currentPlantId: string, date: string) {
  return api.get(`${servicePattern.getRevenuePowerPrices}`,{
    params: {
      currentPlantId: currentPlantId,
      date: date,
    }
  })
}

function getRevenueTotalExpensesApi(date: string) {
  return api.get(`${servicePattern.getRevenueTotalExpenses}`, {
    params: {
      date: date,
    }
  })
}