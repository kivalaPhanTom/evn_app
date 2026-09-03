import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getTechInfo, getTechInfoDetail } from '../Actions/TechInfoActions'
import { setLoading, setTechInfo, setTechInfoDetail } from '../slices/TechInfoSlice'
import { Service } from '@/core/service/techInfoService'
import { catchHandle } from '@/core/utils/utils'

function* getTechInfoSaga(action: ReturnType<typeof getTechInfo>): Generator {
  try {
    const { currentPlantId } = action.payload
    yield put(setLoading({ isLoadingTechInfo: true }))
    const res = yield call(Service.getTechInfoApi, currentPlantId)
    if (res.status === 200) {
      yield put(setTechInfo(res.data))
    }
    yield put(setLoading({ isLoadingTechInfo: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingTechInfo: false }))
    catchHandle(error, 'getTechInfoSaga')
  }
}

function* getTechInfoDetailSaga(action: ReturnType<typeof getTechInfoDetail>): Generator {
  const { currentPlantId } = action.payload
  try {
    yield put(setLoading({ isLoadingTechInfoDetail: true }))
    const res = yield call(Service.getTechInfoApi, currentPlantId, 'detail')
    if (res.status === 200) {
      yield put(setTechInfoDetail(res.data))
    }
    yield put(setLoading({ isLoadingTechInfoDetail: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingTechInfoDetail: false }))
    catchHandle(error, 'getTechInfoDetailSaga')
  }
}

function* getTechInfoApi() { yield takeEvery(getTechInfo, getTechInfoSaga) }
function* getTechInfoDetailApi() { yield takeEvery(getTechInfoDetail, getTechInfoDetailSaga) }

export function* techInfoSagaList() {
  yield all([getTechInfoApi(), getTechInfoDetailApi()])
}
