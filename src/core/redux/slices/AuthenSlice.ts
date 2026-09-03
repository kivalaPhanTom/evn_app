import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
}

const authenSlice = createSlice({
  name: 'authenSlice',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
    },
  },
})

export const { setAuthenticated, logout } = authenSlice.actions
export default authenSlice.reducer
