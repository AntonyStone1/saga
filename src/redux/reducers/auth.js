/* eslint-disable default-param-last */
import {
  LOGIN_ERROR,
  LOGIN_REQ,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQ,
  LOGOUT_SUCCESS,
  REMEMBER_USER,
  RESET_PASS_ERROR,
  RESET_PASS_REQ,
  RESET_PASS_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_G_ERROR,
  SIGNUP_G_REQ,
  SIGNUP_G_SUCCESS,
  SIGNUP_REQ,
  SIGNUP_SUCCESS,
} from '../constans'

const initialState = {
  requestingAuth: false,
  requestingReset: false,
  requestingGoogle: false,
  isAuth: false,
  isReseted: false,
  isError: false,
  remebmerUser: false,
}

const auth = function loginReducer(state = initialState, action) {
  switch (action.type) {
    // login
    case LOGIN_REQ:
      return {
        ...state,
        requestingAuth: true,
        error: '',
        isError: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        requestingAuth: false,
        isAuth: true,
        isError: false,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        requestingAuth: false,
        isError: true,
        error: action.error,
      }
    // logout
    case LOGOUT_REQ:
      return {
        ...state,
        requestingAuth: true,
        isError: false,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        requestingAuth: false,
        isAuth: false,
        isError: false,
      }
    case LOGOUT_ERROR:
      return {
        ...state,
        requestingAuth: false,
        isAuth: false,
        isError: true,
      }
    // signup
    case SIGNUP_REQ:
      return {
        ...state,
        requestingAuth: true,
        isAuth: false,
        isError: false,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        requestingAuth: false,
        isAuth: true,
        isError: false,
      }
    case SIGNUP_ERROR:
      return {
        ...state,
        requestingAuth: false,
        isAuth: false,
        isError: true,
        error: action.error,
      }
    // signupGoogle
    case SIGNUP_G_REQ:
      return {
        ...state,
        requestingGoogle: true,
        isAuth: false,
        isError: false,
      }
    case SIGNUP_G_SUCCESS:
      return {
        ...state,
        requestingGoogle: false,
        isAuth: true,
        isError: false,
      }
    case SIGNUP_G_ERROR:
      return {
        ...state,
        requestingGoogle: false,
        isAuth: false,
        isError: true,
        error: action.error,
      }
    // resetPass
    case RESET_PASS_REQ:
      return {
        ...state,
        requestingReset: true,
        isReseted: false,
        isError: false,
        email: action?.email,
        error: '',
      }
    case RESET_PASS_SUCCESS:
      return {
        ...state,
        requestingReset: false,
        isReseted: true,
        isError: false,
        email: action?.payload,
      }
    case RESET_PASS_ERROR:
      return {
        ...state,
        requestingReset: false,
        isReseted: false,
        isError: true,
        error: action.error,
      }
    // rememberUser
    case REMEMBER_USER:
      return {
        ...state,
        remebmerUser: !state.remebmerUser,
      }
    default:
      return state
  }
}

export default auth
