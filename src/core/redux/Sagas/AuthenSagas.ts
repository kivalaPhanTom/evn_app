import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getToken } from '../Actions/AuthenActions'
import { setPowerOverview } from '../slices/PowerSlice'
import { Service } from '@/core/service/authenService'
import { Toast } from 'toastify-react-native'
import { setAuthToken, apiFormUrlEncoded } from '@/core/service/api.service'
import { router } from 'expo-router'

function* getTokenSaga(action: any): Generator {
    const { username, password } = action.payload
    try {
        const res = yield call(Service.getTokenApi, {
            grant_type: "password",
            username,
            password
        })
        if (res.status === 200) {
            const access_token = res.data.access_token
            console.log('✅ Login successful, token:', access_token ? 'received' : 'missing')
            Toast.success('Đăng nhập thành công!')
            yield call(setAuthToken, access_token)
            router.push('/companies')
        } else {
            console.log('❌ Unexpected status:', res.status)
            Toast.error(`Lỗi đăng nhập: ${res.status}`)
        }
    } catch (error) {
        console.log('💥 Login error:', error)
        Toast.error(`Lỗi đăng nhập: ${error}`)
    }
}

function* handleGetTokenApi() {
    yield takeEvery(getToken, getTokenSaga)
}
export function* authenSagaList() {
    yield all([handleGetTokenApi()])
}
