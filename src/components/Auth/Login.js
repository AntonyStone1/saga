import * as React from 'react'
import { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { CircularProgress } from '@mui/material'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AuthCSS from './Auth.module.css'
import {
  loginReq,
  rememberUser,
  singinGoogleReq,
} from '../../redux/actions/actionCreators'

export function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        Todo list
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}

export default function LogIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuth, requestingAuth, error } = useSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [eyeActive, setEyeActive] = useState(false)
  const eyeClickHandle = () => {
    setEyeActive((prev) => !prev)
  }
  const logIn = (data) => dispatch(loginReq(data))

  useEffect(() => {
    if (isAuth) navigate('/home')
  }, [isAuth])
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form
          component="form"
          onSubmit={handleSubmit(logIn)}
          noValidate
          sx={{ mt: 1 }}
          style={{ position: 'relative', width: '100%' }}
        >
          <TextField
            {...register('email', {
              required: true,
            })}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          {errors?.email?.type === 'required' && (
            <p className={AuthCSS.auth_required}>This field is required</p>
          )}
          <div style={{ position: 'relative' }}>
            <TextField
              {...register('password', {
                required: true,
              })}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={!eyeActive ? 'password' : 'text'}
              id="password"
              autoComplete="current-password"
            />
            <span
              className={
                !eyeActive ? AuthCSS.pass_eye__open : AuthCSS.pass_eye__close
              }
              onClick={eyeClickHandle}
            />
          </div>
          {errors?.password?.type === 'required' && (
            <p className={AuthCSS.auth_required}>This field is required</p>
          )}
          {error && (
            <p className={AuthCSS.auth_required}>Invalid email or password</p>
          )}
          <FormControlLabel
            onClick={() => dispatch(rememberUser())}
            sx={{
              padding: '9px',
            }}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {requestingAuth || !!Array.from(errors).length ? (
              <CircularProgress
                style={{ color: 'white', width: '25px', height: '25px' }}
              />
            ) : (
              'Log In'
            )}
          </Button>
          <Grid
            container
            sx={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <Grid item xs>
              <Link href="/reset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => dispatch(singinGoogleReq())}
            >
              Sign In with google
            </Button>
          </Grid>
        </form>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
