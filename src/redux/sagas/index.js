import { takeLatest } from '@redux-saga/core/effects'
import { CREATE_TODO } from '../constans'
import { getLatestNews } from '../../api'

export function* workerSaga() {
  const data = yield getLatestNews()
  console.log(data)
}

export function* watchClickSaga() {
  yield takeLatest(CREATE_TODO, workerSaga)
}

export default function* rootSaga() {
  yield watchClickSaga()
}
