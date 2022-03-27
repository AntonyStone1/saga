import { put, takeEvery } from 'redux-saga/effects'
import { auth, registerWithEmailAndPassword } from '../../../firebase'

import { SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_REQ } from '../../constans'
import { setItem } from '../../../utils/localStorage'
import { singupErr } from '../../actions/actionCreators'

function* signupWihtEmail({ data }) {
  let errorCode = ''
  try {
    yield registerWithEmailAndPassword(
      data.name,
      data.email,
      data.password,
    ).catch((err) => {
      errorCode = err.code
    })
    if (!auth.currentUser) {
      yield put(singupErr(errorCode))
    }
    if (auth.currentUser) {
      yield put({ type: SIGNUP_SUCCESS })
      // yield setItem('authorization-token', auth.currentUser.uid)
    }
  } catch (error) {
    if (error.response) {
      yield put({ type: SIGNUP_ERROR, error: error.response.data.error })
      console.log(error)
    }
  }
}
function* signupWatcher() {
  yield takeEvery(SIGNUP_REQ, signupWihtEmail)
}

export default signupWatcher
