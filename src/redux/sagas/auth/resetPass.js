import { put, takeEvery } from 'redux-saga/effects'
import { auth, sendPasswordReset } from '../../../firebase'
import { resetPassErr, resetPassSuccess } from '../../actions/actionCreators'

import { RESET_PASS_ERROR, RESET_PASS_REQ } from '../../constans'

function* resetPass({ email }) {
  let successReset = false
  let errorCode = ''
  try {
    yield sendPasswordReset(email)
      .then(() => {
        successReset = true
      })
      .catch((err) => {
        errorCode = err.code
      })
    if (errorCode) {
      yield put(resetPassErr(errorCode))
    }
    if (successReset) {
      yield put(resetPassSuccess())
    }
  } catch (error) {
    if (error.response) {
      yield put({ type: RESET_PASS_ERROR, error: error.response.data.error })
      console.log(error)
    }
  }
}
function* resetPassWatcher() {
  yield takeEvery(RESET_PASS_REQ, resetPass)
}

export default resetPassWatcher
