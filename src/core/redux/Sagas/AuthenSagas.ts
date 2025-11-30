import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getToken } from '../Actions/AuthenActions'
import { setPowerOverview } from '../slices/PowerSlice'
// import { Service } from '@/core/service/authenSerivce'

function* getTokenSaga(action:any): Generator {
    const { username, password } = action.payload
    try {
        // const res = yield call(Service.Service)
        // if (res.status === 200) {
        //     yield put(setPowerOverview(res.data))
        // }
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
