import { all, takeEvery, put, call } from 'redux-saga/effects'
import {
  getHydrologyflowChart,
  getInflowOutflow,
  getHydrologyPlantsParam,
  getHydrographicChart,
  getHydrologyPlantsInfo,
  getUpstreamWaterLevel,
  getInflow,
  getOutflow,
  getTurbineflow,
  getPowerStoreInLake,
  getOperateWaterLevel,
  getPowerStoreInLakeFactDetail,
} from '../Actions/HydrologyActions'
import { Service } from '@/core/service/hydrologyService'
import {
  setInflowOutflow,
  setHydrologyPlantsParam,
  setCurrentHydrologyPlant,
  setHydrologyChart,
  setFlowChartData,
  setHydrologyPlantsInfo,
  setUpStreamWaterLevel,
  setInflow,
  setOutflow,
  setTurbineflow,
  setPowerStoreInLake,
  setOperateWaterLevel,
  setPowerStoreInLakeFactDetail,
  setLoading
} from '../slices/HydrologySlice'
import { catchHandle } from '@/core/utils/utils'

function* getHydrographicChartSaga(action: ReturnType<typeof getHydrographicChart>): Generator {
  try {
    yield put(setLoading({ isLoadingHydrologyChart: true }))
    const payload = action.payload as { companyId: string }
    const companyId = payload?.companyId || ''
    const res = yield call(Service.getHydrologyGraphicChartApi, companyId)
    if (res.status === 200) {
      yield put(setHydrologyChart(res.data))
    }
    yield put(setLoading({ isLoadingHydrologyChart: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingHydrologyChart: false }))
  }
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
    yield put(setLoading({ isLoadingInflowOutflow: true }))
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
    yield put(setLoading({ isLoadingInflowOutflow: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingInflowOutflow: false }))
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

function* getHydrologyPlantsParamApiSaga(action: ReturnType<typeof getHydrologyPlantsParam>): Generator {
  try {
    const payload = action.payload as { currentPlantId?: string }
    const currentPlantId = payload?.currentPlantId
    const res = yield call(Service.getHydrologyPlantsParamApi, currentPlantId)
    if (res.status === 200 && !currentPlantId) {
      yield put(setHydrologyPlantsParam(res.data))
    } else if (res.status === 200 && currentPlantId) {
      yield put(setCurrentHydrologyPlant(res.data))
    }
  } catch (error) {
    console.log('getHydrologyPlantsParam error:', error)
  }
}
function* getHydrologyPlantsInfoApiSaga(action: ReturnType<typeof getHydrologyPlantsInfo>): Generator {
  try {
    const payload = action.payload as { plantId: string, date: string }
    const plantId = payload?.plantId || '';
    const date = payload?.date || '';
    const res = yield call(Service.getHydrologyPlantsInfoApi, plantId, date)
    if (res.status === 200) {
      yield put(setHydrologyPlantsInfo(res.data))
    }
  } catch (error) {
    console.log('getHydrologyPlantsInfo error:', error)
  }
}

function* getPowerStoreInLakeApiSaga(): Generator {
  try {
    yield put(setLoading({ isLoadingPowerStoreInLake: true }))

    const res = yield call(Service.getPowerStoreInLake)
    if (res.status === 200) {
      yield put(setPowerStoreInLake(res.data))
    }
    yield put(setLoading({ isLoadingPowerStoreInLake: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingPowerStoreInLake: false }))
    catchHandle(error, 'getPowerStoreInLakeApiSaga')
  }
}

function* getPowerStoreInLakeFactDetailApiSaga(action: ReturnType<typeof getPowerStoreInLakeFactDetail>): Generator {
  try {
    const payload = action.payload
    const currentPlantId = payload?.currentPlantId || ''
    const res = yield call(Service.getPowerStoreInLakeFactDetail, currentPlantId)
    if (res.status === 200) {
      yield put(setPowerStoreInLakeFactDetail(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getPowerStoreInLakeFactDetailApiSaga')
  }
}

function* getOperateWaterLevelApiSaga(action: ReturnType<typeof getOperateWaterLevel>): Generator {
  try {
    const payload = action.payload as { selectedMonth: string }
    const selectedMonth = payload?.selectedMonth || ''
    const res = yield call(Service.getOperateWaterLevel, selectedMonth)
    if (res.status === 200) {
      yield put(setOperateWaterLevel(res.data))
    }
  } catch (error) {
    console.log('OperateWaterLevel error:', error)
  }
}

function* getHydrologyflowChartApi() {
  yield takeEvery(getHydrologyflowChart, getHydrologyflowChartApiSaga)
}

function* getInflowOutflowApi() {
  yield takeEvery(getInflowOutflow, getInflowOutflowApiSaga)
}

function* getPowerStoreInLakeApi() {
  yield takeEvery(getPowerStoreInLake, getPowerStoreInLakeApiSaga)
}

function* getPowerStoreInLakeFactDetailApi() {
  yield takeEvery(getPowerStoreInLakeFactDetail, getPowerStoreInLakeFactDetailApiSaga)
}

function* getHydrologyPlantsParamApi() {
  yield takeEvery(getHydrologyPlantsParam, getHydrologyPlantsParamApiSaga)
}

function* getHydrologyPlantsInfoApi() {
  yield takeEvery(getHydrologyPlantsInfo, getHydrologyPlantsInfoApiSaga)
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

function* getOperateWaterLevelApi() {
  yield takeEvery(getOperateWaterLevel, getOperateWaterLevelApiSaga)
}

export function* hydrologySagaList() {
  yield all([
    getHydrologyChartApi(),
    getHydrologyflowChartApi(),
    getInflowOutflowApi(),
    getHydrologyPlantsParamApi(),
    getHydrologyPlantsInfoApi(),
    getUpstreamWaterLevelApi(),
    getInflowApi(),
    getOutflowApi(),
    getTurbineflowApi(),
    getPowerStoreInLakeApi(),
    getPowerStoreInLakeFactDetailApi(),
    getOperateWaterLevelApi(),
  ])
}