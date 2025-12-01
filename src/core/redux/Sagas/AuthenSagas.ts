import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getToken } from '../Actions/AuthenActions'
import { setPowerOverview } from '../slices/PowerSlice'
import { Service } from '@/core/service/authenSerivce'
import { setAuthToken } from '@/core/service/api.service'

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
            yield call(setAuthToken, access_token)
        }
    } catch (error) {
        // console.log('errorXXX:', error)
    }
}

function* handleGetTokenApi() {
    yield takeEvery(getToken, getTokenSaga)
}
export function* authenSagaList() {
    yield all([handleGetTokenApi()])
}
