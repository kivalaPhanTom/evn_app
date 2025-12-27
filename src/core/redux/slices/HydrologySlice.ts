import { createSlice } from '@reduxjs/toolkit'
import { set } from 'react-hook-form'
interface HydroChartItem {
  avgVolume: number
  percent: number
  values: number
}
interface flowChartItem {
  label: string
  code: string
  value: {
    current: number
    period: number
  }
  unit: string
}

interface hydrologyState {
  inboundTraffic: number
  dischargeFlow: number
  inflowOutflow: {
    unit: string
    cards: {
      id: string
      title: string
      value: number
      unit: string
    }[]
    qIn: {
      label: string
      value: number
    }[]
    qOut: {
      label: string
      value: number
    }[]
  }
  hydrologyCharData: HydroChartItem[]
  hydrologyPlantsInfo: {
    PlantsInfoData: {
      label: string
      value: number
      unit: string
    }[]
  }
  hydrologyPlants: {
    plantsData: {
      id: number
      abbreviation: string
      name: string
      maxLevel: number
      currentLevel: number
      referenceLevel: number
    }[]
  }
  flowChart: {
    mntl: flowChartItem
    qve: flowChartItem
    qcm: flowChartItem
    qxt: flowChartItem
    qxmt: flowChartItem
  }
  flowChartSummary: {
    totalInflow: number
    totalOutflow: number
    unit: string
  }
  upstreamWaterLevel: {
    unit: string
    minValue: number
    maxValue: number
    avgValue: number
    currentValue: number
    todayUpstream: Array<{ label: string; value: number }>
    samePeriodUpstream: Array<{ label: string; value: number }>
  }
  inflow: {
    unit: string
    minValue: number
    maxValue: number
    avgValue: number
    currentValue: number
    todayInflow: Array<{ label: string; value: number }>
    samePeriodInflow: Array<{ label: string; value: number }>
  }
  outflow: {
    unit: string
    minValue: number
    maxValue: number
    avgValue: number
    currentValue: number
    todayOutflow: Array<{ label: string; value: number }>
    samePeriodOutflow: Array<{ label: string; value: number }>
  }
  turbineflow: {
    unit: string
    minValue: number
    maxValue: number
    avgValue: number
    currentValue: number
    todayTurbineFlow: Array<{ label: string; value: number }>
    samePeriodTurbineFlow: Array<{ label: string; value: number }>
  }
  powerStoreInLake: {
    currentCapacity: number
    previousCapacity: number
    segments: {
      label: string
      order: number
      percentOfTotal: number
      value: number
    }[]
    unit: string
  }
}
const initialState: hydrologyState = {
  inboundTraffic: 0,
  dischargeFlow: 0,
  inflowOutflow: {
    unit: '',
    cards: [],
    qIn: [],
    qOut: [],
  },
  hydrologyCharData: [],
  hydrologyPlants: {
    plantsData: [],
  },
  hydrologyPlantsInfo: {
    PlantsInfoData: [],
  },
  flowChart: {
    mntl: {
      label: 'Mực nước thượng lưu',
      code: 'MNTL',
      value: {
        current: 0,
        period: 0,
      },
      unit: 'm',
    },
    qve: {
      label: 'Lưu lượng về',
      code: 'Qve',
      value: {
        current: 0,
        period: 0,
      },
      unit: 'm³/s',
    },
    qcm: {
      label: 'Lưu lượng chạy máy',
      code: 'Qcm',
      value: {
        current: 0,
        period: 0,
      },
      unit: 'm³/s',
    },
    qxt: {
      label: 'Lưu lượng xả tràn',
      code: 'Qxt',
      value: {
        current: 0,
        period: 0,
      },
      unit: 'm³/s',
    },
    qxmt: {
      label: 'Lưu lượng xả qua ống xã MT',
      code: 'Qxmt',
      value: {
        current: 0,
        period: 0,
      },
      unit: 'm³/s',
    },
  },
  flowChartSummary: {
    totalInflow: 395,
    totalOutflow: 395,
    unit: 'm³/s',
  },
  upstreamWaterLevel: {
    unit: 'm',
    minValue: 0,
    maxValue: 0,
    avgValue: 0,
    currentValue: 0,
    todayUpstream: [],
    samePeriodUpstream: [],
  },
  inflow: {
    unit: 'm³/s',
    minValue: 0,
    maxValue: 0,
    avgValue: 0,
    currentValue: 0,
    todayInflow: [],
    samePeriodInflow: [],
  },
  outflow: {
    unit: 'm³/s',
    minValue: 0,
    maxValue: 0,
    avgValue: 0,
    currentValue: 0,
    todayOutflow: [],
    samePeriodOutflow: [],
  },
  turbineflow: {
    unit: 'm³/s',
    minValue: 0,
    maxValue: 0,
    avgValue: 0,
    currentValue: 0,
    todayTurbineFlow: [],
    samePeriodTurbineFlow: [],
  },
  powerStoreInLake: {
    currentCapacity: 0,
    previousCapacity: 0,
    segments: [],
    unit: '',
  },
}

const hydrologySlice = createSlice({
  name: 'hydrologySlice',
  initialState,
  reducers: {
    setInflowOutflow: (state, action) => {
      state.inflowOutflow = action.payload
    },
    setHydrologyChart: (state, action) => {
      state.hydrologyCharData = action.payload
    },
    setHydrologyPlantsParam: (state, action) => {
      state.hydrologyPlants = action.payload
    },
    setHydrologyPlantsInfo: (state, action) => {
      state.hydrologyPlantsInfo = action.payload
    },
    setFlowChartData: (state, action) => {
      const { flowChart, flowChartSummary } = action.payload
      state.flowChart = flowChart
      state.flowChartSummary = flowChartSummary
    },
    setUpStreamWaterLevel: (state, action) => {
      state.upstreamWaterLevel = action.payload
    },
    setInflow: (state, action) => {
      state.inflow = action.payload
    },
    setOutflow: (state, action) => {
      state.outflow = action.payload
    },
    setTurbineflow: (state, action) => {
      state.turbineflow = action.payload
    },
    setPowerStoreInLake: (state, action) => {
      state.powerStoreInLake = action.payload
    }
  },
})

const { reducer } = hydrologySlice
export const {
  setInflowOutflow,
  setHydrologyChart,
  setHydrologyPlantsParam,
  setFlowChartData,
  setHydrologyPlantsInfo,
  setUpStreamWaterLevel,
  setInflow,
  setOutflow,
  setTurbineflow,
  setPowerStoreInLake,
} = hydrologySlice.actions

export default reducer

