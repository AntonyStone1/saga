/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable default-param-last */
import { CREATE_TODO, TOGGLE_TODO, DELETE_TODO } from '../constans'

const todos = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_TODO:
      if (payload.value !== '') {
        return [...state, payload]
      }
      return state
    case TOGGLE_TODO:
      return state.map((item) => {
        if (item.id === payload.id) {
          item.complited = !item.complited
        }
        return item
      })
    case DELETE_TODO:
      return state.filter((item) => {
        if (item.id === payload.id) {
          return
        }
        return item
      })
    default:
      return state
  }
}

export default todos
