import { all } from 'redux-saga/effects'
import { authenSagaList } from './AuthenSagas'
import { powerSagaList } from './PowerSagas'
import { productOutputSagaList } from './ProductOutputSaga'
import { hydrologySagaList } from './HydrologySagas'
import { revenueProfitSagaList } from './RevenueProfitSaga'
import { repairScheduleSagaList } from './UnitMaintenanceScheduleSaga'
import { modulesSagaList } from './ModulesSaga'
import { techInfoSagaList } from './TechInfoSaga'
import { documentSagaList } from './DocumentSaga'

export default function* () {
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
