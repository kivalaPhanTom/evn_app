import { all } from 'redux-saga/effects'
import { exampleSagaList } from './ExampleSaga'
import { powerSagaList } from './PowerSagas'
import {authenSagaList} from './AuthenSagas'
const sagasList = [
  exampleSagaList(),
  powerSagaList(),
  authenSagaList()
]

export default function* () {
  yield all(sagasList)
}
