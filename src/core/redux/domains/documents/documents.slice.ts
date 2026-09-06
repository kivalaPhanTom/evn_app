import type { Document, Existence } from '@/core/model/Document'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface DocumentState {
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
  name: 'documents',
  initialState,
  reducers: {
    setLegal: (state, action: PayloadAction<Document[]>) => {
      state.legal = action.payload
    },
    setExistence: (state, action: PayloadAction<Existence[]>) => {
      state.existence = action.payload
    },
    setLoading: (state, action: PayloadAction<Partial<DocumentState>>) => {
      Object.assign(state, action.payload)
    },
  },
})

export const { setLegal, setExistence, setLoading } = documentSlice.actions
export default documentSlice.reducer