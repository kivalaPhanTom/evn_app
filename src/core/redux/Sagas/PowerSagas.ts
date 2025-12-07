import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getPowerOverivew, getPowerByTime, getPowerByDays, getComparePower } from '../Actions/PowerActions'
import { setPowerOverview, setPowerByTime, setPowerByDays, setComparePower } from '../slices/PowerSlice'
import { Service } from '@/core/service/powerService'

function* getPowerOverviewSaga(): Generator {
  try {
    const res = yield call(Service.getPowerOverviewApi)
    if (res.status === 200) {
      console.log('Power overview data:', res.data)
      yield put(setPowerOverview(res.data))
    }
  } catch (error) {
    console.log('errorXXX:', error)
  }
}

function* getPowerByTimeSaga(): Generator {
  try {
    const res = yield call(Service.getPowerByTimeApi)
    if (res.status === 200) {
      yield put(setPowerByTime(res.data))
    }
  } catch (error) {
    console.log('getPowerByTime error:', error)
  }
}

function* getPowerByDaysSaga(action: ReturnType<typeof getPowerByDays>): Generator {
  try {
    const n = action.payload || 7 // default is 7 days
    const res = yield call(Service.getPowerByDaysApi, n)
    if (res.status === 200) {
      yield put(setPowerByDays(res.data))
    }
  } catch (error) {
    console.log('getPowerByDays error:', error)
  }
}

function* getComparePowerSaga(action: ReturnType<typeof getComparePower>): Generator {
  try {
    const payload = action.payload as { tagetDate: string; compareDate: string }
    const tagetDate = payload?.tagetDate || ''
    const compareDate = payload?.compareDate || ''

    const res = yield call(Service.getComparePowerApi, tagetDate, compareDate)

    if (res.status === 200) {
      yield put(setComparePower(res.data))
    }
  } catch (error) {
    console.log('getComparePower error:', error)
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
export function* powerSagaList() {
  yield all([
    handleGetPowerOverviewApi(),
    handleGetPowerByTimeApi(),
    handleGetPowerByDaysApi(),
    handleGetComparePowerApi(),
  ])
}
