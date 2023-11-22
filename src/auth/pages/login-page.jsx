import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startEmailLogin, startGoogleSignIn } from "../../store/auth";


const formData = {
  email: '',
  password: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El email es obligatorio'],
  password: [(value) => value.length !== 0, 'El password es obligatorio'],
}

export const LoginPage = () => {

  const dispatch = useDispatch();
  
  const { status, errorMessage } = useSelector( state => state.auth )

  const [formSubmitted, setFormSubmitted] = useState(false);


  const { formState, email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm(formData, formValidations);

  const isAuthenticated = useMemo( () => status === 'checking', [status])

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if( !isFormValid ) return;

    dispatch(startEmailLogin(formState));

  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  return ( 
    <AuthLayout title="Login">
      <form className="animate__animated animate__fadeIn animate__faster" onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com" 
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
              />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label="Password"
                type="password"
                placeholder="Password" 
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } display={ errorMessage ? '' : 'none' }>
                <Alert severity="error">
                  { errorMessage }
                </Alert>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button type="submit" variant="contained" fullWidth disabled={isAuthenticated}>
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button onClick={onGoogleSignIn} variant="contained" fullWidth disabled={isAuthenticated}>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to='/auth/register'>
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
   );
}