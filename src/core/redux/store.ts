import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './Sagas/RootSaga'
import powerReducer from './slices/PowerSlice'
import productOutputReducer from './slices/ProductOutputSlice'
import hydrologyReducer from './slices/HydrologySlice'
import revenueProfitReducer from './slices/RevenueProfitSlice'
import unitMaintenanceScheduleReducer from './slices/UnitMaintenanceScheduleSlice'
import techInfoReducer from './slices/TechInfoSlice'
import documentReducer from './slices/DocumentSlice'
import moduleReducer from './slices/ModuleSlice'
import authenReducer from './slices/AuthenSlice'
import refreshReducer from './slices/RefreshSlice'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
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

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
