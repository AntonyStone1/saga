/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth/useAuth'

// eslint-disable-next-line react/prop-types
function SessionRequired({ children }) {
  const { isAuth } = useAuth()
  if (isAuth) {
    return <>{children}</>
  }
  return <Navigate to="/login" />
}

export default SessionRequired
