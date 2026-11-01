import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { Service, type Company } from '@/core/service/companyPlantService'
import { restoreCompaniesCache } from '@/core/service/companiesCache'
import { catchHandle } from '@/core/utils/utils'
import type { RootState } from '@/core/redux/store'
import { getModules } from '../modules/modules.actions'
import { saveModuleState } from '../modules/modules.slice'
import { getPlants, restoreCompanies } from './company-plant.actions'
import {
  companiesFailed,
  companiesLoaded,
  companiesLoading,
  plantsFailed,
  plantsLoaded,
  plantsLoading,
} from './company-plant.slice'

function* restoreCompaniesSaga(): Generator {
  yield put(companiesLoading())
  const companies: Awaited<ReturnType<typeof restoreCompaniesCache>> = yield call(restoreCompaniesCache)
  if (companies) {
    yield put(companiesLoaded(companies))
  } else {
    yield put(companiesFailed('Danh sách công ty đã hết hạn. Vui lòng đăng nhập lại.'))
  }
}

function* getPlantsSaga(action: ReturnType<typeof getPlants>): Generator {
  yield put(plantsLoading(action.payload))
  try {
    let username: string | null = yield call([AsyncStorage, AsyncStorage.getItem], 'USERNAME')
    if (!username) username = yield call([AsyncStorage, AsyncStorage.getItem], 'COMPANIES_USER_ID')
    if (!username) throw new Error('Không tìm thấy username của phiên đăng nhập.')
    yield put(saveModuleState([]))
    yield put(getModules({ companyId: action.payload, username }))
    const response: Awaited<ReturnType<typeof Service.getPlantsApi>> = yield call(Service.getPlantsApi, action.payload)
    // console.log(
    //   '[GetPlants][response]\n' + JSON.stringify({ companyId: action.payload, status: response.status, data: response.data }, null, 2),
    // )
    if (response.status !== 200) throw new Error('Không tải được danh sách nhà máy.')
    const body = response.data
    const plantList = Array.isArray(body) ? body : body && ('plants' in body ? body.plants : body.data?.plants)
    if (!Array.isArray(plantList)) {
      throw new Error('INVALID_RESPONSE: GetPlants không trả về danh sách nhà máy hợp lệ.')
    }
    yield put(plantsLoaded(plantList))
    const plants: RootState['companyPlantSlice']['plants'] = yield select(
      (state: RootState) => state.companyPlantSlice.plants,
    )
    // console.log(
    //   '[GetPlants][Redux: companyPlantSlice.plants]\n' + JSON.stringify({ companyId: action.payload, plants }, null, 2),
    // )
    // Dữ liệu nhà máy chỉ được trả về Redux, chưa dùng để thay các luồng hiện tại.
    const companies: Company[] = yield select((state: RootState) => state.companyPlantSlice.companies)
    const company = companies.find((item) => item.companyId === action.payload)
    router.navigate({
      pathname: '/home',
      params: { companyName: company?.companyName ?? '', location: company?.location ?? '' },
    })
  } catch (error) {
    yield put(plantsFailed('Không tải được danh sách nhà máy. Vui lòng thử lại.'))
    catchHandle(error, 'getPlantsSaga')
  }
}

export function* companyPlantSagaList() {
  yield all([
    takeLatest(restoreCompanies, restoreCompaniesSaga),
    takeLatest(getPlants, getPlantsSaga),
  ])
}
