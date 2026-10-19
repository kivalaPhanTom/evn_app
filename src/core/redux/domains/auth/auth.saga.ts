import { all, takeLatest, put, call, delay } from 'redux-saga/effects'
import { getToken } from './auth.actions'
import { Service } from '@/core/service/authenService'
import { Toast } from 'toastify-react-native'
import { setAuthToken, setUsernameToAsyncStorage } from '@/core/service/api.service'
import { loginFailed, loginStarted, loginSucceeded } from './auth.slice'
import { router } from 'expo-router'
import { catchHandle } from '@/core/utils/utils'
import { Service as CompanyPlantService } from '@/core/service/companyPlantService'
import { saveCompaniesCache } from '@/core/service/companiesCache'
import { clearCompanyPlant, companiesFailed, companiesLoaded, companiesLoading } from '../company-plant'

function* getTokenSaga(action: any): Generator {
  const { username, password } = action.payload
  try {
    yield put(loginStarted())
    const res = yield call(Service.getTokenApi, {
      grant_type: 'password',
      username,
      password,
    })
    if (res.status === 200) {
      const access_token = res.data.access_token
      const expires_in = res.data.expires_in
      yield call(setAuthToken, access_token, expires_in)
      yield call(setUsernameToAsyncStorage, username)
      yield put(clearCompanyPlant())
      yield put(loginSucceeded())
      Toast.success('Đăng nhập thành công!')
      yield put(companiesLoading())
      try {
        const companiesResponse: Awaited<ReturnType<typeof CompanyPlantService.getCompaniesApi>> = yield call(
          CompanyPlantService.getCompaniesApi,
          username,
        )
        if (companiesResponse.status !== 200) throw new Error('Không tải được danh sách công ty.')
        const companies = companiesResponse.data
        yield put(companiesLoaded(companies))
        yield call(saveCompaniesCache, username, companies)
      } catch (error) {
        yield put(companiesFailed('Không tải được danh sách công ty. Vui lòng đăng nhập lại.'))
        catchHandle(error, 'getCompaniesAfterLogin')
      }
      yield delay(500)
      router.replace('/companies')
    }
  } catch (error) {
    yield put(loginFailed('Tên đăng nhập hoặc mật khẩu không đúng.'))
    catchHandle(error, 'getTokenSaga')
  }
}

function* handleGetTokenApi() {
  yield takeLatest(getToken, getTokenSaga)
}

export function* authenSagaList() {
  yield all([handleGetTokenApi()])
}
