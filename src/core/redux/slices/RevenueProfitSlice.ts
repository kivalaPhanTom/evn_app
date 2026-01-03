import { createSlice } from '@reduxjs/toolkit'

interface PowerPriceDetailItem {
  Value: number
  Unit: string
  Estimated: boolean
  Note: string
}
interface RevenueProfitState {
  isLoadingProfit: boolean
  isLoadingRevenue: boolean
  profit: {
    Breakdown: {
      Color: string
      Percent: number
      PlantCode: string
      PlantName: string
      Sparkline: number[]
      Unit: string
      Value: number
    }[]
    Chart: {
      Data: any
      Period: {
        From: string
        To: string
      }
      Unit: string
    }
    Cumulative: {
      Month: {
        ChangePercent: number
        Unit: string
        Value: number
        month: string
      }
      Week: {
        ChangePercent: number
        Unit: string
        Value: number
      }
    }
    Today: {
      ChangePercent: number
      Unit: string
      Value: number
    }
    lossWarning: any
  }
  revenue: {
    Breakdown: {
      Color: string
      Percent: number
      PlantCode: string
      PlantName: string
      Sparkline: number[]
      Unit: string
      Value: number
    }[]
    Chart: {
      Data: any
      Period: {
        From: string
        To: string
      }
      Unit: string
    }
    Cumulative: {
      Month: {
        ChangePercent: number
        Unit: string
        Value: number
        month: string
      }
      Week: {
        ChangePercent: number
        Unit: string
        Value: number
      }
    }
    Today: {
      ChangePercent: number
      Unit: string
      Value: number
    }
    lossWarning: any
  },
  powerPriceDetail: {
    AvgMarketPrice: Omit<PowerPriceDetailItem, 'Estimated' | 'Note'>,
    AvgCapacityPrice: Omit<PowerPriceDetailItem, 'Estimated' | 'Note'>,
    FullMarketPrice: Omit<PowerPriceDetailItem, 'Estimated' | 'Note'>,
    PriceCeiling: Omit<PowerPriceDetailItem, 'Estimated' | 'Note'>,
    MonthlyContractPrice: Omit<PowerPriceDetailItem, 'Note'>,
    FuelVariablePrice: Omit<PowerPriceDetailItem, 'Estimated'>,
  },
  isLoadingPowerPrice: boolean
}
const initialState: RevenueProfitState = {
  isLoadingProfit: false,
  isLoadingRevenue: false,
  profit: {
    Breakdown: [],
    Chart: {
      Data: [],
      Period: {
        From: '',
        To: '',
      },
      Unit: '',
    },
    Cumulative: {
      Month: {
        ChangePercent: 0,
        Unit: '',
        Value: 0,
        month: '',
      },
      Week: {
        ChangePercent: 0,
        Unit: '',
        Value: 0,
      },
    },
    Today: {
      ChangePercent: 0,
      Unit: '',
      Value: 0,
    },
    lossWarning: [],
  },
  revenue: {
    Breakdown: [],
    Chart: {
      Data: [],
      Period: {
        From: '',
        To: '',
      },
      Unit: '',
    },
    Cumulative: {
      Month: {
        ChangePercent: 0,
        Unit: '',
        Value: 0,
        month: '',
      },
      Week: {
        ChangePercent: 0,
        Unit: '',
        Value: 0,
      },
    },
    Today: {
      ChangePercent: 0,
      Unit: '',
      Value: 0,
    },
    lossWarning: [],
  },
  powerPriceDetail: {
    "AvgMarketPrice": {
      "Value": 0,
      "Unit": "Đồng/kWh"
    },
    "AvgCapacityPrice": {
      "Value": 0,
      "Unit": "Đồng/kWh"
    },
    "FullMarketPrice": {
      "Value": 0,
      "Unit": "Đồng/kWh"
    },
    "PriceCeiling": {
      "Value": 0,
      "Unit": "Đồng/kWh"
    },
    "MonthlyContractPrice": {
      "Value": 0,
      "Unit": "Đồng/kWh",
      "Estimated": false
    },
    "FuelVariablePrice": {
      "Value": 0,
      "Unit": "Đồng/kWh",
      "Note": "Thủy điện không áp dụng"
    }
  },
  isLoadingPowerPrice: false
}

const revenueProfitSlice = createSlice({
  name: 'revenueProfitSlice',
  initialState,
  reducers: {
    setProfitData: (state, action) => {
      state.profit = action.payload
    },
    setRevenueData: (state, action) => {
      state.revenue = action.payload
    },
    setPowerPrices: (state, action) => {
      state.powerPriceDetail = action.payload
    },
    setLoading: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})
const { reducer } = revenueProfitSlice
export const { setLoading, setProfitData, setRevenueData, setPowerPrices } = revenueProfitSlice.actions
export default reducer
