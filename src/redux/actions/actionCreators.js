import { v4 as uuid } from 'uuid'
import { CREATE_TODO, TOGGLE_TODO, DELETE_TODO, LOG_IN } from '../constans'

export const createTodo = (val) => ({
  type: CREATE_TODO,
  payload: {
    value: val,
    complited: false,
    id: uuid(),
  },
})
export const toggleTodo = (e) => ({
  type: TOGGLE_TODO,
  payload: {
    id: e.target.id,
  },
})
export const deleteTodo = (e) => ({
  type: DELETE_TODO,
  payload: {
    id: e.currentTarget.id,
  },
})
export const logIn = () => ({
  type: LOG_IN,
  payload: {
    isAuth: true,
  },
})
