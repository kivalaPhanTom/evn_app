import { createSlice } from '@reduxjs/toolkit'
interface moduleItemState {
    code: string;
    name: string;
    canAccess: boolean;
}
interface moduleState {
    modules: moduleItemState []
}
const initialState: moduleState = {
    modules: []
}

const moduleSlice = createSlice({
    name: 'moduleSlice',
    initialState,
    reducers: {
        saveModuleState: (state, action) => {
            state.modules = action.payload
        },
    },
})
const { reducer } = moduleSlice
export const { saveModuleState } = moduleSlice.actions
export default reducer
