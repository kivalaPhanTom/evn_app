import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getModules } from '../domains/modules/modules.actions'
import { Service } from '@/core/service/modulesService'
import { catchHandle } from '@/core/utils/utils'
import { saveModuleState } from '../domains/modules/modules.slice'

function* getModulesSaga(): Generator {
  try {
    const res = yield call(Service.getModulesApi)
    if (res.status === 200) {
      const dataRes = res.data?.modules || []
      yield put(saveModuleState(dataRes))
    }
  } catch (error) {
    catchHandle(error, 'getModulesSaga')
  }
}

function* getModulesApi() {
  yield takeEvery(getModules, getModulesSaga)
}

export function* modulesSagaList() {
  yield all([getModulesApi()])
}
