/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Link,
  CircularProgress,
} from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetPassReq } from '../../redux/actions/actionCreators'

import AuthCSS from './Auth.module.css'
import { Copyright } from './Login'

const Reset = () => {
  const { isReseted, requestingReset, error } = useSelector(
    (state) => state.auth,
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const reset = (data) => dispatch(resetPassReq(data.email))
  useEffect(() => {
    if (isReseted) navigate('/login')
  }, [isReseted])
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8 }}>
        <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
          Reset your password
        </Typography>
        <form onSubmit={handleSubmit(reset)}>
          <TextField
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          {errors?.email?.type === 'pattern' && (
            <p className={AuthCSS.auth_required}>
              Invalid email address entered
            </p>
          )}
          {errors?.email?.type === 'required' && (
            <p className={AuthCSS.auth_required}>This field is required</p>
          )}
          {error && <p className={AuthCSS.auth_required}>Invalid email</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {requestingReset || !!Array.from(errors).length ? (
              <CircularProgress
                style={{ color: 'white', width: '25px', height: '25px' }}
              />
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>
        <Grid item style={{ textAlign: 'center' }}>
          <Link href="/login" variant="body2">
            Do you have an account? Sign in
          </Link>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default Reset
