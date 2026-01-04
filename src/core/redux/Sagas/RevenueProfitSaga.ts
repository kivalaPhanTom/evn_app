import { all, takeEvery, put, call } from 'redux-saga/effects'
import { Service } from '@/core/service/revenueProfitService'
import {
  getProfit,
  getRevenue,
  getRevebnuePowerPrices,
  getRevenueTotalExpense,
  getRevenueByPeriod,
  getDailyAndCumulativeData,
} from '../Actions/RevenueProfitActions'
import {
  setProfitData,
  setRevenueData,
  setPowerPrices,
  setLoading,
  setRevenueCostSummary,
  setRevenueByPeriod,
  setDailyAndCumulativeData,
} from '../slices/RevenueProfitSlice'

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
      yield put(setRevenueData(res.data))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
  } catch (error) {
    // console.log('getInflowOutflow error:', error)
  }
}

function* getRevebnuePowerPricesSaga(action: ReturnType<typeof getRevebnuePowerPrices>): Generator {
  try {
    yield put(
      setLoading({
        isLoadingPowerPrice: true,
      }),
    )
    const payload = action.payload
    const { currentPlantId, date } = payload
    const res = yield call(Service.getRevenuePowerPricesApi, currentPlantId, date)
    if (res.status === 200) {
      yield put(setPowerPrices(res.data.Prices))
    }
    yield put(
      setLoading({
        isLoadingPowerPrice: false,
      }),
    )
  } catch (error) {
    yield put(
      setLoading({
        isLoadingPowerPrice: false,
      }),
    )
  }
}

function* getRevenueTotalExpenseSaga(action: ReturnType<typeof getRevenueTotalExpense>): Generator {
  try {
    yield put(
      setLoading({
        isLoadingRevenueCostSummary: true,
      }),
    )
    const payload = action.payload
    const { date } = payload
    const res = yield call(Service.getRevenueTotalExpensesApi, date)
    if (res.status === 200) {
      const data = {
        MarketRevenue: res.data.MarketRevenue,
        ContractRevenue: res.data.ContractRevenue,
        TotalCost: res.data.TotalCost,
      }
      yield put(setRevenueCostSummary(data))
      // yield put(setRevenueData(res.data))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
    yield put(
      setLoading({
        isLoadingRevenueCostSummary: false,
      }),
    )
  } catch (error) {
    yield put(
      setLoading({
        isLoadingRevenueCostSummary: false,
      }),
    )
    // console.log('getInflowOutflow error:', error)
  }
}

function* getRevenueByPeriodSaga(action: ReturnType<typeof getRevenueByPeriod>): Generator {
  try {
    yield put(
      setLoading({
        isLoadingRevenueByPeriod: true,
      }),
    )
    const payload = action.payload
    const { startDate, endDate, type } = payload
    const res = yield call(Service.getRevenueByPeriodApi, startDate, endDate, type)
    if (res.status === 200) {
      yield put(setRevenueByPeriod(res.data))
      // yield put(setRevenueData(res.data))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
    yield put(
      setLoading({
        isLoadingRevenueByPeriod: false,
      }),
    )
  } catch (error) {
    yield put(
      setLoading({
        isLoadingRevenueByPeriod: false,
      }),
    )
    // console.log('getInflowOutflow error:', error)
  }
}

function* getDailyAndCumulativeDataSaga(action: ReturnType<typeof getDailyAndCumulativeData>): Generator {
  try {
    const payload = action.payload
    const { currentPlantId, date } = payload
    const res = yield call(Service.getDailyAndCumulativeApi, currentPlantId, date)
    if (res.status === 200) {
      yield put(setDailyAndCumulativeData(res.data))
    }
  } catch (error) {
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

function* getRevenueByPeriodApi() {
  yield takeEvery(getRevenueByPeriod, getRevenueByPeriodSaga)
}

function* getDailyAndCumulativeDataApi() {
  yield takeEvery(getDailyAndCumulativeData, getDailyAndCumulativeDataSaga)
}

export function* revenueProfitSagaList() {
  yield all([
    getProfitApi(),
    getRevenueApi(),
    getRevenuePowerPricesApi(),
    getRevenueTotalExpenseApi(),
    getRevenueByPeriodApi(),
    getDailyAndCumulativeDataApi(),
  ])
}
