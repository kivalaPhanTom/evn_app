import { all, takeEvery, put, call } from 'redux-saga/effects'
import {
  getProductOutputByHours,
  getProductOutputOverview,
  getProductOutputByDays,
  getProductCummulativeOutput,
  getCompareProductOutput,
} from '../Actions/ProductOutputActions'
import { Service } from '@/core/service/productOutput'
import {
  setProductOutputByHours,
  setProductOutputOverview,
  setProductOutputByDays,
  setProductCummulativeOutput,
  setCompareProductOutput,
} from '../slices/ProductOutputSlice'
import { catchHandle } from '@/core/utils/utils'

function* getProductOutputByHoursSaga(): Generator {
  try {
    const res = yield call(Service.getProductOutputByHoursApi)
    if (res.status === 200) {
      yield put(setProductOutputByHours(res.data))
    }
  } catch (error) {
    catchHandle(error)
  }
}

function* getProductOutputOverviewSaga(): Generator {
  try {
    const res = yield call(Service.getProductOutputOverviewApi)
    if (res.status === 200) {
      yield put(setProductOutputOverview(res.data))
    }
  } catch (error) {
    catchHandle(error)
  }
}

function* getProductOutputByDaysSaga(action: ReturnType<typeof getProductOutputByDays>): Generator {
  try {
    const n = action.payload || 7 // default is 7 days
    const res = yield call(Service.getProductOutputByDaysApi, n)
    if (res.status === 200) {
      yield put(setProductOutputByDays(res.data))
    }
  } catch (error) {
    catchHandle(error)
  }
}

function* getProductCummulativeOutputSaga(action: ReturnType<typeof getProductCummulativeOutput>): Generator {
  try {
    const params = action.payload
    console.log('Fetching Cummulative Output with params:', params)
    const res = yield call(Service.getProductCummulativeOutputApi, params)
    if (res.status === 200) {
      console.log('Cummulative Output Data:', res.data)
      yield put(setProductCummulativeOutput(res.data))
    }
  } catch (error) {
    catchHandle(error)
  }
}

function* getCompareProductOutputSaga(action: ReturnType<typeof getCompareProductOutput>): Generator {
  try {
    const payload = action.payload as { tagetDate: string; compareDate: string }
    const tagetDate = payload?.tagetDate || ''
    const compareDate = payload?.compareDate || ''

    const res = yield call(Service.getCompareProductOutputApi, tagetDate, compareDate)
    if (res.status === 200) {
      yield put(setCompareProductOutput(res.data))
    }
  } catch (error) {
    catchHandle(error)
    console.log('getCompareProductOutput error:', error)
  }
}

function* handleGetProductOutputByHoursApi() {
  yield takeEvery(getProductOutputByHours, getProductOutputByHoursSaga)
}
function* handleGetProductOutputOverviewApi() {
  yield takeEvery(getProductOutputOverview, getProductOutputOverviewSaga)
}
function* handleGetProductOutputByDaysApi() {
  yield takeEvery(getProductOutputByDays, getProductOutputByDaysSaga)
}
function* handleGetProductCummulativeOutputApi() {
  yield takeEvery(getProductCummulativeOutput, getProductCummulativeOutputSaga)
}
function* handleGetCompareProductOutputApi() {
  yield takeEvery(getCompareProductOutput, getCompareProductOutputSaga)
}
export function* productOutputSagaList() {
  yield all([
    handleGetProductOutputByHoursApi(),
    handleGetProductOutputOverviewApi(),
    handleGetProductOutputByDaysApi(),
    handleGetProductCummulativeOutputApi(),
    handleGetCompareProductOutputApi(),
  ])
}
