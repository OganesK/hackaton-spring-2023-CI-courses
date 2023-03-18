import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import {
  Grid,
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Typography,
  Snackbar,
} from '@material-ui/core';
import Alert from '@mui/material/Alert';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import NavBar from '../../Components/UI/NavBar/NavBar';
import { SIGN_IN_MUTATION } from './Graphql/Mutations';
import useStyles from './Style';

import { LogInInput } from './Graphql/typings';

function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Права защищены © '}
      <Link color="inherit" href="#">
      CIB Courses
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const LogIn: () => JSX.Element = () => {
  const classes = useStyles();
  const [emailFormValue, setEmailFormValue] = useState('');
  const [passwordFormValue, setPaswordFormValue] = useState('');
  const [open, setOpen] = useState(false);

  const [logInHandler, { data }] = useMutation<{ signIn: { token: string } }>(SIGN_IN_MUTATION);
  if (data && data.signIn !== null) {
    localStorage.setItem('token', data.signIn.token);
    window.location.reload();
    return <Redirect to="/home" />;
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid container style={{ height: '10vh' }}>
        <NavBar text="qwe" topIdent={1} bottomIdent={1} />
      </Grid>
      <Grid container component="main" style={{ height: '90vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            backgroundImage: 'url(headerImage.webp)',
          }}
          className={classes.image}
        />
        <Grid item container xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Авторизация
            </Typography>
            <form
              className={classes.form}
              onSubmit={(e: React.FormEvent): void => {
                e.preventDefault();
                const userInput: LogInInput = {
                  login: emailFormValue,
                  password: passwordFormValue,
                };
                logInHandler({
                  variables: {
                    input: userInput,
                  },
                })
                  .then()
                  .catch(err => console.error(err));
              }}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                value={emailFormValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmailFormValue(e.target.value)}
                label="Адрес почты"
                name="email"
                autoComplete="email"
                autoFocus
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                  },
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPaswordFormValue(e.target.value)}
                value={passwordFormValue}
              />
              <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Запомнить меня"
                className={classes.controlLabel}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submitButton}
                onClick={async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
                  e.preventDefault();
                  const userInput: LogInInput = {
                    login: emailFormValue,
                    password: passwordFormValue,
                  };
                  const res = await logInHandler({
                    variables: {
                      input: userInput,
                    },
                  });
                  if (res.data?.signIn === null) {
                    setOpen(true);
                    setTimeout(() => setOpen(false), 4000);
                  }
                }}
              >
                Войти
              </Button>

              <Grid container style={{ marginTop: 10 }}>
                <Grid item xs>
                  <Link className={classes.link} href="#" variant="body2">
                    Забыли пароль?
                  </Link>
                </Grid>
                <Grid item>
                  <Link className={classes.link} href="/signup" variant="body2">
                    У вас еще нет аккаунта? Зарегистрироваться
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Grid container justifyContent="center" alignItems="flex-end" style={{ marginBottom: 10 }}>
            <Copyright />
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Неправильный логин или пароль
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default LogIn;
