import { createSlice } from '@reduxjs/toolkit'
interface factoryDetailState {
  countRefesh: number
}
const initialState: factoryDetailState = {
  countRefesh: 0,
}

const factoryDetailSlice = createSlice({
  name: 'factoryDetailSlice',
  initialState,
  reducers: {
    saveState: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        // @ts-ignore
        if (state[key] !== value) {
          // @ts-ignore
          state[key] = value;
        }
      });
    },
  },
})
const { reducer } = factoryDetailSlice
export const { saveState } = factoryDetailSlice.actions
export default reducer
