import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface TechInfoItem {
  ID_NM: string
  Name: string
  Value: string
  UoM: string
  Group: string
}

export interface TechInfoState {
  id: number | null
  name: string
  isLoadingTechInfo: boolean
  isLoadingTechInfoDetail: boolean
  techInfo: TechInfoItem[]
  techInfoDetail: TechInfoItem[]
}

const initialState: TechInfoState = {
  id: null,
  name: '',
  isLoadingTechInfo: false,
  isLoadingTechInfoDetail: false,
  techInfo: [],
  techInfoDetail: [],
}

const technologySlice = createSlice({
  name: 'technology',
  initialState,
  reducers: {
    setTechInfo: (state, action: PayloadAction<TechInfoItem[]>) => {
      state.techInfo = action.payload
    },
    setTechInfoDetail: (state, action: PayloadAction<TechInfoItem[]>) => {
      state.techInfoDetail = action.payload
    },
    setLoading: (state, action: PayloadAction<Partial<TechInfoState>>) => {
      Object.assign(state, action.payload)
    },
  },
})

export const { setTechInfo, setTechInfoDetail, setLoading } = technologySlice.actions
export default technologySlice.reducer