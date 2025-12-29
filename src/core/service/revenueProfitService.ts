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

  getRevenuePowerPrices: `${prefix_api}/revenue`,

  getRevenueTotalExpenses: `${prefix_api}/revenue`,
}

function getProfitApi() {
  return api.get(`${servicePattern.getProfit}`)
}

function getRevenueApi() {
  return api.get(`${servicePattern.getRevenuePowerPrices}`)
}

function getRevenuePowerPricesApi(currentPlantId: string, date: string) {
  return api.get(`${servicePattern.getRevenueTotalExpenses}`)
}

function getRevenueTotalExpensesApi(currentPlantId: string, date: string) {
  return api.get(`${servicePattern.getRevenue}`)
}