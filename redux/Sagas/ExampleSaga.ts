
import { all, takeEvery } from 'redux-saga/effects';
import { callApiSample } from '../Actions/ExampleAction';

function* callApiSampleSaga(action: ReturnType<typeof callApiSample>) {
    console.log('ID:', action.payload.id)
    console.log('Name:', action.payload.name)
}


function* handleCallApiSaga() {
    yield takeEvery(callApiSample, callApiSampleSaga)
}
export function* exampleSagaList() {
    yield all([
        handleCallApiSaga(),
    ])
}