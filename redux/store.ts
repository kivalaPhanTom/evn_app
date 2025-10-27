import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Sagas/RootSaga';
import exampleSlice from './slices/ExampleSlice';

let sagaMiddleware = createSagaMiddleware();

const allReducer = {
    exampleSlice,
}
const store = configureStore({
    reducer: {
        ...allReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga);
export default store