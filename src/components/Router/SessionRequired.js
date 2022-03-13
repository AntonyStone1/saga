/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { auth } from '../../firebase'

// eslint-disable-next-line react/prop-types
function SessionRequired({ children }) {
  const [currentUser] = useAuthState(auth)
  if (!currentUser) {
    return <>{children}</>
  }
  return <Navigate to="/login" />
}

export default SessionRequired
