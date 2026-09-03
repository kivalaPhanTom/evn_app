import { all } from 'redux-saga/effects'
import {
  authenSagaList,
  documentSagaList,
  hydrologySagaList,
  modulesSagaList,
  powerSagaList,
  productOutputSagaList,
  repairScheduleSagaList,
  revenueProfitSagaList,
  techInfoSagaList,
} from '../domains'

export function* rootSaga() {
  yield all([
    authenSagaList(),
    powerSagaList(),
    productOutputSagaList(),
    hydrologySagaList(),
    revenueProfitSagaList(),
    repairScheduleSagaList(),
    modulesSagaList(),
    techInfoSagaList(),
    documentSagaList(),
  ])
}

export default rootSaga
