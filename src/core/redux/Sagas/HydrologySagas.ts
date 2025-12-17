import { all, takeEvery, put, call } from 'redux-saga/effects'
import {
  getHydrologyflowChart,
  getInflowOutflow,
  getHydrologyPlantsParam,
  getHydrographicChart,
  getHydrologyPlantsInfo,
} from '../Actions/HydrologyActions'
import { Service } from '@/core/service/hydrologyService'
import {
  setInflowOutflow,
  setHydrologyPlantsParam,
  setHydrologyChart,
  setFlowChartData,
  setHydrologyPlantsInfo,
} from '../slices/HydrologySlice'

function* getHydrographicChartSaga(action: ReturnType<typeof getHydrographicChart>): Generator {
  try {
    const payload = action.payload as { companyId: string }
    const companyId = payload?.companyId || ''
    const res = yield call(Service.getHydrologyGraphicChartApi, companyId)
    if (res.status === 200) {
      yield put(setHydrologyChart(res.data))
    }
  } catch (error) {

  }
}

function* getHydrologyflowChartApiSaga(action: ReturnType<typeof getHydrologyflowChart>): Generator {
  const payload = action.payload
  const { currentPlantId, date } = payload
  try {
    const res = yield call(Service.getHydrologyFlowApi, currentPlantId, date)
    if (res.status === 200) {
      yield put(setFlowChartData({
        flowChart: res.data.metrics,
        flowChartSummary: res.data.summary
      }))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
  } catch (error) {
    // console.log('getInflowOutflow error:', error)
  }
}

function* getInflowOutflowApiSaga(action: ReturnType<typeof getInflowOutflow>): Generator {
  try {
    const payload = action.payload as { hydroElectricId: string }
    // console.log('Fetching InflowOutflow with payload:', payload)
    const hydroElectricId = payload?.hydroElectricId || ''
    const res = yield call(Service.getInflowOutflowApi, hydroElectricId)
    if (res.status === 200) {
      // console.log('Inflow and Outflow chart data:', res.data)
      yield put(setInflowOutflow(res.data))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
  } catch (error) {
    // console.log('getInflowOutflow error:', error)
  }
}
function* getHydrologyChartApi() {
  yield takeEvery(getHydrographicChart, getHydrographicChartSaga)
}

function* getHydrologyPlantsParamApiSaga(): Generator {
  try {
    const res = yield call(Service.getHydrologyPlantsParamApi)
    if (res.status === 200) {
      yield put(setHydrologyPlantsParam(res.data))
    }
  } catch (error) {
    console.log('getHydrologyPlantsParam error:', error)
  }
}
function* getHydrologyPlantsInfoApiSaga(action: ReturnType<typeof getHydrologyPlantsInfo>): Generator {
  try {
    const payload = action.payload as { plantId: string }
    const plantId = payload?.plantId || ''
    const res = yield call(Service.getHydrologyPlantsInfoApi, plantId)
    if (res.status === 200) {
      yield put(setHydrologyPlantsInfo(res.data))
    }
  } catch (error) {
    console.log('getHydrologyPlantsInfo error:', error)
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

function* getHydrologyPlantsInfoApi() {
  yield takeEvery(getHydrologyPlantsInfo, getHydrologyPlantsInfoApiSaga)
}

export function* hydrologySagaList() {
  yield all([getHydrologyChartApi(), getHydrologyflowChartApi(), getInflowOutflowApi(), getHydrologyPlantsParamApi(), getHydrologyPlantsInfoApi()])
}
