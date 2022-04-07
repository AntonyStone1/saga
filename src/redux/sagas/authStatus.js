import { put, takeEvery } from 'redux-saga/effects'
import { logInWithEmailAndPassword, auth } from '../../firebase'

import { SET_UID } from '../constans'
import { setItem } from '../../utils/localStorage'
import { loginErr } from '../actions/actionCreators'

function* authStatus({ data }) {
  let errorCode = ''
  try {
    yield logInWithEmailAndPassword(data.email, data.password).catch((err) => {
      errorCode = err.code
    })
    if (!auth.currentUser) {
      yield put(loginErr(errorCode))
    }
    if (auth.currentUser) {
      // yield setItem('authorization-token', auth.currentUser.uid)
    }
  } catch (error) {
    if (error.response) {
      console.log(error)
    }
  }
}
function* authWatcher() {
  yield takeEvery(SET_UID, authStatus)
}

export default authWatcher
