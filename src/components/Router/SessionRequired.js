/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function SessionRequired({ children }) {
  const { isAuth } = useSelector((state) => state.auth)
  if (isAuth) {
    return <>{children}</>
  }
  return <Navigate to="/login" />
}

export default SessionRequired
