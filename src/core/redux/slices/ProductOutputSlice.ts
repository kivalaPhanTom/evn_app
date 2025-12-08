import { BarGroup } from '@/core/types'
import { createSlice } from '@reduxjs/toolkit'

interface productOutputState {
  productOutputByHours: {
    currentDate: string
    contractPowerValue: number
    currentPowerValue: number
    currentTime: string
    unit: string
    barGroups: { label: string; value: number }[]
  }
  productOutputOverview: {
    totalPower: number
    averagePower: number
    powerSources: {
      name: string
      code: string
      power: number
      color: string
    }[]
  }
  productOutputByDays: {
    productionData: {
      date: string
      actual: number
      contract: number
    }[]
  }
  productCummulativeOutput: {
    barGroups?: { label: string; value: number }[]
    byLabel: string
    summary: {
      [key: string]: {
        label: string
        periodLabel: string
        unit: string
        value: number
      }
    }
    unit: string
  }
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
  productCummulativeOutput: {
    barGroups: [],
    byLabel: '',
    summary: {},
    unit: '',
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
    setProductCummulativeOutput: (state, action) => {
      state.productCummulativeOutput.barGroups = action.payload.BarChartData
      state.productCummulativeOutput.byLabel = action.payload.ByLabel
      state.productCummulativeOutput.summary = action.payload.Summary
      state.productCummulativeOutput.unit = action.payload.Unit
    },
  },
})
const { reducer } = productOutputSlice
export const {
  setProductOutputByHours,
  setProductOutputOverview,
  setProductOutputByDays,
  setProductCummulativeOutput,
} = productOutputSlice.actions
export default reducer
