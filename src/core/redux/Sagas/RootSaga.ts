import { all } from 'redux-saga/effects'
import { exampleSagaList } from './ExampleSaga'
import { powerSagaList } from './PowerSagas'
import { authenSagaList } from './AuthenSagas'
import { productOutputSagaList } from './ProductOutputSaga'
import { hydrologySagaList } from './HydrologySagas'
import { revenueProfitSagaList } from './RevenueProfitSaga'
const sagasList = [
  exampleSagaList(),
  powerSagaList(),
  productOutputSagaList(),
  authenSagaList(),
  hydrologySagaList(),
  revenueProfitSagaList(),
]

export default function* () {
  yield all(sagasList)
}
