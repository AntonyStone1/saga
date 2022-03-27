import { put, takeEvery } from 'redux-saga/effects'
import { auth, signInWithGoogle } from '../../../firebase'

import { SIGNUP_G_SUCCESS, SIGNUP_G_ERROR, SIGNUP_G_REQ } from '../../constans'
import { setItem } from '../../../utils/localStorage'
import { singinGoogleErr } from '../../actions/actionCreators'

function* signinWithGoogle() {
  let errorCode = ''
  try {
    yield signInWithGoogle().catch((err) => {
      errorCode = err.code
    })
    if (!auth.currentUser) {
      yield put(singinGoogleErr(errorCode))
    }
    if (auth.currentUser) {
      yield put({ type: SIGNUP_G_SUCCESS })
      yield setItem('authorization-token', auth.currentUser.uid)
    }
  } catch (error) {
    if (error.response) {
      yield put({ type: SIGNUP_G_ERROR, error: error.response.data.error })
      console.log(error)
    }
  }
}
function* signinGoogleWatcher() {
  yield takeEvery(SIGNUP_G_REQ, signinWithGoogle)
}

export default signinGoogleWatcher
