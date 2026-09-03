import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RefreshState {
  countRefesh: number
  [key: string]: any
}

const initialState: RefreshState = {
  countRefesh: 0,
}

const refreshSlice = createSlice({
  name: 'refreshSlice',
  initialState,
  reducers: {
    saveState: (state, action: PayloadAction<Record<string, any>>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (state[key] !== value) {
          state[key] = value
        }
      })
    },
  },
})

export const { saveState } = refreshSlice.actions
export default refreshSlice.reducer
