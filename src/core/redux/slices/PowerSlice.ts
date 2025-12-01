import { createSlice } from '@reduxjs/toolkit'
interface PowerDetail {
    code: string;
    color: string;
    name: string;
    value: number;
}
interface powerOverviewState {
    average: number
    total: number
    detail: PowerDetail[] 
}
const initialState: powerOverviewState = {
    average: 0,
    total: 0,
    detail:[]
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
    },
})
const { reducer } = powerSlice
export const { setPowerOverview } = powerSlice.actions
export default reducer
