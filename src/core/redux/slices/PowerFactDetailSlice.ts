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
  powerByTime: {
    currentDate: string
    currentPower: number
    currentTime: string
    avgPower: number
    HourlyPowerList: HourlyPowerList[]
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
  isLoadingComparePower:false,
  powerByTime: {
    currentDate: '',
    currentPower: 0,
    currentTime: '0h',
    avgPower: 0,
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

const powerFactDetailSlice = createSlice({
  name: 'powerFactDetailSlice', 
  initialState,
  reducers: {
    setPowerOverviewFactDetail: (state, action) => {
      let newState = { ...state }
      newState.average = action.payload.average
      newState.total = action.payload.total
      newState.detail = action.payload.detail
      return newState
    },
    setPowerByTimeFactDetail: (state, action) => {
      let newState = { ...state }
      newState.powerByTime = action.payload
      return newState
    },
    setPowerByDaysFactDetail: (state, action) => {
      // Không return, chỉ modify state trực tiếp
      state.powerByDays.powerData = action.payload.detail
    },
    setComparePowerFactDetail: (state, action) => {
      state.comparePower = action.payload
    },
    setLoadingFactDetail: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})
const { reducer } = powerFactDetailSlice
export const { setPowerOverviewFactDetail, setPowerByTimeFactDetail, setPowerByDaysFactDetail, setComparePowerFactDetail, setLoadingFactDetail } = powerFactDetailSlice.actions
export default reducer
