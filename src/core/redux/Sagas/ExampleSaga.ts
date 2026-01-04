import { all, takeEvery } from 'redux-saga/effects'
import { callApiSample } from '../Actions/ExampleAction'

function* callApiSampleSaga(action: ReturnType<typeof callApiSample>) {
 
}

function* handleCallApiSaga() {
  yield takeEvery(callApiSample, callApiSampleSaga)
}
export function* exampleSagaList() {
  yield all([handleCallApiSaga()])
}
