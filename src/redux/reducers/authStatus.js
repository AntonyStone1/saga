/* eslint-disable default-param-last */
import { SET_UID } from '../constans'

const initiaState = {
  uid: '',
}

const authStatus = (state = initiaState, action) => {
  switch (action.type) {
    case SET_UID:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default authStatus
