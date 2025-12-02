import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getPowerOverivew, getPowerByTime } from '../Actions/PowerActions'
import { setPowerOverview, setPowerByTime } from '../slices/PowerSlice'
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
      console.log('Power by time data:', res.data)
      yield put(setPowerByTime(res.data))
    }
  } catch (error) {
    console.log('getPowerByTime error:', error)
  }
}

function* handleGetPowerOverviewApi() {
  yield takeEvery(getPowerOverivew, getPowerOverviewSaga)
}
function* handleGetPowerByTimeApi() {
  yield takeEvery(getPowerByTime, getPowerByTimeSaga)
}

export function* powerSagaList() {
  yield all([handleGetPowerOverviewApi(), handleGetPowerByTimeApi()])
}
