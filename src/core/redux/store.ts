import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './Sagas/RootSaga'
import authenReducer from './domains/auth'
import documentReducer from './domains/documents'
import hydrologyReducer from './domains/hydrology'
import moduleReducer from './domains/modules'
import powerReducer from './domains/power'
import productOutputReducer from './domains/production-output'
import refreshReducer from './domains/refresh'
import revenueProfitReducer from './domains/revenue-profit'
import techInfoReducer from './domains/technology'
import unitMaintenanceScheduleReducer from './domains/maintenance'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    powerSlice: powerReducer,
    productOutputSlice: productOutputReducer,
    hydrologySlice: hydrologyReducer,
    revenueProfitSlice: revenueProfitReducer,
    unitMaintenanceScheduleSlice: unitMaintenanceScheduleReducer,
    techInfoSlice: techInfoReducer,
    documentSlice: documentReducer,
    moduleSlice: moduleReducer,
    authenSlice: authenReducer,
    refreshSlice: refreshReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

sagaMiddleware.run(rootSaga)

export default store
