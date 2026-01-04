import { all, takeEvery, put, call } from 'redux-saga/effects'
import { Service } from '@/core/service/revenueProfitService'
import { getProfit, getRevenue, getRevebnuePowerPrices, getRevenueTotalExpense, getProfitFactDetail, getRevenueFactDetail } from '../Actions/RevenueProfitActions'
import { setProfitData, setRevenueData, setPowerPrices, setLoading, setRevenueCostSummary, setProfitFactDetailData, setRevenueFactDetailData } from '../slices/RevenueProfitSlice'
import { catchHandle } from '@/core/utils/utils'

function* getProfitApiSaga(): Generator {
  try {
    yield put(setLoading({
      isLoadingProfit: true
    }))
    const res = yield call(Service.getProfitApi, '')
    if (res.status === 200) {
      yield put(setProfitData(res.data))
    }
    yield put(setLoading({
      isLoadingProfit: false
    }))
  } catch (error) {
    catchHandle(error, 'getProfitApiSaga')
    yield put(setLoading({
      isLoadingProfit: false
    }))
  }
}

function* getProfitFactDetailApiSaga(action: ReturnType<typeof getProfitFactDetail>): Generator {
  try {
    yield put(setLoading({
      isLoadingProfit: true
    }))
    const payload = action.payload
    const { currentPlantId } = payload
    const res = yield call(Service.getProfitApi, currentPlantId)
    if (res.status === 200) {
      yield put(setProfitFactDetailData(res.data))
    }
    yield put(setLoading({
      isLoadingProfit: false
    }))
  } catch (error) {
    catchHandle(error, 'getProfitFactDetailApiSaga')
    yield put(setLoading({
      isLoadingProfit: false
    }))
  }
}

function* getRevenueApiSaga(): Generator {
  try {
    yield put(setLoading({
      isLoadingRevenue: true
    }))
    const res = yield call(Service.getRevenueApi, '')
    if (res.status === 200) {
      yield put(setRevenueData(res.data))
    }
    yield put(setLoading({
      isLoadingRevenue: false
    }))
  } catch (error) {
    catchHandle(error, 'getRevenueApiSaga')
    yield put(setLoading({
      isLoadingRevenue: false
    }))
  }
}

function* getRevenueFactDetailApiSaga(action: ReturnType<typeof getRevenueFactDetail>): Generator {
  try {
    yield put(setLoading({
      isLoadingRevenue: true
    }))
    const payload = action.payload
    const { currentPlantId } = payload
    const res = yield call(Service.getRevenueApi, currentPlantId)
    if (res.status === 200) {
      yield put(setRevenueFactDetailData(res.data))
    }
    yield put(setLoading({
      isLoadingRevenue: false
    }))
  } catch (error) {
    catchHandle(error, 'getRevenueFactDetailApiSaga')
    yield put(setLoading({
      isLoadingRevenue: false
    }))
  }
}

function* getRevebnuePowerPricesSaga(action: ReturnType<typeof getRevebnuePowerPrices>): Generator {
  try {
    yield put(setLoading({
      isLoadingPowerPrice: true
    }))
    const payload = action.payload
    const { currentPlantId, date } = payload
    const res = yield call(Service.getRevenuePowerPricesApi, currentPlantId, date)
    if (res.status === 200) {
      yield put(setPowerPrices(res.data.Prices))
    }
    yield put(setLoading({
      isLoadingPowerPrice: false
    }))
  } catch (error) {
    yield put(setLoading({
      isLoadingPowerPrice: false
    }))
  }
}

function* getRevenueTotalExpenseSaga(action: ReturnType<typeof getRevenueTotalExpense>): Generator {
  try {
    yield put(setLoading({
      isLoadingRevenueCostSummary: true
    }))
    const payload = action.payload
    const { date } = payload
    const res = yield call(Service.getRevenueTotalExpensesApi, date)
    if (res.status === 200) {
      const data = {
        MarketRevenue: res.data.MarketRevenue,
        ContractRevenue: res.data.ContractRevenue,
        TotalCost: res.data.TotalCost
      }
      yield put(setRevenueCostSummary(data))
      // yield put(setRevenueData(res.data))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
    yield put(setLoading({
      isLoadingRevenueCostSummary: false
    }))
  } catch (error) {
    yield put(setLoading({
      isLoadingRevenueCostSummary: false
    }))
    // console.log('getInflowOutflow error:', error)
  }
}
function* getProfitApi() {
  yield takeEvery(getProfit, getProfitApiSaga)
}

function* getRevenueApi() {
  yield takeEvery(getRevenue, getRevenueApiSaga)
}

function* getRevenuePowerPricesApi() {
  yield takeEvery(getRevebnuePowerPrices, getRevebnuePowerPricesSaga)
}

function* getRevenueTotalExpenseApi() {
  yield takeEvery(getRevenueTotalExpense, getRevenueTotalExpenseSaga)
}

function* getProfitFactDetailApi() {
  yield takeEvery(getProfitFactDetail, getProfitFactDetailApiSaga)
}

function* getRevenueFactDetailApi() {
  yield takeEvery(getRevenueFactDetail, getRevenueFactDetailApiSaga)
}
export function* revenueProfitSagaList() {
  yield all([
    getProfitApi(),
    getProfitFactDetailApi(),
    getRevenueFactDetailApi(),
    getRevenueApi(),
    getRevenuePowerPricesApi(),
    getRevenueTotalExpenseApi()
  ])
}
