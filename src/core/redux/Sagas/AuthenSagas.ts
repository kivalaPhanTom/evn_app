import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getToken } from '../domains/auth/auth.actions'
import { Service } from '@/core/service/authenService'
import { Toast } from 'toastify-react-native'
import { setAuthToken, setUsernameToAsyncStorage } from '@/core/service/api.service'
import { getModules } from '../domains/modules/modules.actions'
import { router } from 'expo-router'
import { catchHandle } from '@/core/utils/utils'

function* getTokenSaga(action: any): Generator {
  const { username, password } = action.payload
  try {
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
      Toast.success('Đăng nhập thành công!')
      yield put(getModules())
      setTimeout(() => {
        router.replace('/companies')
      }, 500)
    }
  } catch (error) {
    catchHandle(error, 'getTokenSaga')
  }
}

function* handleGetTokenApi() {
  yield takeEvery(getToken, getTokenSaga)
}

export function* authenSagaList() {
  yield all([handleGetTokenApi()])
}
