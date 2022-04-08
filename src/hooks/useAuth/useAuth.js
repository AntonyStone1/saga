/* eslint-disable no-return-assign */
import React, { useState, useContext, createContext } from 'react'
import { useDispatch } from 'react-redux'
import {
  auth,
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signInWithGoogle,
} from '../../firebase'
import { setUID } from '../../redux/actions/actionCreators_auth'
import { setItem, getItem, removeKey } from '../../utils/localStorage'

const authContext = createContext()

// eslint-disable-next-line react/prop-types
export function ProvideAuth({ children }) {
  // eslint-disable-next-line no-use-before-define
  const Auth = useProvideAuth()
  return <authContext.Provider value={Auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)

function useProvideAuth() {
  const [isAuth, setAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [haveAccount, setAccount] = useState(false)
  const [error, setError] = useState('')
  const [isReseted, setIsReseted] = useState(false)
  const [isRemember, setIsRemember] = useState(false)
  let errors = ''
  const dispatch = useDispatch()
  async function logIn(email, pass) {
    setIsLoading(true)
    setError('')
    const res = await logInWithEmailAndPassword(email, pass).catch(
      (err) => (errors = err.code),
    )
    const { user } = res
    setError(() => errors)
    if (errors === '' && user?.uid) {
      setAuth(() => true)
      console.log('hook', setUID(user?.uid))

      dispatch(setUID(user?.uid))
    }
    setIsLoading(() => false)
  }

  async function signUp(data) {
    setIsLoading(true)
    setError('')
    const res = await registerWithEmailAndPassword(
      data?.name,
      data?.email,
      data?.password,
    ).catch((err) => (errors = err.code))
    const { user } = res
    setError(() => errors)
    if (errors === '') {
      setAuth(() => true)
      dispatch(setUID(user?.uid))
    }
    setIsLoading(() => false)
  }
  async function logOut() {
    setIsLoading(true)
    setError('')
    await logout().catch((err) => (errors = err.code))
    setError(() => errors)
    if (errors === '') {
      setAuth(() => false)
      document.location.reload()
      removeKey('uid')
    }
    setIsLoading(() => false)
  }
  async function logInWithGoogle() {
    setError('')
    const res = await signInWithGoogle().catch((err) => (errors = err.code))
    const { user } = res
    setError(() => errors)
    if (errors === '') {
      setAuth(() => true)
      dispatch(setUID(user?.uid))
    }
  }
  async function resetPassword(email) {
    setIsLoading(true)
    setError('')
    await sendPasswordReset(email).catch((err) => (errors = err.code))
    setError(() => errors)
    if (errors === '') {
      setIsReseted(() => true)
    }
    setIsLoading(() => false)
  }
  // eslint-disable-next-line consistent-return
  const rememberUser = () => {
    if (isRemember) {
      return setIsRemember(() => false)
    }
    return setIsRemember(() => true)
  }

  const genErrText = (err) => {
    const result = err
      .split('-')
      .join(' ')
      .split('/')
      .filter((word) => word !== 'auth')
      .join(' ')
      .split(' ')
      .map((word, index) =>
        index === 0 ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : word,
      )
      .join(' ')
    return result
  }
  console.log('isLoading', isLoading)
  console.log('error', error)
  console.log('auth', isAuth)
  return {
    isAuth,
    isLoading,
    isRemember,
    isReseted,
    haveAccount,
    logIn,
    logInWithGoogle,
    logOut,
    signUp,
    setAuth,
    resetPassword,
    rememberUser,
    setAccount,
    error,
    genErrText,
  }
}
