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
  hydrologyCharData:HydroChartItem[],
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
  hydrologyCharData:[],
  hydrologyPlants: {
    plantsData: [],
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
  },
})
const { reducer } = hydrologySlice
export const { setInflowOutflow, setHydrologyChart, setHydrologyPlantsParam } = hydrologySlice.actions
export default reducer
