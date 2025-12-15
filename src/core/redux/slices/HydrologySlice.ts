import { createSlice } from '@reduxjs/toolkit'
interface HydroChartItem {
  avgVolume: number;
  percent: number;
  values: number;
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
  },
  hydrologyCharData:HydroChartItem[]
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
  hydrologyCharData:[]
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
  },
})
const { reducer } = hydrologySlice
export const { setInflowOutflow, setHydrologyChart } = hydrologySlice.actions
export default reducer
