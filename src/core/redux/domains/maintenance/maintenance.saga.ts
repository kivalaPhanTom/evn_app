import { getDetailRepairSchedule, getRepairSchedule } from './maintenance.actions'
import { all, takeEvery, put, call } from 'redux-saga/effects'
import { Service } from '@/core/service/unitMaintenanceScheduleService'
import { setRepairSchedule, setCurrentPlantDetail, setLoading } from './maintenance.slice'
import { catchHandle } from '@/core/utils/utils'

function* getRepairScheduleSaga(action: ReturnType<typeof getRepairSchedule>): Generator {
  try {
    yield put(setLoading({ isRepairerScheduleLoading: true }))
    const { year } = action.payload
    const res = yield call(Service.getRepairScheduleApi, year)
    if (res.status === 200) {
      yield put(setRepairSchedule(res.data))
    }
    yield put(setLoading({ isRepairerScheduleLoading: false }))
  } catch (error) {
    catchHandle(error, 'getRepairScheduleSaga')
    yield put(setLoading({ isRepairerScheduleLoading: false }))
  }
}

function* getDetailRepairScheduleSaga(action: ReturnType<typeof getDetailRepairSchedule>): Generator {
  try {
    yield put(setLoading({ isDetailRepairScheduleLoading: true }))
    const { currentPlantId, year } = action.payload
    const res = yield call(Service.getDetailRepairScheduleApi, currentPlantId, year)
    if (res.status === 200) {
      yield put(setCurrentPlantDetail(res.data))
    }
    yield put(setLoading({ isDetailRepairScheduleLoading: false }))
  } catch (error) {
    catchHandle(error, 'getDetailRepairScheduleSaga')
    yield put(setLoading({ isRepairerScheduleLoading: false, isDetailRepairScheduleLoading: false }))
  }
}

function* getRepairScheduleApi() {
  yield takeEvery(getRepairSchedule, getRepairScheduleSaga)
  yield takeEvery(getDetailRepairSchedule, getDetailRepairScheduleSaga)
}

export function* repairScheduleSagaList() {
  yield all([getRepairScheduleApi()])
}
