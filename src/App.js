/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter } from 'react-router-dom'
import Router from './components/Router'
import { ProvideAuth } from './hooks/useAuth/useAuth'

const isAuth = true

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Router authStatus={isAuth} />
      </BrowserRouter>
    </ProvideAuth>
  )
}

export default App
