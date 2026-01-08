import { createSlice } from '@reduxjs/toolkit'

interface productOutputState {
  isLoadingOverview: boolean,
  isLoadingByHours: boolean,
  isLoadingNearCurrentDays: boolean,
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
      value: number
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
  compareProductOutput: {
    Unit: string
    Contractvalue: number
    BarChartData: { value: number; label: string }[]
    compareLineChartData: []
    Summary: {
      average: {
        target: {
          date: string
          value: number
          unit: string
        }
        compare: {
          date: string
          value: number
          unit: string
        }
      }
      max: {
        target: {
          date: string
          value: number
          unit: string
        }
        compare: {
          date: string
          value: number
          unit: string
        }
      }
      min: {
        target: {
          date: string
          value: number
          unit: string
        }
        compare: {
          date: string
          value: number
          unit: string
        }
      }
    }
  }
}
const initialState: productOutputState = {
  isLoadingOverview: false,
  isLoadingByHours: false,
  isLoadingNearCurrentDays: false,
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
  compareProductOutput: {
    Unit: '',
    Contractvalue: 0,
    BarChartData: [],
    compareLineChartData: [],
    Summary: {
      average: {
        target: {
          date: '',
          value: 0,
          unit: '',
        },
        compare: {
          date: '',
          value: 0,
          unit: '',
        },
      },
      max: {
        target: {
          date: '',
          value: 0,
          unit: '',
        },
        compare: {
          date: '',
          value: 0,
          unit: '',
        },
      },
      min: {
        target: {
          date: '',
          value: 0,
          unit: '',
        },
        compare: {
          date: '',
          value: 0,
          unit: '',
        },
      },
    },
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
      state.productOutputOverview.averagePower = action.payload.average
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
    setCompareProductOutput: (state, action) => {
      state.compareProductOutput = action.payload
    },
    setLoading: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})
const { reducer } = productOutputSlice
export const {
  setProductOutputByHours,
  setProductOutputOverview,
  setProductOutputByDays,
  setProductCummulativeOutput,
  setCompareProductOutput,
  setLoading
} = productOutputSlice.actions
export default reducer
