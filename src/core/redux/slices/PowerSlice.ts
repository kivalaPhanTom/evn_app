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
  },
})
const { reducer } = powerSlice
export const { setPowerOverview, setPowerByTime } = powerSlice.actions
export default reducer
