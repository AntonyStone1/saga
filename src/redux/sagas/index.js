import { all } from 'redux-saga/effects'
import authStatus from './authStatus'

export default function* rootSaga() {
  yield all([authStatus()])
}
