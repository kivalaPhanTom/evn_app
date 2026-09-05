import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

interface HydroChartItem {
  avgVolume: number
  percent: number
  values: number
  date: string
}
interface flowChartItem {
  label: string
  code: string
  value: { current: number; period: number }
  unit: string
}

interface rangeDate {
  from: dayjs.Dayjs
  to: dayjs.Dayjs
}

interface waterLevelRangeItem {
  fromDate: string
  toDate: string
  fromLevel: number
  toLevel: number
}
interface hydrologyState {
  countRefesh: number
  inboundTraffic: number
  dischargeFlow: number
  selectedOptionsValue: string
  selectedOptionsValueFactDetail: string
  inflowOutflow: {
    unit: string
    cards: { id: string; title: string; value: number; unit: string }[]
    qIn: { label: string; value: number }[]
    qOut: { label: string; value: number }[]
  }
  hydrologyCharData: HydroChartItem[]
  hydrologyPlantsInfo: {
    PlantsInfoData: { label: string; value: number; unit: string }[]
  }
  hydrologyPlants: {
    plantsData: any[]
  }
  currentHydrologyPlant: {
    plantsData: any[]
  }
  flowChart: any
  flowChartSummary: {
    totalInflow: number
    totalOutflow: number
    unit: string
  }
  upstreamWaterLevel: any
  inflow: any
  outflow: any
  turbineflow: any
  powerStoreInLake: {
    currentCapacity: number
    previousCapacity: number
    segments: any[]
    unit: string
  }
  powerStoreInLakeFactDetail: any[]
  operateWaterLevel: {
    waterLevelRange: waterLevelRangeItem[]
  }
  filterByTime: {
    rangeCurrentDate: rangeDate
    rangeCompareDate: rangeDate
    rangeTargetDate: rangeDate
    rangeCompareMonth: rangeDate
    rangeTargetMonth: rangeDate
    rangeCompareYear: rangeDate
    currentFilterTab: 'hour' | 'day' | 'month' | 'year'
  }
  isLoadingHydrologyChart: boolean
  isLoadingPowerStoreInLake: boolean
  isLoadingInflowOutflow: boolean
  isLoadingFlowChart: boolean
}
const initialState: hydrologyState = {
  countRefesh: 0,
  inboundTraffic: 0,
  dischargeFlow: 0,
  selectedOptionsValue: 'HOURS',
  selectedOptionsValueFactDetail: 'HOURS',
  inflowOutflow: { unit: '', cards: [], qIn: [], qOut: [] },
  hydrologyCharData: [],
  hydrologyPlants: { plantsData: [] },
  currentHydrologyPlant: { plantsData: [] },
  hydrologyPlantsInfo: { PlantsInfoData: [] },
  flowChart: {
    mntl: { label: 'M?c nu?c thu?ng luu', code: 'MNTL', value: { current: 0, period: 0 }, unit: 'm' },
    qve: { label: 'Luu lu?ng v?', code: 'Qve', value: { current: 0, period: 0 }, unit: 'm�/s' },
    qcm: { label: 'Luu lu?ng ch?y m�y', code: 'Qcm', value: { current: 0, period: 0 }, unit: 'm�/s' },
    qxt: { label: 'Luu lu?ng x? tr�n', code: 'Qxt', value: { current: 0, period: 0 }, unit: 'm�/s' },
    qxmt: { label: 'Luu lu?ng x? qua ?ng x� MT', code: 'Qxmt', value: { current: 0, period: 0 }, unit: 'm�/s' },
  },
  flowChartSummary: { totalInflow: 395, totalOutflow: 395, unit: 'm�/s' },
  upstreamWaterLevel: {
    unit: 'm', minValue: 0, maxValue: 0, avgValue: 0, currentValue: 0,
    todayUpstream: [], samePeriodUpstream: [],
  },
  inflow: {
    unit: 'm³/s', minValue: 0, maxValue: 0, avgValue: 0, currentValue: 0,
    todayUpstream: [], samePeriodUpstream: [],
  },
  outflow: {
    unit: 'm³/s', minValue: 0, maxValue: 0, avgValue: 0, currentValue: 0,
    todayUpstream: [], samePeriodUpstream: [],
  },
  turbineflow: {
    unit: 'm³/s', minValue: 0, maxValue: 0, avgValue: 0, currentValue: 0,
    todayUpstream: [], samePeriodUpstream: [],
  },
  powerStoreInLake: { currentCapacity: 0, previousCapacity: 0, segments: [], unit: '' },
  powerStoreInLakeFactDetail: [],
  operateWaterLevel: { waterLevelRange: [] },
  filterByTime: {
    rangeCurrentDate: { from: dayjs(), to: dayjs().subtract(1, 'year') },
    rangeCompareDate: { from: dayjs().subtract(14, 'day'), to: dayjs().subtract(7, 'day') },
    rangeTargetDate: { from: dayjs().subtract(7, 'day'), to: dayjs() },
    rangeCompareMonth: { from: dayjs().subtract(1, 'year').set('month', 0), to: dayjs().subtract(1, 'year') },
    rangeTargetMonth: { from: dayjs().set('month', 0), to: dayjs() },
    rangeCompareYear: { from: dayjs().subtract(5, 'year'), to: dayjs() },
    currentFilterTab: 'hour',
  },
  isLoadingHydrologyChart: false,
  isLoadingPowerStoreInLake: false,
  isLoadingInflowOutflow: false,
  isLoadingFlowChart: false,
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
    setCurrentHydrologyPlant: (state, action) => {
      state.currentHydrologyPlant = action.payload
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
    },
    setPowerStoreInLakeFactDetail: (state, action) => {
      state.powerStoreInLakeFactDetail = action.payload
    },
    setOperateWaterLevel: (state, action) => {
      state.operateWaterLevel = action.payload
    },
    setCountRefesh: (state, action) => {
      state.countRefesh = action.payload
    },
    setSelectedOptionsValue: (state, action) => {
      state.selectedOptionsValue = action.payload
    },
    setSelectedOptionsValueFactDetail: (state, action) => {
      state.selectedOptionsValueFactDetail = action.payload
    },
    setFilterByTime: (state, action) => {
      state.filterByTime = { ...state.filterByTime, ...action.payload }
    },
    setLoading: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

const { reducer } = hydrologySlice
export const {
  setInflowOutflow,
  setHydrologyChart,
  setHydrologyPlantsParam,
  setCurrentHydrologyPlant,
  setFlowChartData,
  setHydrologyPlantsInfo,
  setUpStreamWaterLevel,
  setInflow,
  setOutflow,
  setTurbineflow,
  setPowerStoreInLake,
  setOperateWaterLevel,
  setPowerStoreInLakeFactDetail,
  setCountRefesh,
  setFilterByTime,
  setLoading,
  setSelectedOptionsValue,
  setSelectedOptionsValueFactDetail,
} = hydrologySlice.actions

export default reducer
