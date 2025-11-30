import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getPowerOverivew } from '../Actions/PowerActions'
import {setPowerOverview} from '../slices/PowerSlice'
import { Service } from '@/core/service/powerService'

function* getPowerOverviewSaga(): Generator {
    try {
        const res = yield call(Service.getPowerOverviewApi)
        if(res.status === 200){
            yield put(setPowerOverview(res.data))
        }
    } catch (error) {
        console.log('errorXXX:', error)
    }
}

function* handleGetPowerOverviewApi() {
    yield takeEvery(getPowerOverivew, getPowerOverviewSaga)
}
export function* powerSagaList() {
    yield all([handleGetPowerOverviewApi()])
}
