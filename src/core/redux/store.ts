import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './Sagas/RootSaga'
import exampleSlice from './slices/ExampleSlice'
import powerSlice from './slices/PowerSlice'
import productOutputSlice from './slices/ProductOutputSlice'
import hydrologySlice from './slices/HydrologySlice'

let sagaMiddleware = createSagaMiddleware()

const allReducer = {
  exampleSlice,
  powerSlice,
  productOutputSlice,
  hydrologySlice
}
const store = configureStore({
  reducer: {
    ...allReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>;
export default store
