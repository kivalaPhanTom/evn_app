import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getHydrologyflowChart } from '../Actions/HydrologyActions'
import { Service } from '@/core/service/hydrologyService'

function* getHydrologyflowChartApiSaga(): Generator {

}

function* getHydrologyflowChartApi() {
  yield takeEvery(getHydrologyflowChart, getHydrologyflowChartApiSaga)
}

export function* hydrologySagaList() {
  yield all([
    getHydrologyflowChartApi(),
   
  ])
}
