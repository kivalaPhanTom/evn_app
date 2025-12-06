import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getProductOutputByHours, getProductOutputOverview, getProductOutputByDays } from '../Actions/ProductOutputActions'
import { Service } from '@/core/service/productOutput'
import { setProductOutputByHours, setProductOutputOverview, setProductOutputByDays } from '../slices/ProductOutputSlice'

function* getProductOutputByHoursSaga(): Generator {
  try {
    const res = yield call(Service.getProductOutputByHoursApi)
    if (res.status === 200) {
      yield put(setProductOutputByHours(res.data))
    }
  } catch (error) {
    console.log('errorXXX:', error)
  }
}

function* getProductOutputOverviewSaga(): Generator {
  try {
    const res = yield call(Service.getProductOutputOverviewApi)
    if (res.status === 200) {
      yield put(setProductOutputOverview(res.data))
    }
  } catch (error) {
    console.log('errorXXX:', error)
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
    console.log('errorXXX:', error)
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
export function* productOutputSagaList() {
  yield all([handleGetProductOutputByHoursApi(), handleGetProductOutputOverviewApi(), handleGetProductOutputByDaysApi()])
}
