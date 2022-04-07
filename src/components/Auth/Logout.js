/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import { Button } from '@mui/material'
import { useAuth } from '../../hooks/useAuth/useAuth'

const Logout = () => {
  const { logOut } = useAuth()
  return (
    <Button color="primary" onClick={logOut}>
      Sign Out
    </Button>
  )
}

export default Logout
