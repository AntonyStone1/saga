import { put, takeEvery } from 'redux-saga/effects'
import { logInWithEmailAndPassword, auth } from '../../../firebase'

import { LOGIN_REQ, LOGIN_SUCCESS, LOGIN_ERROR } from '../../constans'
import { setItem } from '../../../utils/localStorage'
import { loginErr } from '../../actions/actionCreators'

function* sendLogin({ data }) {
  let errorCode = ''
  try {
    yield logInWithEmailAndPassword(data.email, data.password).catch((err) => {
      errorCode = err.code
    })
    if (!auth.currentUser) {
      yield put(loginErr(errorCode))
    }
    if (auth.currentUser) {
      yield put({ type: LOGIN_SUCCESS })
      // yield setItem('authorization-token', auth.currentUser.uid)
    }
  } catch (error) {
    if (error.response) {
      yield put({ type: LOGIN_ERROR, error: error.response.data.error })
      console.log(error)
    }
  }
}
function* loginWatcher() {
  yield takeEvery(LOGIN_REQ, sendLogin)
}

export default loginWatcher
