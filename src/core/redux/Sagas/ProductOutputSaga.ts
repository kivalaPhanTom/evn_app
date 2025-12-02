import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getProductOutputByHours } from '../Actions/ProductOutputActions'
import { Service } from '@/core/service/productOutput'
import { setProductOutputByHours } from '../slices/ProductOutputSlice'

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

function* handleGetProductOutputByHoursApi() {
  yield takeEvery(getProductOutputByHours, getProductOutputByHoursSaga)
}
export function* productOutputSagaList() {
  yield all([handleGetProductOutputByHoursApi()])
}
