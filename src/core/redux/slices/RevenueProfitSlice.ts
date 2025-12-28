import { createSlice } from '@reduxjs/toolkit'

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
  }
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
    setLoading: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})
const { reducer } = revenueProfitSlice
export const { setLoading, setProfitData, setRevenueData } = revenueProfitSlice.actions
export default reducer
