import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getLegal, getExistence } from './documents.actions'
import { setLoading, setLegal, setExistence } from './documents.slice'
import { Service } from '@/core/service/documentService'
import { catchHandle } from '@/core/utils/utils'

function* getLegalSaga(): Generator {
  try {
    yield put(setLoading({ isLoadingLegal: true }))
    const res = yield call(Service.getLegalApi)
    if (res.status === 200) {
      yield put(setLegal(res.data))
    }
    yield put(setLoading({ isLoadingLegal: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingLegal: false }))
    catchHandle(error, 'getLegalSaga')
  }
}

function* getExistenceSaga(action: ReturnType<typeof getExistence>): Generator {
  const { currentPlantId } = action.payload
  try {
    yield put(setLoading({ isLoadingExistence: true }))
    const res = yield call(Service.getExistenceApi, currentPlantId)
    if (res.status === 200) {
      yield put(setExistence(res.data))
    }
    yield put(setLoading({ isLoadingExistence: false }))
  } catch (error) {
    yield put(setLoading({ isLoadingExistence: false }))
    catchHandle(error, 'getExistenceSaga')
  }
}

function* getLegalApi() { yield takeEvery(getLegal, getLegalSaga) }
function* getExistenceApi() { yield takeEvery(getExistence, getExistenceSaga) }

export function* documentSagaList() {
  yield all([getLegalApi(), getExistenceApi()])
}
