import { createSlice } from '@reduxjs/toolkit'

interface TechInfoState {
    id: number | null
    name: string
    isLoadingTechInfo: boolean
    isLoadingTechInfoDetail: boolean
}
const initialState: TechInfoState = {
    id: null,
    name: '',
    isLoadingTechInfo: false,
    isLoadingTechInfoDetail: false,
}

const techInfoSlice = createSlice({
    name: 'techInfoSlice',
    initialState,
    reducers: {
        setTechInfo: (state, action) => {
            let newState = { ...state }
        },
        setTechInfoDetail: (state, action) => {
            let newState = { ...state }
        },
        setLoading: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
    }
})
const { reducer } = techInfoSlice
export const { setTechInfo, setTechInfoDetail, setLoading } = techInfoSlice.actions
export default reducer
