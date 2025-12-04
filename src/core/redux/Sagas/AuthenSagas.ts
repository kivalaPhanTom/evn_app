import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getToken } from '../Actions/AuthenActions'
import { setPowerOverview } from '../slices/PowerSlice'
import { Service } from '@/core/service/authenSerivce'
import { Toast } from 'toastify-react-native'
import { setAuthToken } from '@/core/service/api.service'
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
            console.log('access_token:', access_token)
            Toast.success('Đăng nhập thành công!')
            yield call(setAuthToken, access_token)
            router.push('/companies')
        }
    } catch (error) {
        Toast.error('Đăng nhập thất bại!')
    }
}

function* handleGetTokenApi() {
    yield takeEvery(getToken, getTokenSaga)
}
export function* authenSagaList() {
    yield all([handleGetTokenApi()])
}
