import { all, takeEvery, put, call } from 'redux-saga/effects'
import {
  getProductOutputByHours,
  getProductOutputOverview,
  getProductOutputByDays,
  getProductCummulativeOutput,
  getCompareProductOutput,
  getProductOutputOverviewFactDetail,
  getProductOutputByHoursFactDetail,
  getProductOutputByDaysFactDetail,
  getProductOutputCompareChart,
} from '../Actions/ProductOutputActions'
import { Service } from '@/core/service/productOutput'
import {
  setProductOutputByHours,
  setProductOutputOverview,
  setProductOutputByDays,
  setProductCummulativeOutput,
  setCompareProductOutput,
  setProductOutputCompareChart,
  setLoading,
} from '../slices/ProductOutputSlice'
import { catchHandle } from '@/core/utils/utils'

function* getProductOutputByHoursSaga(): Generator {
  try {
    yield put(setLoading({ isLoadingByHours: true }))
    const res = yield call(Service.getProductOutputByHoursApi)
    if (res.status === 200) {
      yield put(setProductOutputByHours(res.data))
    }
    yield put(setLoading({ isLoadingByHours: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingByHours: false }))
    catchHandle(error, 'getProductOutputByHoursSaga')
  }
}

function* getProductOutputOverviewSaga(): Generator {
  try {
    yield put(setLoading({ isLoadingOverview: true }))
    const res = yield call(Service.getProductOutputOverviewApi)
    if (res.status === 200) {
      yield put(setProductOutputOverview(res.data))
    }
    yield put(setLoading({ isLoadingOverview: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingOverview: false }))
    catchHandle(error, 'getProductOutputOverviewSaga')
  }
}

function* getProductOutputByDaysSaga(action: ReturnType<typeof getProductOutputByDays>): Generator {
  try {
    yield put(setLoading({ isLoadingNearCurrentDays: true }))
    const n = action.payload?.n || 7 // default is 7 days
    const samePeriodYear = action.payload?.samePeriodYear || new Date().getFullYear() - 1
    const res = yield call(Service.getProductOutputByDaysApi, n, samePeriodYear)
    if (res.status === 200) {
      yield put(setProductOutputByDays(res.data))
    }
    yield put(setLoading({ isLoadingNearCurrentDays: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingNearCurrentDays: false }))
    catchHandle(error, 'getProductOutputByDaysSaga')
  }
}

function* getProductCummulativeOutputSaga(action: ReturnType<typeof getProductCummulativeOutput>): Generator {
  try {
    yield put(setLoading({ isLoadingProductCummulativeOutput: true }))
    const params = action.payload
    const res = yield call(Service.getProductCummulativeOutputApi, params)
    if (res.status === 200) {
      yield put(setProductCummulativeOutput(res.data))
    }
    yield put(setLoading({ isLoadingProductCummulativeOutput: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingProductCummulativeOutput: false }))
    catchHandle(error, 'getProductCummulativeOutputSaga')
  }
}

function* getCompareProductOutputSaga(action: ReturnType<typeof getCompareProductOutput>): Generator {
  try {
    yield put(setLoading({ isLoadingCompareProductOutput: true }))
    const payload = action.payload as { tagetDate: string; compareDate: string; currentPlantId: string }
    const tagetDate = payload?.tagetDate || ''
    const compareDate = payload?.compareDate || ''
    const currentPlantId = payload?.currentPlantId || ''

    const res = yield call(Service.getCompareProductOutputApi, tagetDate, compareDate, currentPlantId)
    if (res.status === 200) {
      yield put(setCompareProductOutput(res.data))
    }
    yield put(setLoading({ isLoadingCompareProductOutput: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingCompareProductOutput: false }))
    catchHandle(error, 'getCompareProductOutputSaga')
  }
}

function* getProductOutputOverviewFactDetailSaga(
  action: ReturnType<typeof getProductOutputOverviewFactDetail>,
): Generator {
  try {
    const payload = action.payload
    const { factoryId, getDataFromApi, setLoading } = payload
    setLoading(true)
    const res = yield call(Service.getProductOutputOverviewFactDetailApi, factoryId)
    if (res.status === 200) {
      getDataFromApi(res.data)
    }
    setLoading(false)
  } catch (error) {
    setLoading(false)
    catchHandle(error, 'getProductOutputOverviewFactDetailSaga')
  }
}
function* getProductOutputByHoursFactDetailSaga(
  action: ReturnType<typeof getProductOutputByHoursFactDetail>,
): Generator {
  try {
    const payload = action.payload
    const { factoryId, getDataFromApi, setLoading } = payload
    setLoading(true)
    const res = yield call(Service.getProductOutputByHoursFactDetailApi, factoryId)
    if (res.status === 200) {
      getDataFromApi(res.data)
    }
    setLoading(false)
  } catch (error) {
    setLoading(false)
    catchHandle(error, 'getProductOutputByHoursFactDetailSaga')
  }
}
function* getProductOutputByDaysFactDetailSaga(action: ReturnType<typeof getProductOutputByDaysFactDetail>): Generator {
  try {
    const payload = action.payload
    const { factoryId, getDataFromApi, setLoading } = payload
    setLoading(true)
    const res = yield call(Service.getProductOutputByDaysFactDetailApi, factoryId)
    if (res.status === 200) {
      getDataFromApi(res.data)
    }
    setLoading(false)
  } catch (error) {
    setLoading(false)
    catchHandle(error, 'getProductOutputByDaysFactDetailSaga')
  }
}

function* getProductOutputCompareChartSaga(action: ReturnType<typeof getProductOutputCompareChart>): Generator {
  try {
    yield put(setLoading({ isLoadingProductOutputCompareChart: true }))
    const payload = action.payload as {
      currentFromDate: string
      currentToDate: string
      compareFromDate: string
      compareToDate: string
      currentPlantId: string
    }
    const currentFromDate = payload?.currentFromDate || ''
    const currentToDate = payload?.currentToDate || ''
    const compareFromDate = payload?.compareFromDate || ''
    const compareToDate = payload?.compareToDate || ''
    const currentPlantId = payload?.currentPlantId || ''

    const res = yield call(
      Service.getProductOutputCompareChartApi,
      currentFromDate,
      currentToDate,
      compareFromDate,
      compareToDate,
      currentPlantId,
    )

    if (res.status === 200) {
      yield put(setProductOutputCompareChart(res.data))
    }
    yield put(setLoading({ isLoadingProductOutputCompareChart: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingProductOutputCompareChart: false }))
    catchHandle(error, 'getProductOutputCompareChartSaga')
  }
}

function* handleGetProductOutputByHoursApi() {
  yield takeEvery(getProductOutputByHours, getProductOutputByHoursSaga)
}
function* handleGetProductOutputOverviewApi() {
  yield takeEvery(getProductOutputOverview, getProductOutputOverviewSaga)
}
function* handleGetProductOutputByDaysApi() {
  yield takeEvery(getProductOutputByDays, getProductOutputByDaysSaga)
}
function* handleGetProductCummulativeOutputApi() {
  yield takeEvery(getProductCummulativeOutput, getProductCummulativeOutputSaga)
}
function* handleGetCompareProductOutputApi() {
  yield takeEvery(getCompareProductOutput, getCompareProductOutputSaga)
}
function* handleGetProductOutputOverviewFactDetailApi() {
  yield takeEvery(getProductOutputOverviewFactDetail, getProductOutputOverviewFactDetailSaga)
}

function* getProductOutputByHoursFactDetailSagaApi() {
  yield takeEvery(getProductOutputByHoursFactDetail, getProductOutputByHoursFactDetailSaga)
}

function* getProductOutputByDaysFactDetailSagaApi() {
  yield takeEvery(getProductOutputByDaysFactDetail, getProductOutputByDaysFactDetailSaga)
}

function* getProductOutputCompareChartSagaApi() {
  yield takeEvery(getProductOutputCompareChart, getProductOutputCompareChartSaga)
}
export function* productOutputSagaList() {
  yield all([
    handleGetProductOutputByHoursApi(),
    handleGetProductOutputOverviewApi(),
    handleGetProductOutputByDaysApi(),
    handleGetProductCummulativeOutputApi(),
    handleGetCompareProductOutputApi(),
    handleGetProductOutputOverviewFactDetailApi(),
    getProductOutputByHoursFactDetailSagaApi(),
    getProductOutputByDaysFactDetailSagaApi(),
    getProductOutputCompareChartSagaApi(),
  ])
}
