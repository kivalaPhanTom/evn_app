import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuthenticated: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStarted: (state) => {
      state.status = 'loading'
      state.error = null
    },
    loginSucceeded: (state) => {
      state.isAuthenticated = true
      state.status = 'succeeded'
      state.error = null
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false
      state.status = 'failed'
      state.error = action.payload
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
    },
  },
})

export const { loginStarted, loginSucceeded, loginFailed, setAuthenticated, logout } = authSlice.actions
export default authSlice.reducer