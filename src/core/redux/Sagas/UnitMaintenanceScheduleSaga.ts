import { getRepairSchedule } from './../Actions/UnitMaintenanceScheduleActions'
import { all, takeEvery, put, call } from 'redux-saga/effects'
import { Service } from '@/core/service/unitMaintenanceScheduleService'
import { setRepairSchedule } from '../slices/UnitMaintenanceScheduleSlice'
import { catchHandle } from '@/core/utils/utils'
import { setLoading } from '../slices/UnitMaintenanceScheduleSlice'

function* getRepairScheduleSaga(): Generator {
  try {
    yield put(
      setLoading({
        isRepairerScheduleLoading: true,
      }),
    )
    const res = yield call(Service.getRepairScheduleApi)
    if (res.status === 200) {
      yield put(setRepairSchedule(res.data))
    }
    yield put(
      setLoading({
        isRepairerScheduleLoading: false,
      }),
    )
  } catch (error) {
    yield put(
      setLoading({
        isRepairerScheduleLoading: false,
      }),
    )
  }
}

function* getRepairScheduleApi() {
  yield takeEvery(getRepairSchedule, getRepairScheduleSaga)
}

export function* repairScheduleSagaList() {
  yield all([getRepairScheduleApi()])
}
