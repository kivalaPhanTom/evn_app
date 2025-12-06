import { BarGroup } from '@/core/types'
import { createSlice } from '@reduxjs/toolkit'

interface productOutputState {
  productOutputByHours: {
    currentDate: string,
    contractPowerValue: number,
    currentPowerValue: number,
    currentTime: string,
    unit: string,
    barGroups: {label: string, value: number}[]
  }
  productOutputOverview: {
    totalPower: number,
    averagePower: number,
    powerSources: {
      name: string,
      code: string,
      power: number,
      color: string,
    }[],
  },
  productOutputByDays: {
    productionData: {
      date: string,
      actual: number,
      contract: number,
    }[],
  },
}
const initialState: productOutputState = {
  productOutputByHours: {
    currentDate: '',
    unit: '',
    contractPowerValue: 0,
    currentPowerValue: 0,
    currentTime: '',
    barGroups: [],    
  },
  productOutputOverview: {
    totalPower: 0,
    averagePower: 0,
    powerSources: [],
  },
  productOutputByDays: {
    productionData: [],
  },
}

const productOutputSlice = createSlice({
  name: 'productOutputSlice',
  initialState,
  reducers: {
    setProductOutputByHours: (state, action) => {
      state.productOutputByHours.currentDate = action.payload.currentDate
      state.productOutputByHours.contractPowerValue = action.payload.contractPowerValue
      state.productOutputByHours.currentPowerValue = action.payload.currentPowerValue
      state.productOutputByHours.currentTime = action.payload.currentTime
      state.productOutputByHours.barGroups = action.payload.listValueByHours
      state.productOutputByHours.unit = action.payload.unit
    },
    setProductOutputOverview: (state, action) => {
      state.productOutputOverview.totalPower = action.payload.total
      state.productOutputOverview.averagePower = action.payload.Contract
      state.productOutputOverview.powerSources = action.payload.detail
    },
    setProductOutputByDays: (state, action) => {
      state.productOutputByDays.productionData = action.payload
    },
  },
})
const { reducer } = productOutputSlice
export const { setProductOutputByHours, setProductOutputOverview, setProductOutputByDays } = productOutputSlice.actions
export default reducer
