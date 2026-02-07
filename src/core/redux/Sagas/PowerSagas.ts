import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getPowerOverivew, getPowerByTime, getPowerByDays, getComparePower, getPowerOverivewFactDetail,
getPowerByTimeFactDetail, getPowerByDaysFactDetail } from '../Actions/PowerActions'
import { setPowerOverview, setPowerByTime, setPowerByDays, setComparePower, setLoading } from '../slices/PowerSlice'
import { Service } from '@/core/service/powerService'
import { catchHandle } from '@/core/utils/utils'

function* getPowerOverviewSaga(): Generator {
  try {
    yield put(setLoading({ isLoadingOverview: true }))
    const res = yield call(Service.getPowerOverviewApi)
    if (res.status === 200) {
      yield put(setPowerOverview(res.data))
    }
    yield put(setLoading({ isLoadingOverview: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingOverview: false }))
    catchHandle(error, 'getPowerOverviewSaga')
  }
}

function* getPowerOverviewFactDetailSaga(action: ReturnType<typeof getPowerOverivewFactDetail>): Generator {
  try {
    const payload = action.payload
    const { factoryId, getDataFromApi, setLoading } = payload
    setLoading(true)
    const res = yield call(Service.getPowerOverviewFactDetailApi, factoryId)
    if (res.status === 200) {
      getDataFromApi(res.data)
    }
    setLoading(false)
  } catch (error) {
    catchHandle(error, 'getPowerOverviewFactDetailSaga')
    setLoading(false)
  }
}

function* getPowerByTimeSaga(): Generator {
  try {
    yield put(setLoading({ isLoadingByHours: true }))
    const res = yield call(Service.getPowerByTimeApi)
    if (res.status === 200) {
      yield put(setPowerByTime(res.data))
    }
    yield put(setLoading({ isLoadingByHours: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingByHours: false }))
    catchHandle(error, 'getPowerByTimeSaga')
  }
}

function* getPowerByTimeFactDetailSaga(action: ReturnType<typeof getPowerByTimeFactDetail>): Generator {
  try {
    const payload = action.payload
    const { factoryId, getDataFromApi, setLoading } = payload
    setLoading(true)
    const res = yield call(Service.getPowerByTimeFactDetailApi, factoryId)
    if (res.status === 200) {
      yield put(setPowerByTime(res.data))
      getDataFromApi(res.data)
    }
    setLoading(false)
  } catch (error) {
    catchHandle(error, 'getPowerByTimeFactDetailSaga')
    setLoading(false)
  }
}

function* getPowerByDaysSaga(action: ReturnType<typeof getPowerByDays>): Generator {
  try {
    yield put(setLoading({ isLoadingNearCurrentDays: true }))
    const n = action.payload || 7 // default is 7 days
    const res = yield call(Service.getPowerByDaysApi, n)
    if (res.status === 200) {
      yield put(setPowerByDays(res.data))
    }
    yield put(setLoading({ isLoadingNearCurrentDays: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingNearCurrentDays: false }))
    catchHandle(error, 'getPowerByDaysSaga')
  }
}

function* getComparePowerSaga(action: ReturnType<typeof getComparePower>): Generator {
  try {
    yield put(setLoading({ isLoadingComparePower: true }))
    const payload = action.payload as { tagetDate: string; compareDate: string, currentPlantId: string }
    const tagetDate = payload?.tagetDate || ''
    const compareDate = payload?.compareDate || ''
    const currentPlantId = payload?.currentPlantId || ''

    const res = yield call(Service.getComparePowerApi, tagetDate, compareDate, currentPlantId)

    if (res.status === 200) {
      yield put(setComparePower(res.data))
    }
    yield put(setLoading({ isLoadingComparePower: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingComparePower: false }))
    catchHandle(error, 'getComparePowerSaga')
  }
}

function* getPowerByDaysFactDetailSaga(action: ReturnType<typeof getPowerByDaysFactDetail>): Generator {
  try {
    const payload = action.payload
    const { factoryId, getDataFromApi, setLoading } = payload
    setLoading(true)
    const res = yield call(Service.getPowerByDaysFactDetailApi, factoryId)
    if (res.status === 200) {
      getDataFromApi(res.data.detail)
    }
    setLoading(false)
  } catch (error) {
    setLoading(false)
    catchHandle(error, 'getPowerByDaysFactDetailSaga')
  }
}

function* handleGetPowerOverviewApi() {
  yield takeEvery(getPowerOverivew, getPowerOverviewSaga)
}
function* handleGetPowerByTimeApi() {
  yield takeEvery(getPowerByTime, getPowerByTimeSaga)
}
function* handleGetPowerByDaysApi() {
  yield takeEvery(getPowerByDays, getPowerByDaysSaga)
}
function* handleGetComparePowerApi() {
  yield takeEvery(getComparePower, getComparePowerSaga)
}

function* handleGetPowerOverviewFactDetailApi() {
  yield takeEvery(getPowerOverivewFactDetail, getPowerOverviewFactDetailSaga)
}
function* handleGetPowerByTimeFactDetailApi() {
  yield takeEvery(getPowerByTimeFactDetail, getPowerByTimeFactDetailSaga)
}
function* handleGetPowerByDaysFactDetailApi() {
  yield takeEvery(getPowerByDaysFactDetail, getPowerByDaysFactDetailSaga)
}

export function* powerSagaList() {
  yield all([
    handleGetPowerOverviewApi(),
    handleGetPowerByTimeApi(),
    handleGetPowerByDaysApi(),
    handleGetComparePowerApi(),
    handleGetPowerOverviewFactDetailApi(),
    handleGetPowerByTimeFactDetailApi(),
    handleGetPowerByDaysFactDetailApi()
  ])
}
