import { all, takeEvery, put, call } from 'redux-saga/effects'
import { Service } from '@/core/service/revenueProfitService'
import {
  getProfit,
  getRevenue,
  getRevenuePowerPrices,
  getRevenueTotalExpense,
  getRevenueByPeriod,
  getDailyAndCumulativeData,
  getProfitFactDetail,
  getRevenueFactDetail,
  getProfitByPeriod,
} from '../Actions/RevenueProfitActions'
import {
  setProfitData,
  setRevenueData,
  setPowerPrices,
  setLoading,
  setRevenueCostSummary,
  setRevenueByPeriod,
  setDailyAndCumulativeData,
  setProfitFactDetailData,
  setRevenueFactDetailData,
  setProfitByPeriod,
} from '../slices/RevenueProfitSlice'
import { catchHandle } from '@/core/utils/utils'

function* getProfitApiSaga(): Generator {
  try {
    yield put(
      setLoading({
        isLoadingProfit: true,
      }),
    )
    const res = yield call(Service.getProfitApi, '')
    if (res.status === 200) {
      yield put(setProfitData(res.data))
    }
    yield put(
      setLoading({
        isLoadingProfit: false,
      }),
    )
  } catch (error) {
    catchHandle(error, 'getProfitApiSaga')
    yield put(
      setLoading({
        isLoadingProfit: false,
      }),
    )
  }
}

function* getProfitFactDetailApiSaga(action: ReturnType<typeof getProfitFactDetail>): Generator {
  try {
    yield put(
      setLoading({
        isLoadingProfit: true,
      }),
    )
    const payload = action.payload
    const { currentPlantId } = payload
    const res = yield call(Service.getProfitApi, currentPlantId)
    if (res.status === 200) {
      yield put(setProfitFactDetailData(res.data))
    }
    yield put(
      setLoading({
        isLoadingProfit: false,
      }),
    )
  } catch (error) {
    catchHandle(error, 'getProfitFactDetailApiSaga')
    yield put(
      setLoading({
        isLoadingProfit: false,
      }),
    )
  }
}

function* getRevenueApiSaga(): Generator {
  try {
    yield put(
      setLoading({
        isLoadingRevenue: true,
      }),
    )
    const res = yield call(Service.getRevenueApi, '')
    if (res.status === 200) {
      yield put(setRevenueData(res.data))
    }
    yield put(
      setLoading({
        isLoadingRevenue: false,
      }),
    )
  } catch (error) {
    catchHandle(error, 'getRevenueApiSaga')
    yield put(
      setLoading({
        isLoadingRevenue: false,
      }),
    )
  }
}

function* getRevenueFactDetailApiSaga(action: ReturnType<typeof getRevenueFactDetail>): Generator {
  try {
    yield put(
      setLoading({
        isLoadingRevenue: true,
      }),
    )
    const payload = action.payload
    const { currentPlantId } = payload
    const res = yield call(Service.getRevenueApi, currentPlantId)
    if (res.status === 200) {
      yield put(setRevenueFactDetailData(res.data))
    }
    yield put(
      setLoading({
        isLoadingRevenue: false,
      }),
    )
  } catch (error) {
    catchHandle(error, 'getRevenueFactDetailApiSaga')
    yield put(
      setLoading({
        isLoadingRevenue: false,
      }),
    )
  }
}

function* getRevenuePowerPricesSaga(action: ReturnType<typeof getRevenuePowerPrices>): Generator {
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
    catchHandle(error, 'getRevenuePowerPricesSaga')
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
    catchHandle(error, 'getRevenueTotalExpenseSaga')
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
    catchHandle(error, 'getRevenueByPeriodSaga')
    yield put(
      setLoading({
        isLoadingRevenueByPeriod: false,
      }),
    )
    // console.log('getInflowOutflow error:', error)
  }
}

function* getProfitByPeriodSaga(action: ReturnType<typeof getProfitByPeriod>): Generator {
  try {
    yield put(
      setLoading({
        isLoadingProfitByPeriod: true,
      }),
    )
    const payload = action.payload
    const { startDate, endDate, currentPlantId } = payload
    const res = yield call(Service.getProfitByPeriodApi, startDate, endDate, currentPlantId)
    if (res.status === 200) {
      yield put(setProfitByPeriod(res.data))
      // yield put(setRevenueData(res.data))
      // You can dispatch an action to store the data in the Redux store here
      // yield put(setHydrologyFlowChart(res.data))
    }
    yield put(
      setLoading({
        isLoadingProfitByPeriod: false,
      }),
    )
  } catch (error) {
    catchHandle(error, 'getProfitByPeriodSaga')
    yield put(
      setLoading({
        isLoadingProfitByPeriod: false,
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
    catchHandle(error, 'getDailyAndCumulativeDataSaga')
  }
}

function* getProfitApi() {
  yield takeEvery(getProfit, getProfitApiSaga)
}

function* getRevenueApi() {
  yield takeEvery(getRevenue, getRevenueApiSaga)
}

function* getRevenuePowerPricesApi() {
  yield takeEvery(getRevenuePowerPrices, getRevenuePowerPricesSaga)
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
function* getRevenueByPeriodApi() {
  yield takeEvery(getRevenueByPeriod, getRevenueByPeriodSaga)
}

function* getDailyAndCumulativeDataApi() {
  yield takeEvery(getDailyAndCumulativeData, getDailyAndCumulativeDataSaga)
}

function* getProfitByPeriodApi() {
  yield takeEvery(getProfitByPeriod, getProfitByPeriodSaga)
}

export function* revenueProfitSagaList() {
  yield all([
    getProfitApi(),
    getProfitFactDetailApi(),
    getRevenueFactDetailApi(),
    getRevenueApi(),
    getRevenuePowerPricesApi(),
    getRevenueTotalExpenseApi(),
    getRevenueByPeriodApi(),
    getDailyAndCumulativeDataApi(),
    getProfitByPeriodApi(),
  ])
}
