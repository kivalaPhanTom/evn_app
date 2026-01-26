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

const powerSlice = createSlice({
  name: 'powerSlice',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      let newState = { ...state }
      newState.activeTabIndex = action.payload
      return newState
    },
    setPowerOverview: (state, action) => {
      let newState = { ...state }
      newState.average = action.payload.average
      newState.total = action.payload.total
      newState.detail = action.payload.detail
      return newState
    },
    setPowerByTime: (state, action) => {
      let newState = { ...state }
      newState.powerByTime = action.payload
      return newState
    },
    setPowerByDays: (state, action) => {
      // Không return, chỉ modify state trực tiếp
      state.powerByDays.powerData = action.payload.detail
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
export const { setPowerOverview, setPowerByTime, setPowerByDays, setComparePower, setLoading, setActiveTab } =
  powerSlice.actions
export default reducer
