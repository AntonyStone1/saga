/* eslint-disable no-return-assign */
import React, { useState, useContext, createContext } from 'react'
import {
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signInWithGoogle,
} from '../../firebase'
import { setItem, getItem } from '../../utils/localStorage'

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

  async function logIn(email, pass) {
    setIsLoading(true)
    setError('')
    await logInWithEmailAndPassword(email, pass).catch((err) => (errors = err))
    setError(() => errors)
    if (errors === '') {
      setAuth(() => true)
    }
    setIsLoading(() => false)
  }

  async function signUp(data) {
    setIsLoading(true)
    setError('')
    await registerWithEmailAndPassword(
      data?.name,
      data?.email,
      data?.password,
    ).catch((err) => (errors = err))
    setError(() => errors)
    if (errors === '') {
      setAuth(() => true)
    }
    setIsLoading(() => false)
  }
  async function logOut() {
    setIsLoading(true)
    setError('')
    await logout().catch((err) => (errors = err))
    setError(() => errors)
    if (errors === '') {
      setAuth(() => false)
    }
    setIsLoading(() => false)
  }
  async function logInWithGoogle() {
    setError('')
    await signInWithGoogle().catch((err) => (errors = err))
    setError(() => errors)
    if (errors === '') {
      setAuth(() => true)
    }
  }
  async function resetPassword(email) {
    setIsLoading(true)
    setError('')
    await sendPasswordReset(email).catch((err) => (errors = err))
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
  console.log('isLoading', isLoading)
  console.log('error', error)
  console.log('auth', isAuth)
  return {
    isAuth,
    logIn,
    logInWithGoogle,
    logOut,
    signUp,
    setAuth,
    resetPassword,
    rememberUser,
    isRemember,
    isReseted,
    haveAccount,
    setAccount,
    error,
    isLoading,
  }
}
