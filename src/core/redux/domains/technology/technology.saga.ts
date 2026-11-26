import { all, takeLatest, put, call } from 'redux-saga/effects'
import { getTechInfo, getTechInfoDetail } from './technology.actions'
import { setLoading, setTechInfo, setTechInfoDetail } from './technology.slice'
import { Service } from '@/core/service/techInfoService'
import { catchHandle } from '@/core/utils/utils'

type TechInfoResponse = Awaited<ReturnType<typeof Service.getTechInfoApi>>

function* getTechInfoSaga(action: ReturnType<typeof getTechInfo>): Generator<unknown, void, TechInfoResponse> {
  try {
    const { currentPlantId } = action.payload
    yield put(setLoading({ isLoadingTechInfo: true }))
    const res = yield call(Service.getTechInfoApi, currentPlantId)
    if (res.status === 200) {
      yield put(setTechInfo(res.data.specifications ?? []))
    }
    yield put(setLoading({ isLoadingTechInfo: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingTechInfo: false }))
    catchHandle(error, 'getTechInfoSaga')
  }
}

function* getTechInfoDetailSaga(action: ReturnType<typeof getTechInfoDetail>): Generator<unknown, void, TechInfoResponse> {
  const { currentPlantId } = action.payload
  try {
    yield put(setLoading({ isLoadingTechInfoDetail: true }))
    const res = yield call(Service.getTechInfoApi, currentPlantId, 'detail')
    if (res.status === 200) {
      yield put(setTechInfoDetail(res.data.specifications ?? []))
    }
    yield put(setLoading({ isLoadingTechInfoDetail: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingTechInfoDetail: false }))
    catchHandle(error, 'getTechInfoDetailSaga')
  }
}

function* getTechInfoApi() { yield takeLatest(getTechInfo, getTechInfoSaga) }
function* getTechInfoDetailApi() { yield takeLatest(getTechInfoDetail, getTechInfoDetailSaga) }

export function* techInfoSagaList() {
  yield all([getTechInfoApi(), getTechInfoDetailApi()])
}
