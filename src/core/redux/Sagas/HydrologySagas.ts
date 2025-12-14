import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getHydrologyflowChart, getInflowOutflow, getHydrologyPlantsParam } from '../Actions/HydrologyActions'
import { Service } from '@/core/service/hydrologyService'
import { setInflowOutflow, setHydrologyPlantsParam } from '../slices/HydrologySlice'

function* getHydrologyflowChartApiSaga(): Generator {}

function* getInflowOutflowApiSaga(action: ReturnType<typeof getInflowOutflow>): Generator {
  try {
    const payload = action.payload as { hydroElectricId: string }
    console.log('Fetching InflowOutflow with payload:', payload)
    const hydroElectricId = payload?.hydroElectricId || ''
    const res = yield call(Service.getInflowOutflowApi, hydroElectricId)
    if (res.status === 200) {
      console.log('Inflow and Outflow chart data:', res.data)
      yield put(setInflowOutflow(res.data))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
  } catch (error) {
    console.log('getInflowOutflow error:', error)
  }
}

function* getHydrologyPlantsParamApiSaga(): Generator {
  try {
    const res = yield call(Service.getHydrologyPlantsParamApi)
    if (res.status === 200) {
      console.log('Hydrology plants param data:', res.data)
      yield put(setHydrologyPlantsParam(res.data))
    }
  } catch (error) {
    console.log('getHydrologyPlantsParam error:', error)
  }
}
function* getHydrologyflowChartApi() {
  yield takeEvery(getHydrologyflowChart, getHydrologyflowChartApiSaga)
}

function* getInflowOutflowApi() {
  yield takeEvery(getInflowOutflow, getInflowOutflowApiSaga)
}

function* getHydrologyPlantsParamApi() {
  yield takeEvery(getHydrologyPlantsParam, getHydrologyPlantsParamApiSaga)
}

export function* hydrologySagaList() {
  yield all([getHydrologyflowChartApi(), getInflowOutflowApi(), getHydrologyPlantsParamApi()])
}
