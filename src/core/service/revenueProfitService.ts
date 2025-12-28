import { api } from './api.service'
import { prefix_api } from '../constants/vars'

export const Service = {
  getProfitApi,
  getRevenueApi,
}
export const servicePattern = {
  getProfit: `${prefix_api}/profit`,
  getRevenue: `${prefix_api}/revenue`,
}

function getProfitApi() {
  return api.get(`${servicePattern.getProfit}`)
}

function getRevenueApi() {
  return api.get(`${servicePattern.getRevenue}`)
}
