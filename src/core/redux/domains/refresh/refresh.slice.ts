import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface RefreshState {
  countRefesh: number
}

const initialState: RefreshState = {
  countRefesh: 0,
}

const refreshSlice = createSlice({
  name: 'refreshSlice',
  initialState,
  reducers: {
    saveState: (state, action: PayloadAction<Partial<RefreshState>>) => {
      if (action.payload.countRefesh !== undefined) {
        state.countRefesh = action.payload.countRefesh
      }
    },
  },
})

export const { saveState } = refreshSlice.actions
export default refreshSlice.reducer
