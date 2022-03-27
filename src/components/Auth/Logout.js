/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logoutReq } from '../../redux/actions/actionCreators'

const SignOut = () => {
  const dispatch = useDispatch()
  return (
    <Button color="primary" onClick={() => dispatch(logoutReq())}>
      Sign Out
    </Button>
  )
}

export default SignOut
