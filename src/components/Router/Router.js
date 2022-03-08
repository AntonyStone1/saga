/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import { Route, Routes, Navigate } from 'react-router-dom'
import HomePage from '../../Pages/HomePage/HomePage'
import SignIn from '../SignIn'

const Router = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/home" />} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  )
}

export default Router
