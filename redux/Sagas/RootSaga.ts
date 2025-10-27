import { all } from 'redux-saga/effects'
import { exampleSagaList } from './ExampleSaga'

const sagasList = [
  exampleSagaList(),
]

export default function* () {
  yield all(sagasList)
}
