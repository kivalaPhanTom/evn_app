import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './Sagas/RootSaga'
import exampleSlice from './slices/ExampleSlice'
import powerSlice from './slices/PowerSlice'
import productOutputSlice from './slices/ProductOutputSlice'
import hydrologySlice from './slices/HydrologySlice'
import powerFactDetailSlice from './slices/PowerFactDetailSlice'
import revenueProfitSlice from './slices/RevenueProfitSlice'
import homeSlice from './slices/HomeSlice'

let sagaMiddleware = createSagaMiddleware()

const allReducer = {
  exampleSlice,
  powerSlice,
  productOutputSlice,
  hydrologySlice,
  powerFactDetailSlice,
  revenueProfitSlice,
  homeSlice
}
const store = configureStore({
  reducer: {
    ...allReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false, // 🔥 cho phép function
    }).concat(sagaMiddleware),
// })
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>;
export default store
