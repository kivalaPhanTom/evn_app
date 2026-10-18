import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getModules } from './modules.actions'
import { Service } from '@/core/service/modulesService'
import { catchHandle } from '@/core/utils/utils'
import { saveModuleState, type ModuleItem } from './modules.slice'

function* getModulesSaga(action: ReturnType<typeof getModules>): Generator {
  try {
    const { companyId, username } = action.payload
    const res = yield call(Service.getModulesApi, companyId, username)
    if (res.status === 200) {
      const dataRes: ModuleItem[] = (res.data?.modules ?? []).map((module: ModuleItem) => ({
        ...module,
        code: module.code.trim(),
      }))
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
