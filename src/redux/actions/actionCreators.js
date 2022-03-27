import { v4 as uuid } from 'uuid'
import {
  CREATE_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  LOGIN_REQ,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_REQ,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  SIGNUP_REQ,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_G_REQ,
  SIGNUP_G_SUCCESS,
  SIGNUP_G_ERROR,
  RESET_PASS_REQ,
  RESET_PASS_SUCCESS,
  RESET_PASS_ERROR,
  REMEMBER_USER,
} from '../constans'

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

// login
export const loginReq = (data) => ({
  type: LOGIN_REQ,
  data,
})

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
})

export const loginErr = (payload) => ({
  type: LOGIN_ERROR,
  error: payload,
})
// logout
export const logoutReq = () => ({
  type: LOGOUT_REQ,
})

export const logoutSuccess = (payload) => ({
  type: LOGOUT_SUCCESS,
  payload,
})

export const logoutErr = (payload) => ({
  type: LOGOUT_ERROR,
  payload,
})

// singup
export const singupReq = (data) => ({
  type: SIGNUP_REQ,
  data,
})

export const singupSuccess = (payload) => ({
  type: SIGNUP_SUCCESS,
  payload,
})

export const singupErr = (payload) => ({
  type: SIGNUP_ERROR,
  error: payload,
})
// singinGoogle
export const singinGoogleReq = () => ({
  type: SIGNUP_G_REQ,
})

export const singinGoogleSuccess = () => ({
  type: SIGNUP_G_SUCCESS,
})

export const singinGoogleErr = (payload) => ({
  type: SIGNUP_G_ERROR,
  error: payload,
})
// resetPass
export const resetPassReq = (payload) => ({
  type: RESET_PASS_REQ,
  email: payload,
})

export const resetPassSuccess = () => ({
  type: RESET_PASS_SUCCESS,
})

export const resetPassErr = (payload) => ({
  type: RESET_PASS_ERROR,
  error: payload,
})
// rememberUser
export const rememberUser = () => ({
  type: REMEMBER_USER,
})
