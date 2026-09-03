import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface ModuleItem {
  code: string
  name: string
  canAccess: boolean
}

export interface ModuleState {
  modules: ModuleItem[]
}

const moduleSlice = createSlice({
  name: 'modules',
  initialState: { modules: [] } as ModuleState,
  reducers: {
    saveModuleState: (state, action: PayloadAction<ModuleItem[]>) => {
      state.modules = action.payload
    },
  },
})

export const { saveModuleState } = moduleSlice.actions
export default moduleSlice.reducer