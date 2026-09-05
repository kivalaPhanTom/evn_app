import { all, takeEvery, takeLatest, put, call } from 'redux-saga/effects'
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
  getUpstreamWaterLevel_2,
  getUpstreamWaterLevel_3,
  getInflow2,
  getInflow3,
  getOutflow2,
  getOutflow3,
  getTurbineflow2,
  getTurbineflow3,
  getHydrologyComparison,
  HydrologyComparisonPayload,
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
  setLoading,
  setHydrologyComparisonData,
} from '../slices/HydrologySlice'
import { catchHandle } from '@/core/utils/utils'

function* getHydrologyComparisonSaga(action: ReturnType<typeof getHydrologyComparison>): Generator {
  try {
    const payload: HydrologyComparisonPayload = action.payload
    const requests =
      payload.version === 2
        ? [
            call(
              Service.getUpstreamWaterLevelApi_2,
              payload.currentPlantId,
              payload.currentDate,
              payload.compareDate,
              payload.type,
            ),
            call(
              Service.getInflowApi_2,
              payload.currentPlantId,
              payload.currentDate,
              payload.compareDate,
              payload.type,
            ),
            call(
              Service.getOutflowApi_2,
              payload.currentPlantId,
              payload.currentDate,
              payload.compareDate,
              payload.type,
            ),
            call(
              Service.getTurbineFlowApi_2,
              payload.currentPlantId,
              payload.currentDate,
              payload.compareDate,
              payload.type,
            ),
          ]
        : [
            call(
              Service.getUpstreamWaterLevelApi_3,
              payload.currentPlantId,
              payload.currentFromDate,
              payload.currentToDate,
              payload.compareFromDate,
              payload.compareToDate,
              payload.type,
            ),
            call(
              Service.getInflowApi_3,
              payload.currentPlantId,
              payload.currentFromDate,
              payload.currentToDate,
              payload.compareFromDate,
              payload.compareToDate,
              payload.type,
            ),
            call(
              Service.getOutflowApi_3,
              payload.currentPlantId,
              payload.currentFromDate,
              payload.currentToDate,
              payload.compareFromDate,
              payload.compareToDate,
              payload.type,
            ),
            call(
              Service.getTurbineFlowApi_3,
              payload.currentPlantId,
              payload.currentFromDate,
              payload.currentToDate,
              payload.compareFromDate,
              payload.compareToDate,
              payload.type,
            ),
          ]

    // Chay 4 request song song, sau do day toan bo ket qua vao Redux trong mot lan.
    const [upstreamResponse, inflowResponse, outflowResponse, turbineResponse]: any[] = yield all(requests)
    yield put(
      setHydrologyComparisonData({
        upstreamWaterLevel: upstreamResponse.data,
        inflow: inflowResponse.data,
        outflow: outflowResponse.data,
        turbineflow: turbineResponse.data,
      }),
    )
  } catch (error) {
    catchHandle(error, 'getHydrologyComparisonSaga')
  }
}

function* getHydrographicChartSaga(action: ReturnType<typeof getHydrographicChart>): Generator {
  try {
    yield put(setLoading({ isLoadingHydrologyChart: true }))
    const payload = action.payload as { companyId: string; type: string }
    const companyId = payload?.companyId || ''
    const type = payload?.type || ''
    const res = yield call(Service.getHydrologyGraphicChartApi, companyId, type)
    if (res.status === 200) {
      yield put(setHydrologyChart(res.data))
    }
    yield put(setLoading({ isLoadingHydrologyChart: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingHydrologyChart: false }))
    catchHandle(error, 'getHydrographicChartSaga')
  }
}

function* getHydrologyflowChartApiSaga(action: ReturnType<typeof getHydrologyflowChart>): Generator {
  const payload = action.payload
  const { currentPlantId, date } = payload
  try {
    yield put(setLoading({ isLoadingFlowChart: true }))
    const res = yield call(Service.getHydrologyFlowApi, currentPlantId, date)
    if (res.status === 200) {
      yield put(setFlowChartData({ flowChart: res.data.metrics, flowChartSummary: res.data.summary }))
    }
    yield put(setLoading({ isLoadingFlowChart: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingFlowChart: false }))
    catchHandle(error, 'getHydrologyflowChartApiSaga')
  }
}

function* getInflowOutflowApiSaga(action: ReturnType<typeof getInflowOutflow>): Generator {
  try {
    yield put(setLoading({ isLoadingInflowOutflow: true }))
    const payload = action.payload as { hydroElectricId: string }
    const hydroElectricId = payload?.hydroElectricId || ''
    const res = yield call(Service.getInflowOutflowApi, hydroElectricId)
    if (res.status === 200) {
      yield put(setInflowOutflow(res.data))
    }
    yield put(setLoading({ isLoadingInflowOutflow: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingInflowOutflow: false }))
    catchHandle(error, 'getInflowOutflowApiSaga')
  }
}

function* getUpstreamWaterLevelApiSaga(action: ReturnType<typeof getUpstreamWaterLevel>): Generator {
  try {
    const payload = action.payload as { currentPlantId: string; date: string }
    const currentPlantId = payload?.currentPlantId || ''
    const date = payload?.date || ''
    const res = yield call(Service.getUpstreamWaterLevelApi, currentPlantId, date)
    if (res.status === 200) {
      yield put(setUpStreamWaterLevel(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getUpstreamWaterLevelApiSaga')
  }
}

function* getUpstreamWaterLevel_2ApiSaga(action: ReturnType<typeof getUpstreamWaterLevel_2>): Generator {
  try {
    const payload = action.payload as {
      version: string
      currentPlantId: string
      currentDate: string
      compareDate: string
      type: string
    }
    const currentPlantId = payload?.currentPlantId || ''
    const currentDate = payload?.currentDate || ''
    const compareDate = payload?.compareDate || ''
    const type = payload?.type || ''
    const res = yield call(Service.getUpstreamWaterLevelApi_2, currentPlantId, currentDate, compareDate, type)
    if (res.status === 200) {
      yield put(setUpStreamWaterLevel(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getUpstreamWaterLevel_2ApiSaga')
  }
}

function* getUpstreamWaterLevel_3ApiSaga(action: ReturnType<typeof getUpstreamWaterLevel_3>): Generator {
  try {
    const payload = action.payload as {
      currentPlantId: string
      currentFromDate: string
      currentToDate: string
      compareFromDate: string
      compareToDate: string
      type: string
    }
    const currentPlantId = payload?.currentPlantId || ''
    const currentFromDate = payload?.currentFromDate || ''
    const currentToDate = payload?.currentToDate || ''
    const compareFromDate = payload?.compareFromDate || ''
    const compareToDate = payload?.compareToDate || ''
    const type = payload?.type || ''
    const res = yield call(
      Service.getUpstreamWaterLevelApi_3,
      currentPlantId,
      currentFromDate,
      currentToDate,
      compareFromDate,
      compareToDate,
      type,
    )
    if (res.status === 200) {
      yield put(setUpStreamWaterLevel(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getUpstreamWaterLevel_3ApiSaga')
  }
}

function* getInflowApiSaga(action: ReturnType<typeof getInflow>): Generator {
  try {
    const payload = action.payload as { currentPlantId: string; date: string }
    const currentPlantId = payload?.currentPlantId || ''
    const date = payload?.date || ''
    const res = yield call(Service.getInflowApi, currentPlantId, date)
    if (res.status === 200) {
      yield put(setInflow(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getInflowApiSaga')
  }
}

function* getInflow2ApiSaga(action: ReturnType<typeof getInflow2>): Generator {
  try {
    const payload = action.payload as { currentPlantId: string; currentDate: string; compareDate: string; type: string }
    const currentPlantId = payload?.currentPlantId || ''
    const currentDate = payload?.currentDate || ''
    const compareDate = payload?.compareDate || ''
    const type = payload?.type || ''
    const res = yield call(Service.getInflowApi_2, currentPlantId, currentDate, compareDate, type)
    if (res.status === 200) {
      yield put(setInflow(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getInflow2ApiSaga')
  }
}

function* getInflow3ApiSaga(action: ReturnType<typeof getInflow3>): Generator {
  try {
    const payload = action.payload as {
      currentPlantId: string
      currentFromDate: string
      currentToDate: string
      compareFromDate: string
      compareToDate: string
      type: string
    }
    const res = yield call(
      Service.getInflowApi_3,
      currentPlantId,
      currentFromDate,
      currentToDate,
      compareFromDate,
      compareToDate,
      type,
    )
    if (res.status === 200) {
      yield put(setInflow(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getInflow3ApiSaga')
  }
}

function* getOutflowApiSaga(action: ReturnType<typeof getOutflow>): Generator {
  try {
    const payload = action.payload as { currentPlantId: string; date: string }
    const currentPlantId = payload?.currentPlantId || ''
    const date = payload?.date || ''
    const res = yield call(Service.getOutflowApi, currentPlantId, date)
    if (res.status === 200) {
      yield put(setOutflow(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getOutflowApiSaga')
  }
}

function* getOutflow2ApiSaga(action: ReturnType<typeof getOutflow2>): Generator {
  try {
    const payload = action.payload as {
      version: string
      currentPlantId: string
      currentDate: string
      compareDate: string
      type: string
    }
    if (res.status === 200) {
      yield put(setOutflow(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getOutflow2ApiSaga')
  }
}

function* getOutflow3ApiSaga(action: ReturnType<typeof getOutflow3>): Generator {
  try {
    const payload = action.payload as {
      currentPlantId: string
      currentFromDate: string
      currentToDate: string
      compareFromDate: string
      compareToDate: string
      type: string
    }
    const res = yield call(
      Service.getOutflowApi_3,
      currentPlantId,
      currentFromDate,
      currentToDate,
      compareFromDate,
      compareToDate,
      type,
    )
    if (res.status === 200) {
      yield put(setOutflow(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getOutflow3ApiSaga')
  }
}

function* getTurbineflowApiSaga(action: ReturnType<typeof getTurbineflow>): Generator {
  try {
    const payload = action.payload as { currentPlantId: string; date: string }
    const currentPlantId = payload?.currentPlantId || ''
    const date = payload?.date || ''
    const res = yield call(Service.getTurbineFlowApi, currentPlantId, date)
    if (res.status === 200) {
      yield put(setTurbineflow(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getTurbineflowApiSaga')
  }
}

function* getTurbineflow2ApiSaga(action: ReturnType<typeof getTurbineflow2>): Generator {
  try {
    const payload = action.payload as {
      version: string
      currentPlantId: string
      currentDate: string
      compareDate: string
      type: string
    }
    if (res.status === 200) {
      yield put(setTurbineflow(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getTurbineflow2ApiSaga')
  }
}

function* getTurbineflow3ApiSaga(action: ReturnType<typeof getTurbineflow3>): Generator {
  try {
    const payload = action.payload as {
      currentPlantId: string
      currentFromDate: string
      currentToDate: string
      compareFromDate: string
      compareToDate: string
      type: string
    }
    const currentPlantId = payload?.currentPlantId || ''
    const res = yield call(
      Service.getTurbineFlowApi_3,
      currentPlantId,
      currentFromDate,
      currentToDate,
      compareFromDate,
      compareToDate,
      type,
    )
    if (res.status === 200) {
      yield put(setTurbineflow(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getTurbineflow3ApiSaga')
  }
}

function* getHydrologyChartApi() {
  yield takeLatest(getHydrographicChart, getHydrographicChartSaga)
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
    catchHandle(error, 'getHydrologyPlantsParamApiSaga')
  }
}

function* getHydrologyPlantsInfoApiSaga(action: ReturnType<typeof getHydrologyPlantsInfo>): Generator {
  try {
    const payload = action.payload as { plantId: string; date: string }
    const plantId = payload?.plantId || ''
    const date = payload?.date || ''
    const res = yield call(Service.getHydrologyPlantsInfoApi, plantId, date)
    if (res.status === 200) {
      yield put(setHydrologyPlantsInfo(res.data))
    }
  } catch (error) {
    catchHandle(error, 'getHydrologyPlantsInfoApiSaga')
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
    catchHandle(error, 'getOperateWaterLevelApiSaga')
  }
}

function* getHydrologyflowChartApi() { yield takeLatest(getHydrologyflowChart, getHydrologyflowChartApiSaga) }
function* getInflowOutflowApi() { yield takeLatest(getInflowOutflow, getInflowOutflowApiSaga) }
function* getPowerStoreInLakeApi() { yield takeLatest(getPowerStoreInLake, getPowerStoreInLakeApiSaga) }
function* getPowerStoreInLakeFactDetailApi() { yield takeLatest(getPowerStoreInLakeFactDetail, getPowerStoreInLakeFactDetailApiSaga) }
function* getHydrologyPlantsParamApi() { yield takeLatest(getHydrologyPlantsParam, getHydrologyPlantsParamApiSaga) }
function* getHydrologyPlantsInfoApi() { yield takeLatest(getHydrologyPlantsInfo, getHydrologyPlantsInfoApiSaga) }
function* getUpstreamWaterLevelApi() { yield takeLatest(getUpstreamWaterLevel, getUpstreamWaterLevelApiSaga) }
function* getUpstreamWaterLevel2Saga() { yield takeLatest(getUpstreamWaterLevel_2, getUpstreamWaterLevel_2ApiSaga) }
function* getUpstreamWaterLevel3Saga() { yield takeLatest(getUpstreamWaterLevel_3, getUpstreamWaterLevel_3ApiSaga) }
function* getInflowApi() { yield takeLatest(getInflow, getInflowApiSaga) }
function* getInflow2Saga() { yield takeLatest(getInflow2, getInflow2ApiSaga) }
function* getInflow3Saga() { yield takeLatest(getInflow3, getInflow3ApiSaga) }
function* getOutflowApi() { yield takeLatest(getOutflow, getOutflowApiSaga) }
function* getOutflow2Saga() { yield takeLatest(getOutflow2, getOutflow2ApiSaga) }
function* getOutflow3Saga() { yield takeLatest(getOutflow3, getOutflow3ApiSaga) }
function* getTurbineflowApi() { yield takeLatest(getTurbineflow, getTurbineflowApiSaga) }
function* getTurbine2Saga() { yield takeLatest(getTurbineflow2, getTurbineflow2ApiSaga) }
function* getTurbine3Saga() { yield takeLatest(getTurbineflow3, getTurbineflow3ApiSaga) }
function* getOperateWaterLevelApi() { yield takeLatest(getOperateWaterLevel, getOperateWaterLevelApiSaga) }

function* getHydrologyComparisonWatcher() {
  // Chi lua chon bo loc moi nhat duoc phep cap nhat 4 bieu do so sanh.
  yield takeLatest(getHydrologyComparison, getHydrologyComparisonSaga)
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
    getUpstreamWaterLevel2Saga(),
    getUpstreamWaterLevel3Saga(),
    getInflow2Saga(),
    getInflow3Saga(),
    getOutflow2Saga(),
    getOutflow3Saga(),
    getTurbine2Saga(),
    getTurbine3Saga(),
    getHydrologyComparisonWatcher(),
  ])
}
