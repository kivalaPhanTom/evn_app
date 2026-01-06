import { createSlice } from '@reduxjs/toolkit'
import { set } from 'react-hook-form'

interface PowerPriceDetailItem {
  Value: number
  Unit: string
  Estimated: boolean
  Note: string
}
interface RevenueCostSummaryPlantItem {
  PlantCode: string
  PlantName: string
  Value: number
}
interface RevenueCostSummaryItem {
  Total: number
  Unit: string
  ByPlant: RevenueCostSummaryPlantItem[]
}

interface RevenueSeriesItem {
  PlantCode: string
  PlantName: string
  Values: number[]
  Color: string
}
interface RevenueProfitState {
  countRefesh: number
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
  profitFactDetail: {
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
  powerPriceDetail: {
    AvgMarketPrice: Omit<PowerPriceDetailItem, 'Estimated' | 'Note'>
    AvgCapacityPrice: Omit<PowerPriceDetailItem, 'Estimated' | 'Note'>
    FullMarketPrice: Omit<PowerPriceDetailItem, 'Estimated' | 'Note'>
    PriceCeiling: Omit<PowerPriceDetailItem, 'Estimated' | 'Note'>
    MonthlyContractPrice: Omit<PowerPriceDetailItem, 'Note'>
    FuelVariablePrice: Omit<PowerPriceDetailItem, 'Estimated'>
  }
  isLoadingPowerPrice: boolean
  revenueCostSummary: {
    MarketRevenue: RevenueCostSummaryItem
    ContractRevenue: RevenueCostSummaryItem
    TotalCost: RevenueCostSummaryItem
  }
  isLoadingRevenueCostSummary: boolean
  revenueFactDetail: {
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
  revenueByPeriod: {
    Type: string
    Unit: string
    Dates: string[]
    Series: RevenueSeriesItem[]
  }
  isLoadingRevenueByPeriod: boolean
  dailyAndCumulativeData: {
    Date: string
    ProfitToday: {
      Value: number
      Unit: string
    }
    ByPlantToday: RevenueCostSummaryPlantItem[]
    ProfitMonth: {
      Value: number
      Unit: string
    }
    ByPlantMonth: RevenueCostSummaryPlantItem[]
  }
  profitByPeriod: {
    PlantCode: string
    PlantName: string
    Unit: string
    Data: {
      Date: string
      Value: number
    }[]
  }
  isLoadingProfitByPeriod: boolean
}

const initialState: RevenueProfitState = {
  countRefesh:0,
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
  profitFactDetail: {
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
    AvgMarketPrice: {
      Value: 0,
      Unit: 'Đồng/kWh',
    },
    AvgCapacityPrice: {
      Value: 0,
      Unit: 'Đồng/kWh',
    },
    FullMarketPrice: {
      Value: 0,
      Unit: 'Đồng/kWh',
    },
    PriceCeiling: {
      Value: 0,
      Unit: 'Đồng/kWh',
    },
    MonthlyContractPrice: {
      Value: 0,
      Unit: 'Đồng/kWh',
      Estimated: false,
    },
    FuelVariablePrice: {
      Value: 0,
      Unit: 'Đồng/kWh',
      Note: 'Thủy điện không áp dụng',
    },
  },
  isLoadingPowerPrice: false,
  revenueCostSummary: {
    MarketRevenue: {
      Total: 0,
      Unit: 'tỷ Đồng',
      ByPlant: [
        {
          PlantCode: 'SP3',
          PlantName: 'Srepok 3',
          Value: 0,
        },
        {
          PlantCode: 'BK',
          PlantName: 'Buôn Kuốp',
          Value: 0,
        },
        {
          PlantCode: 'BTS',
          PlantName: 'Buôn Tua Srah',
          Value: 0,
        },
      ],
    },
    ContractRevenue: {
      Total: 0,
      Unit: 'tỷ Đồng',
      ByPlant: [
        {
          PlantCode: 'SP3',
          PlantName: 'Srepok 3',
          Value: 0,
        },
        {
          PlantCode: 'BK',
          PlantName: 'Buôn Kuốp',
          Value: 0,
        },
        {
          PlantCode: 'BTS',
          PlantName: 'Buôn Tua Srah',
          Value: 0,
        },
      ],
    },
    TotalCost: {
      Total: 0,
      Unit: 'tỷ Đồng',
      ByPlant: [
        {
          PlantCode: 'SP3',
          PlantName: 'Srepok 3',
          Value: 0,
        },
        {
          PlantCode: 'BK',
          PlantName: 'Buôn Kuốp',
          Value: 0,
        },
        {
          PlantCode: 'BTS',
          PlantName: 'Buôn Tua Srah',
          Value: 0,
        },
      ],
    },
  },
  isLoadingRevenueCostSummary: false,
  revenueFactDetail: {
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
  revenueByPeriod: {
    Type: '',
    Unit: '',
    Dates: [],
    Series: [],
  },
  isLoadingRevenueByPeriod: false,
  dailyAndCumulativeData: {
    Date: '',
    ProfitToday: {
      Value: 0,
      Unit: 'tỷ Đồng',
    },
    ByPlantToday: [],
    ProfitMonth: {
      Value: 0,
      Unit: 'tỷ Đồng',
    },
    ByPlantMonth: [],
  },
  profitByPeriod: {
    PlantCode: '',
    PlantName: '',
    Unit: '',
    Data: [],
  },
  isLoadingProfitByPeriod: false,
}

const revenueProfitSlice = createSlice({
  name: 'revenueProfitSlice',
  initialState,
  reducers: {
    setProfitData: (state, action) => {
      state.profit = action.payload
    },
    setProfitFactDetailData: (state, action) => {
      state.profitFactDetail = action.payload
    },
    setRevenueData: (state, action) => {
      state.revenue = action.payload
    },
    setPowerPrices: (state, action) => {
      state.powerPriceDetail = action.payload
    },
    setRevenueCostSummary: (state, action) => {
      state.revenueCostSummary = action.payload
    },
    setRevenueFactDetailData: (state, action) => {
      state.revenueFactDetail = action.payload
    },
    setRevenueByPeriod: (state, action) => {
      state.revenueByPeriod = action.payload
    },
    setProfitByPeriod: (state, action) => {
      state.profitByPeriod = action.payload
    },
    setLoading: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    setDailyAndCumulativeData: (state, action) => {
      state.dailyAndCumulativeData = action.payload
    },
     setCountRefesh: (state, action) => {
        state.countRefesh = action.payload
    }
  },
})
const { reducer } = revenueProfitSlice
export const {
  setLoading,
  setProfitData,
  setRevenueData,
  setPowerPrices,
  setRevenueCostSummary,
  setRevenueByPeriod,
  setDailyAndCumulativeData,
  setProfitFactDetailData,
  setRevenueFactDetailData,
  setProfitByPeriod,
  setCountRefesh
} = revenueProfitSlice.actions
export default reducer
