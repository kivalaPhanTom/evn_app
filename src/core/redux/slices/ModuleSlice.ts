import { createSlice } from '@reduxjs/toolkit'

interface ModuleItemState {
  code: string
  name: string
  canAccess: boolean
}
interface ModuleState {
  modules: ModuleItemState[]
}

const initialState: ModuleState = {
  modules: [],
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
