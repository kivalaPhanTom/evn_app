import { BarGroup } from '@/core/types'
import { createSlice } from '@reduxjs/toolkit'

interface productOutputState {
  productOutputByHours: {
    currentDate: string,
    contractPowerValue: number,
    currentPowerValue: number,
    currentTime: string,
    unit: string,
    barGroups: {label: string, value: number}[]
  }
}
const initialState: productOutputState = {
  productOutputByHours: {
    currentDate: '',
    unit: '',
    contractPowerValue: 0,
    currentPowerValue: 0,
    currentTime: '',
    barGroups: [],
  },
}

const productOutputSlice = createSlice({
  name: 'productOutputSlice',
  initialState,
  reducers: {
    setProductOutputByHours: (state, action) => {
      state.productOutputByHours.currentDate = action.payload.currentDate
      state.productOutputByHours.contractPowerValue = action.payload.contractPowerValue
      state.productOutputByHours.currentPowerValue = action.payload.currentPowerValue
      state.productOutputByHours.currentTime = action.payload.currentTime
      state.productOutputByHours.barGroups = action.payload.listValueByHours
      state.productOutputByHours.unit = action.payload.unit
    },
  },
})
const { reducer } = productOutputSlice
export const { setProductOutputByHours } = productOutputSlice.actions
export default reducer
