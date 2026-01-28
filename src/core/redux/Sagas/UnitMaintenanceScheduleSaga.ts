import { getDetailRepairSchedule, getRepairSchedule } from './../Actions/UnitMaintenanceScheduleActions'
import { all, takeEvery, put, call } from 'redux-saga/effects'
import { Service } from '@/core/service/unitMaintenanceScheduleService'
import { setRepairSchedule, setCurrentPlantDetail } from '../slices/UnitMaintenanceScheduleSlice'
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
    catchHandle(error, 'getRepairScheduleSaga')
    yield put(
      setLoading({
        isRepairerScheduleLoading: false,
      }),
    )
  }
}

function* getDetailRepairScheduleSaga(action: ReturnType<typeof getDetailRepairSchedule>): Generator {
  try {
    yield put(
      setLoading({
        isDetailRepairScheduleLoading: true,
      }),
    )
    const { currentPlantId } = action.payload
    const res = yield call(Service.getDetailRepairScheduleApi, currentPlantId)
    if (res.status === 200) {
      yield put(setCurrentPlantDetail(res.data))
    }
    yield put(
      setLoading({
        isDetailRepairScheduleLoading: false,
      }),
    )
  } catch (error) {
    catchHandle(error, 'getDetailRepairScheduleSaga')
    yield put(
      setLoading({
        isRepairerScheduleLoading: false,
        isDetailRepairScheduleLoading: false,
      }),
    )
  }
}

function* getRepairScheduleApi() {
  yield takeEvery(getRepairSchedule, getRepairScheduleSaga)
  yield takeEvery(getDetailRepairSchedule, getDetailRepairScheduleSaga)
}

export function* repairScheduleSagaList() {
  yield all([getRepairScheduleApi()])
}
