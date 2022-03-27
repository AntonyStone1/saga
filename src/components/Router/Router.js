/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../../Pages/HomePage/HomePage'
import LogIn from '../Auth/Login'
import SignUp from '../Auth/SignUp'
import Reset from '../Auth/Reset'
import SessiionRequiered from './SessionRequired'

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset" element={<Reset />} />
      <Route
        path="/home"
        element={
          <SessiionRequiered>
            <HomePage />
          </SessiionRequiered>
        }
      />
    </Routes>
  )
}

export default Router
