import { prefix_api_v2 } from '../constants/vars'
import { api } from './api.service'

export interface Company {
  companyId: string
  companyName: string
  abbreviation: string
  location: string
  logoUrl: string | null
  plantCount: number
}

export interface Plant {
  plantId: number
  companyId: string
  plantName: string
  abbreviation: string
  symbol: string
  maxLevel: number
  referenceLevel: number
  currentLevel: number
  previousLevel: number
  status: 0 | 1
  hasHydrology: boolean
  hasRevenue: boolean
  hasProfit: boolean
  isRealtime: boolean
  color: string
  regulationType: 'hourly' | 'daily'
}

interface PlantsResponse {
  data: { plants: Plant[] }
}

// Chuyển sang false khi backend triển khai hai endpoint này.
const useMockApi = false

export const servicePattern = {
  getCompanies: `${prefix_api_v2}/GetCompanies`,
  getPlants: `${prefix_api_v2}/GetPlants`,
}

const mockCompanies: Company[] = [
  {
    companyId: '1',
    companyName: 'Công ty Thủy điện Buôn Kuốp',
    abbreviation: 'BKP',
    location: 'Đắk Lắk, Việt Nam',
    logoUrl: 'https://mygenco3-api.genco3.com/files/bkp-logo.png',
    plantCount: 3,
  },
  {
    companyId: '2',
    companyName: 'Công ty Thủy điện Ialy',
    abbreviation: 'IAL',
    location: 'Gia Lai, Việt Nam',
    logoUrl: null,
    plantCount: 3,
  },
]

const mockPlants: Plant[] = [
  {
    plantId: 1,
    companyId: '1',
    plantName: 'Buôn Tua Srah',
    abbreviation: 'BTS',
    symbol: 'BTS',
    maxLevel: 700,
    referenceLevel: 400,
    currentLevel: 420,
    previousLevel: 410,
    status: 1,
    hasHydrology: true,
    hasRevenue: true,
    hasProfit: true,
    isRealtime: true,
    color: '#fb923c',
    regulationType: 'hourly',
  },
  {
    plantId: 2,
    companyId: '1',
    plantName: 'Buôn Kuốp',
    abbreviation: 'BK',
    symbol: 'BK',
    maxLevel: 700,
    referenceLevel: 400,
    currentLevel: 300,
    previousLevel: 295,
    status: 1,
    hasHydrology: true,
    hasRevenue: true,
    hasProfit: true,
    isRealtime: true,
    color: '#4ade80',
    regulationType: 'hourly',
  },
  {
    plantId: 3,
    companyId: '1',
    plantName: 'Srepok 3',
    abbreviation: 'SP3',
    symbol: 'SP3',
    maxLevel: 700,
    referenceLevel: 400,
    currentLevel: 600,
    previousLevel: 580,
    status: 0,
    hasHydrology: true,
    hasRevenue: true,
    hasProfit: true,
    isRealtime: true,
    color: '#c084fc',
    regulationType: 'daily',
  },
  {
    plantId: 4,
    companyId: '2',
    plantName: 'Ialy',
    abbreviation: 'IAL',
    symbol: 'IAL',
    maxLevel: 515,
    referenceLevel: 490,
    currentLevel: 502,
    previousLevel: 500,
    status: 1,
    hasHydrology: true,
    hasRevenue: false,
    hasProfit: false,
    isRealtime: true,
    color: '#38bdf8',
    regulationType: 'daily',
  },
  {
    plantId: 5,
    companyId: '2',
    plantName: 'Sê San 3',
    abbreviation: 'SS3',
    symbol: 'SS3',
    maxLevel: 308,
    referenceLevel: 300,
    currentLevel: 305,
    previousLevel: 304,
    status: 1,
    hasHydrology: true,
    hasRevenue: false,
    hasProfit: false,
    isRealtime: false,
    color: '#fbbf24',
    regulationType: 'hourly',
  },
  {
    plantId: 6,
    companyId: '2',
    plantName: 'Plei Krông',
    abbreviation: 'PK',
    symbol: 'PK',
    maxLevel: 570,
    referenceLevel: 550,
    currentLevel: 558,
    previousLevel: 556,
    status: 0,
    hasHydrology: true,
    hasRevenue: false,
    hasProfit: false,
    isRealtime: false,
    color: '#a78bfa',
    regulationType: 'daily',
  },
]

async function getCompaniesApi(username: string) {
  if (useMockApi) {
    const response = { status: 200, data: mockCompanies }
    console.log('[GetCompanies][mock]\n' + JSON.stringify({ username, ...response }, null, 2))
    return response
  }
  return api.get<Company[]>(servicePattern.getCompanies, { params: { username } })
}

async function getPlantsApi(companyId: string) {
  if (typeof companyId !== 'string' || !companyId.trim()) {
    throw new Error('INVALID_PARAM: companyId không hợp lệ')
  }
  if (useMockApi === false) {
    // if (!mockCompanies.some((company) => company.companyId === companyId)) {
    //   throw new Error('COMPANY_NOT_FOUND')
    // }
    const response = {
      status: 200,
      data: { data: { plants: mockPlants.filter((plant) => plant.companyId === companyId) } },
    }
    // console.log('[GetPlants][mock]\n' + JSON.stringify({ companyId, ...response }, null, 2))
    return response
  }
  return api.get<PlantsResponse>(servicePattern.getPlants, { params: { companyId } })
}

export const Service = { getCompaniesApi, getPlantsApi }
