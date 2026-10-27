import { all, takeLatest, put, call } from 'redux-saga/effects'
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
} from './production-output.actions'
import { Service } from '@/core/service/productOutput'
import {
  setProductOutputByHours,
  setProductOutputOverview,
  setProductOutputByDays,
  setProductCummulativeOutput,
  setCompareProductOutput,
  setProductOutputCompareChart,
  setLoading,
} from './production-output.slice'
import { catchHandle } from '@/core/utils/utils'

function* getProductOutputByHoursSaga(action: ReturnType<typeof getProductOutputByHours>): Generator {
  try {
    yield put(setLoading({ isLoadingByHours: true }))
    const companyId = action.payload?.companyId || ''
    const res = yield call(Service.getProductOutputByHoursApi, companyId)
    if (res.status === 200) {
      yield put(setProductOutputByHours(res.data?.data ?? res.data))
    }
    yield put(setLoading({ isLoadingByHours: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingByHours: false }))
    catchHandle(error, 'getProductOutputByHoursSaga')
  }
}

function* getProductOutputOverviewSaga(action: ReturnType<typeof getProductOutputOverview>): Generator {
  try {
    yield put(setLoading({ isLoadingOverview: true }))
    const companyId = action.payload?.companyId || ''
    const res = yield call(Service.getProductOutputOverviewApi, companyId)
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
    const n = action.payload?.n || 7
    const samePeriodYear = action.payload?.samePeriodYear || new Date().getFullYear() - 1
    const companyId = action.payload?.companyId || ''
    const res = yield call(Service.getProductOutputByDaysApi, n, samePeriodYear, companyId)
    if (res.status === 200) {
      const raw = res.data?.data
      const list = Array.isArray(raw) ? raw : raw?.detail
      yield put(setProductOutputByDays(list ?? []))
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
      yield put(setProductCummulativeOutput(res.data?.data ?? res.data))
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
    const payload = action.payload as { tagetDate: string; compareDate: string; currentPlantId: string; companyId?: string | null }
    const tagetDate = payload?.tagetDate || ''
    const compareDate = payload?.compareDate || ''
    const currentPlantId = payload?.currentPlantId || ''
    const companyId = payload?.companyId || ''
    const res = yield call(Service.getCompareProductOutputApi, tagetDate, compareDate, currentPlantId, companyId)
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
    const { factoryId, companyId, getDataFromApi, setLoading } = payload
    setLoading(true)
    const res = yield call(Service.getProductOutputOverviewFactDetailApi, factoryId, companyId || '')
    if (res.status === 200) {
      getDataFromApi(res.data.data)
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
    const { factoryId, companyId, getDataFromApi, setLoading } = payload
    setLoading(true)
    const res = yield call(Service.getProductOutputByHoursFactDetailApi, factoryId, companyId || '')
    if (res.status === 200) {
      getDataFromApi(res.data?.data ?? res.data)
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
    const { factoryId, companyId, samePeriod, getDataFromApi, setLoading } = payload
    setLoading(true)
    const res = yield call(Service.getProductOutputByDaysFactDetailApi, factoryId, companyId || '', samePeriod || new Date().getFullYear() - 1)
    if (res.status === 200) {
      const raw = res.data?.data
      const list = Array.isArray(raw) ? raw : raw?.detail
      getDataFromApi(list ?? [])
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
      companyId?: string | null
    }
    const res = yield call(
      Service.getProductOutputCompareChartApi,
      payload.currentFromDate,
      payload.currentToDate,
      payload.compareFromDate,
      payload.compareToDate,
      payload.currentPlantId,
      payload.companyId || '',
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
  yield takeLatest(getProductOutputByHours, getProductOutputByHoursSaga)
}
function* handleGetProductOutputOverviewApi() {
  yield takeLatest(getProductOutputOverview, getProductOutputOverviewSaga)
}
function* handleGetProductOutputByDaysApi() {
  yield takeLatest(getProductOutputByDays, getProductOutputByDaysSaga)
}
function* handleGetProductCummulativeOutputApi() {
  yield takeLatest(getProductCummulativeOutput, getProductCummulativeOutputSaga)
}
function* handleGetCompareProductOutputApi() {
  yield takeLatest(getCompareProductOutput, getCompareProductOutputSaga)
}
function* handleGetProductOutputOverviewFactDetailApi() {
  yield takeLatest(getProductOutputOverviewFactDetail, getProductOutputOverviewFactDetailSaga)
}
function* handleGetProductOutputByHoursFactDetailApi() {
  yield takeLatest(getProductOutputByHoursFactDetail, getProductOutputByHoursFactDetailSaga)
}
function* handleGetProductOutputByDaysFactDetailApi() {
  yield takeLatest(getProductOutputByDaysFactDetail, getProductOutputByDaysFactDetailSaga)
}
function* handleGetProductOutputCompareChartApi() {
  yield takeLatest(getProductOutputCompareChart, getProductOutputCompareChartSaga)
}

export function* productOutputSagaList() {
  yield all([
    handleGetProductOutputByHoursApi(),
    handleGetProductOutputOverviewApi(),
    handleGetProductOutputByDaysApi(),
    handleGetProductCummulativeOutputApi(),
    handleGetCompareProductOutputApi(),
    handleGetProductOutputOverviewFactDetailApi(),
    handleGetProductOutputByHoursFactDetailApi(),
    handleGetProductOutputByDaysFactDetailApi(),
    handleGetProductOutputCompareChartApi(),
  ])
}
