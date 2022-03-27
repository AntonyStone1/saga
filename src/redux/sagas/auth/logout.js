import { put, takeEvery } from 'redux-saga/effects'
import { auth, logout } from '../../../firebase'

import { LOGOUT_REQ, LOGOUT_SUCCESS, LOGOUT_ERROR } from '../../constans'

function* sendLogout() {
  try {
    yield logout()
    if (!auth.currentUser) {
      yield put({ type: LOGOUT_SUCCESS })
    }
  } catch (error) {
    if (error.response) {
      yield put({ type: LOGOUT_ERROR, error: error.response.data.error })
    }
  }
}

function* logoutWatcher() {
  yield takeEvery(LOGOUT_REQ, sendLogout)
}
export default logoutWatcher
