/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Routes } from 'react-router-dom'
import Router from './components/Router'
import HomePage from './Pages/HomePage/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
