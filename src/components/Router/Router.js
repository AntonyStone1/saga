/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import HomePage from '../../Pages/HomePage/HomePage'
import LogIn from '../Auth/Login'
import SignUp from '../Auth/SignUp'
import SessionRequired from './SessionRequired'
import { auth } from '../../firebase'

const Router = () => {
  const [currentUser] = useAuthState(auth)
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/home"
        element={currentUser ? <HomePage /> : <Navigate to="/login" />}
      />
    </Routes>
  )
}

export default Router
