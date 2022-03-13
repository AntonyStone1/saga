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
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { LockOpenOutlined } from '@material-ui/icons'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  auth,
  signInWithGoogle,
  registerWithEmailAndPassword,
} from '../../firebase'
import AuthCSS from './Auth.module.css'

function Copyright(props) {
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

export default function SignUp() {
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [eyeActive, setEyeActive] = useState(false)
  const location = useLocation()
  const eyeClickHandle = () => {
    setEyeActive((prev) => !prev)
  }
  const logIn = (data) =>
    registerWithEmailAndPassword(data.name, data.email, data.password)

  // useEffect(() => {
  //   if (user) navigate('/home')
  // }, [user])
  console.log('user', user)
  console.log(loading)
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
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          component="form"
          onSubmit={handleSubmit(logIn)}
          noValidate
          sx={{ mt: 1 }}
          style={{ position: 'relative', width: '100%' }}
        >
          <TextField
            {...register('name', {
              required: true,
              minLength: 3,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
          />
          {errors?.name?.type === 'required' && (
            <p className={AuthCSS.auth_required}>This field is required</p>
          )}
          {errors?.name?.type === 'maxLength' && (
            <p className={AuthCSS.auth_required}>
              First name cannot exceed 20 characters
            </p>
          )}
          {errors?.name?.type === 'minLength' && (
            <p className={AuthCSS.auth_required}>
              Password must be at least 3 characters long
            </p>
          )}
          {errors?.name?.type === 'pattern' && (
            <p className={AuthCSS.auth_required}>
              Alphabetical characters only
            </p>
          )}
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
          <div style={{ position: 'relative' }}>
            <TextField
              {...register('password', {
                required: true,
                pattern: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,}/g,
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
          {errors?.password?.type === 'pattern' && (
            <p className={AuthCSS.auth_required}>
              1 capital letter, 1 number, must be 8 characters
            </p>
          )}
          {location.pathname === '/login' ? (
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid
            container
            sx={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <Grid item>
              <Link href="/login" variant="body2">
                Do you have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
