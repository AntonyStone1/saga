/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter } from 'react-router-dom'
import Router from './components/Router'

const isAuth = true

function App() {
  return (
    <BrowserRouter>
      <Router authStatus={isAuth} />
    </BrowserRouter>
  )
}

export default App
