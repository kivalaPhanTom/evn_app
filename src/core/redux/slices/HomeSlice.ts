import { createSlice } from '@reduxjs/toolkit'

interface HomeState {
    countRefesh: number
}
const initialState: HomeState = {
    countRefesh: 0,
}

const homeSlice = createSlice({
    name: 'homeSlice',
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
const { reducer } = homeSlice
export const { saveState } = homeSlice.actions
export default reducer
