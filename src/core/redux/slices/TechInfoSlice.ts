import { createSlice } from '@reduxjs/toolkit'

interface techInfoItem {
    ID_NM: string
    Name: string
    Value: string
    UoM: string
    Group: string
}
interface TechInfoState {
    id: number | null
    name: string
    isLoadingTechInfo: boolean
    isLoadingTechInfoDetail: boolean
    techInfo: techInfoItem[]
    techInfoDetail: techInfoItem[] 
}
const initialState: TechInfoState = {
    id: null,
    name: '',
    isLoadingTechInfo: false,
    isLoadingTechInfoDetail: false,
    techInfo:[],
    techInfoDetail:[],
}

const techInfoSlice = createSlice({
    name: 'techInfoSlice',
    initialState,
    reducers: {
        setTechInfo: (state, action) => {
            state.techInfo = action.payload
        },
        setTechInfoDetail: (state, action) => {
            state.techInfoDetail = action.payload
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
