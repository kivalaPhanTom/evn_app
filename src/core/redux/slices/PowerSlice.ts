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
}
const initialState: powerOverviewState = {
  average: 0,
  total: 0,
  detail: [],
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
}

const powerSlice = createSlice({
  name: 'powerSlice',
  initialState,
  reducers: {
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
  },
})
const { reducer } = powerSlice
export const { setPowerOverview, setPowerByTime, setPowerByDays } = powerSlice.actions
export default reducer
