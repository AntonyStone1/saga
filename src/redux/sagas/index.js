import { all } from 'redux-saga/effects'
import login from './auth/login'
import logout from './auth/logout'
import signup from './auth/signup'
import signinWithGoogle from './auth/signinWithGoogle'
import resetPass from './auth/resetPass'

export default function* rootSaga() {
  yield all([logout(), login(), signup(), signinWithGoogle(), resetPass()])
}
