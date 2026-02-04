import { all } from 'redux-saga/effects'
import { exampleSagaList } from './ExampleSaga'
import { powerSagaList } from './PowerSagas'
import { authenSagaList } from './AuthenSagas'
import { productOutputSagaList } from './ProductOutputSaga'
import { hydrologySagaList } from './HydrologySagas'
import { revenueProfitSagaList } from './RevenueProfitSaga'
import { repairScheduleSagaList } from './UnitMaintenanceScheduleSaga'
import { modulesSagaList } from './ModulesSaga'
import { techInfoSagaList } from './TechInfoSaga'
const sagasList = [
  exampleSagaList(),
  powerSagaList(),
  productOutputSagaList(),
  authenSagaList(),
  hydrologySagaList(),
  revenueProfitSagaList(),
  repairScheduleSagaList(),
  modulesSagaList(),
  techInfoSagaList()
]

export default function* () {
  yield all(sagasList)
}
