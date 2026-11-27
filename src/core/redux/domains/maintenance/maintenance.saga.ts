import { getDetailRepairSchedule, getRepairSchedule } from './maintenance.actions'
import { all, takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { Service } from '@/core/service/unitMaintenanceScheduleService'
import { setRepairSchedule, setCurrentPlantDetail, setLoading, type RepairScheduleState } from './maintenance.slice'
import { catchHandle } from '@/core/utils/utils'

function normalizeRepairSchedule(raw: any): Partial<RepairScheduleState> {
  const payload = raw?.data ?? raw ?? {}
  const rawDetails = payload.Details ?? payload.details ?? []

  return {
    TotalCategory: payload.TotalCategory ?? payload.totalCategory ?? 0,
    TotalActualDay: payload.TotalActualDay ?? payload.totalActualDay ?? 0,
    TotalRCMCategory: payload.TotalRCMCategory ?? payload.totalRCMCategory ?? 0,
    TotalMajorCategory: payload.TotalMajorCategory ?? payload.totalMajorCategory ?? 0,
    Details: Array.isArray(rawDetails)
      ? rawDetails.map((item: any) => {
          const cat = item.Category ?? item.category ?? {}
          const day = item.Day ?? item.day ?? {}
          return {
            PlantCode: item.PlantCode ?? item.plantCode ?? '',
            PlantName: item.PlantName ?? item.plantName ?? '',
            Status: item.Status ?? item.status ?? 0,
            Category: {
              Total: cat.Total ?? cat.total ?? 0,
              RCM: cat.RCM ?? cat.rcm ?? 0,
              Major: cat.Major ?? cat.major ?? 0,
            },
            Day: {
              Plan: day.Plan ?? day.plan ?? 0,
              Actual: day.Actual ?? day.actual ?? 0,
            },
          }
        })
      : [],
  }
}

function* getRepairScheduleSaga(action: ReturnType<typeof getRepairSchedule>): Generator {
  try {
    yield put(setLoading({ isRepairerScheduleLoading: true }))
    const { year, companyId } = action.payload
    const res = yield call(Service.getRepairScheduleApi, year, companyId || '')
    if (res.status === 200) {
      yield put(setRepairSchedule(normalizeRepairSchedule(res.data)))
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
      yield put(setCurrentPlantDetail(res.data.data))
    }
    yield put(setLoading({ isDetailRepairScheduleLoading: false }))
  } catch (error) {
    catchHandle(error, 'getDetailRepairScheduleSaga')
    yield put(setLoading({ isRepairerScheduleLoading: false, isDetailRepairScheduleLoading: false }))
  }
}

function* getRepairScheduleApi() {
  yield takeEvery(getRepairSchedule, getRepairScheduleSaga)
  yield takeLatest(getDetailRepairSchedule, getDetailRepairScheduleSaga)
}

export function* repairScheduleSagaList() {
  yield all([getRepairScheduleApi()])
}
