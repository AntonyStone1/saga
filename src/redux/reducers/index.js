import { combineReducers } from 'redux'
import authStatus from './authStatus'

const reducer = combineReducers({
  authStatus,
})

export default reducer
