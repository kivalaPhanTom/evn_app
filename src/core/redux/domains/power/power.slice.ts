import { createSlice } from '@reduxjs/toolkit'
interface PowerDetail {
  code: string
  color: string
  name: string
  value: number
}
interface HourlyPowerList {
  value: number
  label: string
}
interface PowerByDays {
  value: number
  date: string
  dayOfWeek: string
}
interface powerOverviewState {
  average: number
  total: number
  detail: PowerDetail[]
  isLoadingOverview: boolean
  isLoadingByHours: boolean
  isLoadingNearCurrentDays: boolean
  isLoadingComparePower: boolean
  activeTabIndex: number
  powerByTime: {
    currentDate: string
    currentPower: number
    currentTime: string
    offeredPower: number
    unit: string
    HourlyPowerList: HourlyPowerList[]
    offeredPowerList: number[]
  }
  powerByDays: {
    powerData: PowerByDays[]
  }
  comparePower: {
    Unit: string
    BarChartData: { value: number; label: string }[]
    compareLineChartData: []
    Summary: any
  }
}
const initialState: powerOverviewState = {
  average: 0,
  total: 0,
  detail: [],
  isLoadingOverview: false,
  isLoadingByHours: false,
  isLoadingNearCurrentDays: false,
  isLoadingComparePower: false,
  activeTabIndex: 0,
  powerByTime: {
    currentDate: '',
    currentPower: 0,
    currentTime: '0h',
    offeredPower: 0,
    unit: '',
    offeredPowerList: [],
    HourlyPowerList: [],
  },
  powerByDays: {
    powerData: [],
  },
  comparePower: {
    Unit: '',
    BarChartData: [],
    compareLineChartData: [],
    Summary: {
      average: { target: { date: '', value: 0, unit: '' }, compare: { date: '', value: 0, unit: '' } },
      max: { target: { date: '', value: 0, unit: '' }, compare: { date: '', value: 0, unit: '' } },
      min: { target: { date: '', value: 0, unit: '' }, compare: { date: '', value: 0, unit: '' } },
    },
  },
}

const powerSlice = createSlice({
  name: 'powerSlice',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTabIndex = action.payload
    },
    setPowerOverview: (state, action) => {
      state.average = action.payload.average
      state.total = action.payload.total
      state.detail = action.payload.detail
    },
    setPowerByTime: (state, action) => {
      state.powerByTime = action.payload
    },
    setPowerByDays: (state, action) => {
      state.powerByDays.powerData = action.payload
    },
    setComparePower: (state, action) => {
      state.comparePower = action.payload
    },
    setLoading: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})
const { reducer } = powerSlice
export const {
  setActiveTab,
  setPowerOverview,
  setPowerByTime,
  setPowerByDays,
  setComparePower,
  setLoading,
} = powerSlice.actions
export default reducer
