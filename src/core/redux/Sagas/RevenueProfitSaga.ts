import { all, takeEvery, put, call } from 'redux-saga/effects'
import { Service } from '@/core/service/revenueProfitService'
import { getProfit, getRevenue } from '../Actions/RevenueProfitActions'
import { setProfitData, setRevenueData } from '../slices/RevenueProfitSlice'

function* getProfitApiSaga(): Generator {
  try {
    const res = yield call(Service.getProfitApi)
    if (res.status === 200) {
      yield put(setProfitData(res.data))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
  } catch (error) {
    // console.log('getInflowOutflow error:', error)
  }
}

function* getRevenueApiSaga(): Generator {
  try {
    const res = yield call(Service.getRevenueApi)
    if (res.status === 200) {
      console.log('Revenue data:', res.data)
      yield put(setRevenueData(res.data))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
  } catch (error) {
    // console.log('getInflowOutflow error:', error)
  }
}

function* getProfitApi() {
  yield takeEvery(getProfit, getProfitApiSaga)
}

function* getRevenueApi() {
  yield takeEvery(getRevenue, getRevenueApiSaga)
}

export function* revenueProfitSagaList() {
  yield all([getProfitApi(), getRevenueApi()])
}
