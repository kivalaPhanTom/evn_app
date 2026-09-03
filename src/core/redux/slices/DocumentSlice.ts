import { Document, Existence } from '@/core/model/Document'
import { createSlice } from '@reduxjs/toolkit'

interface DocumentState {
  id: number | null
  name: string
  isLoadingLegal: boolean
  isLoadingExistence: boolean
  legal: Document[]
  existence: Existence[]
}
const initialState: DocumentState = {
  id: null,
  name: '',
  isLoadingLegal: false,
  isLoadingExistence: false,
  legal: [],
  existence: [],
}

const documentSlice = createSlice({
  name: 'documentSlice',
  initialState,
  reducers: {
    setLegal: (state, action) => { state.legal = action.payload },
    setExistence: (state, action) => { state.existence = action.payload },
    setLoading: (state, action) => { return { ...state, ...action.payload } },
  },
})

const { reducer } = documentSlice
export const { setLegal, setExistence, setLoading } = documentSlice.actions
export default reducer
