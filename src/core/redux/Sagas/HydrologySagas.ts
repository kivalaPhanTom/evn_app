import { all, takeEvery, put, call } from 'redux-saga/effects'
import {
  getHydrologyflowChart,
  getInflowOutflow,
  getHydrologyPlantsParam,
  getHydrographicChart,
  getUpstreamWaterLevel,
  getInflow,
  getOutflow,
  getTurbineflow,
} from '../Actions/HydrologyActions'
import { Service } from '@/core/service/hydrologyService'
import {
  setInflowOutflow,
  setHydrologyPlantsParam,
  setHydrologyChart,
  setFlowChartData,
  setUpStreamWaterLevel,
  setInflow,
  setOutflow,
  setTurbineflow,
} from '../slices/HydrologySlice'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

function* getHydrographicChartSaga(action: ReturnType<typeof getHydrographicChart>): Generator {
  try {
    const payload = action.payload as { companyId: string }
    const companyId = payload?.companyId || ''
    const res = yield call(Service.getHydrologyGraphicChartApi, companyId)
    if (res.status === 200) {
      yield put(setHydrologyChart(res.data))
    }
  } catch (error) {}
}

function* getHydrologyflowChartApiSaga(action: ReturnType<typeof getHydrologyflowChart>): Generator {
  const payload = action.payload
  const { currentPlantId, date } = payload
  try {
    const res = yield call(Service.getHydrologyFlowApi, currentPlantId, date)
    if (res.status === 200) {
      yield put(
        setFlowChartData({
          flowChart: res.data.metrics,
          flowChartSummary: res.data.summary,
        }),
      )
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

function* getUpstreamWaterLevelApiSaga(action: ReturnType<typeof getUpstreamWaterLevel>): Generator {
  try {
    const payload = action.payload as { currentPlantId: string; date: string }
    // console.log('Fetching InflowOutflow with payload:', payload)
    const currentPlantId = payload?.currentPlantId || ''
    const date = payload?.date || ''

    const res = yield call(Service.getUpstreamWaterLevelApi, currentPlantId, date)
    if (res.status === 200) {
      console.log('upstream chart dataaaaaaa:', res.data)
      yield put(setUpStreamWaterLevel(res.data))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
  } catch (error) {
    // console.log('getInflowOutflow error:', error)
  }
}

function* getInflowApiSaga(action: ReturnType<typeof getInflow>): Generator {
  try {
    const payload = action.payload as { currentPlantId: string; date: string }
    // console.log('Fetching InflowOutflow with payload:', payload)
    const currentPlantId = payload?.currentPlantId || ''
    const date = payload?.date || ''

    const res = yield call(Service.getInflowApi, currentPlantId, date)
    if (res.status === 200) {
      // console.log('Inflow and Outflow chart data:', res.data)
      yield put(setInflow(res.data))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
  } catch (error) {
    // console.log('getInflowOutflow error:', error)
  }
}

function* getOutflowApiSaga(action: ReturnType<typeof getInflow>): Generator {
  try {
    const payload = action.payload as { currentPlantId: string; date: string }
    // console.log('Fetching InflowOutflow with payload:', payload)
    const currentPlantId = payload?.currentPlantId || ''
    const date = payload?.date || ''

    const res = yield call(Service.getOutflowApi, currentPlantId, date)
    if (res.status === 200) {
      // console.log('Inflow and Outflow chart data:', res.data)
      yield put(setOutflow(res.data))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
  } catch (error) {
    // console.log('getInflowOutflow error:', error)
  }
}

function* getTurbineflowApiSaga(action: ReturnType<typeof getInflow>): Generator {
  try {
    const payload = action.payload as { currentPlantId: string; date: string }
    // console.log('Fetching InflowOutflow with payload:', payload)
    const currentPlantId = payload?.currentPlantId || ''
    const date = payload?.date || ''

    const res = yield call(Service.getTurbineFlowApi, currentPlantId, date)
    if (res.status === 200) {
      // console.log('Inflow and Outflow chart data:', res.data)
      yield put(setTurbineflow(res.data))
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
function* getHydrologyflowChartApi() {
  yield takeEvery(getHydrologyflowChart, getHydrologyflowChartApiSaga)
}

function* getInflowOutflowApi() {
  yield takeEvery(getInflowOutflow, getInflowOutflowApiSaga)
}

function* getHydrologyPlantsParamApi() {
  yield takeEvery(getHydrologyPlantsParam, getHydrologyPlantsParamApiSaga)
}

function* getUpstreamWaterLevelApi() {
  yield takeEvery(getUpstreamWaterLevel, getUpstreamWaterLevelApiSaga)
}

function* getInflowApi() {
  yield takeEvery(getInflow, getInflowApiSaga)
}

function* getOutflowApi() {
  yield takeEvery(getOutflow, getOutflowApiSaga)
}

function* getTurbineflowApi() {
  yield takeEvery(getTurbineflow, getTurbineflowApiSaga)
}

export function* hydrologySagaList() {
  yield all([
    getHydrologyChartApi(),
    getHydrologyflowChartApi(),
    getInflowOutflowApi(),
    getHydrologyPlantsParamApi(),
    getUpstreamWaterLevelApi(),
    getInflowApi(),
    getOutflowApi(),
    getTurbineflowApi(),
  ])
}
