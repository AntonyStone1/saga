import * as React from 'react'
import { useState } from 'react'
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
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useForm } from 'react-hook-form'
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

const theme = createTheme()

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [eyeActive, setEyeActive] = useState(false)

  const eyeClickHandle = () => {
    setEyeActive((prev) => !prev)
  }
  const signIn = (data) => console.log(data)

  return (
    <ThemeProvider theme={theme}>
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
            Sign in
          </Typography>
          <form
            component="form"
            onSubmit={handleSubmit(signIn)}
            noValidate
            sx={{ mt: 1 }}
            style={{ position: 'relative' }}
          >
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
