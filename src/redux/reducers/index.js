import { combineReducers } from 'redux'
import todos from './todos'
import auth from './auth'

const reducer = combineReducers({
  todos,
  auth,
})

export default reducer
