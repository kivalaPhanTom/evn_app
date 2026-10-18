import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Company, Plant } from '@/core/service/companyPlantService'

type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

interface CompanyPlantState {
  companies: Company[]
  companiesStatus: LoadStatus
  companiesError: string | null
  plants: Plant[]
  plantsStatus: LoadStatus
  plantsError: string | null
  selectedCompanyId: string | null
}

const initialState: CompanyPlantState = {
  companies: [],
  companiesStatus: 'idle',
  companiesError: null,
  plants: [],
  plantsStatus: 'idle',
  plantsError: null,
  selectedCompanyId: null,
}

const companyPlantSlice = createSlice({
  name: 'companyPlant',
  initialState,
  reducers: {
    companiesLoading: (state) => {
      state.companiesStatus = 'loading'
      state.companiesError = null
    },
    companiesLoaded: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload
      state.companiesStatus = 'succeeded'
      state.companiesError = null
    },
    companiesFailed: (state, action: PayloadAction<string>) => {
      state.companies = []
      state.companiesStatus = 'failed'
      state.companiesError = action.payload
    },
    plantsLoading: (state, action: PayloadAction<string>) => {
      state.selectedCompanyId = action.payload
      state.plants = []
      state.plantsStatus = 'loading'
      state.plantsError = null
    },
    plantsLoaded: (state, action: PayloadAction<Plant[]>) => {
      state.plants = action.payload
      state.plantsStatus = 'succeeded'
      state.plantsError = null
    },
    plantsFailed: (state, action: PayloadAction<string>) => {
      state.plants = []
      state.plantsStatus = 'failed'
      state.plantsError = action.payload
    },
    clearCompanyPlant: () => initialState,
  },
})

export const {
  companiesLoading,
  companiesLoaded,
  companiesFailed,
  plantsLoading,
  plantsLoaded,
  plantsFailed,
  clearCompanyPlant,
} = companyPlantSlice.actions
export default companyPlantSlice.reducer
