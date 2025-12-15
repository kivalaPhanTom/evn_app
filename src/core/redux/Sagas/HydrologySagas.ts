import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getHydrologyflowChart, getInflowOutflow, getHydrographicChart } from '../Actions/HydrologyActions'
import { Service } from '@/core/service/hydrologyService'
import { setInflowOutflow, setHydrologyChart } from '../slices/HydrologySlice'

function* getHydrographicChartSaga(action: ReturnType<typeof getHydrographicChart>): Generator {
  try {
    const payload = action.payload as { companyId: string }
    console.log('PAYLOADD:', payload)
    const companyId = payload?.companyId || ''
    const res = yield call(Service.getHydrologyGraphicChartApi, companyId)
    console.log('redSSSSSSS:', res.data)
    if (res.status === 200) {
      yield put(setHydrologyChart(res.data))
    }
  } catch (error) {

  }
}

function* getHydrologyflowChartApiSaga(): Generator { }

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
function* getHydrologyChartApi() {
  yield takeEvery(getHydrographicChart, getHydrographicChartSaga)
}

function* getHydrologyflowChartApi() {
  yield takeEvery(getHydrologyflowChart, getHydrologyflowChartApiSaga)
}

function* getInflowOutflowApi() {
  yield takeEvery(getInflowOutflow, getInflowOutflowApiSaga)
}

export function* hydrologySagaList() {
  yield all([getHydrologyChartApi(), getHydrologyflowChartApi(), getInflowOutflowApi()])
}
