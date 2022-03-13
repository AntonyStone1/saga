/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable default-param-last */
import { LOG_IN, SIGN_UP } from '../constans'

const auth = (state = { isAuth: false }, { type, payload }) => {
  switch (type) {
    case LOG_IN:
      if (payload.value !== '') {
        return [...state, payload]
      }
      return state
    case SIGN_UP:
      return state.map((item) => {
        if (item.id === payload.id) {
          item.complited = !item.complited
        }
        return item
      })
    default:
      return state
  }
}

export default auth
