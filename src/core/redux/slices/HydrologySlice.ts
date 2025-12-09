import { createSlice } from '@reduxjs/toolkit'

interface hydrologyState {
  inboundTraffic: number
  dischargeFlow: number
}
const initialState: hydrologyState = {
 inboundTraffic:0,
 dischargeFlow:0
}

const hydrologySlice = createSlice({
  name: 'hydrologySlice',
  initialState,
  reducers: {
    
  },
})
const { reducer } = hydrologySlice
export const { } = hydrologySlice.actions
export default reducer
