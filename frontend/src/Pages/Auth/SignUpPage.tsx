import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

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

import { useHistory } from 'react-router-dom';

import NavBar from '../../Components/UI/NavBar/NavBar';

import { SIGN_UP_MUTATION } from './Graphql/Mutations';
import useStyles from './Style';

import { UserCreateInput } from './Graphql/typings';

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

const SignUp: () => JSX.Element = () => {
  const classes = useStyles();
  const [fNameValue, setFnameValue] = useState('');
  const [lNameValue, setLNameValue] = useState('');
  const [loginValue, setLoginValue] = useState('');
  const [emailFormValue, setEmailFormValue] = useState('');
  const [passwordFormValue, setPaswordFormValue] = useState('');
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [signUpHandler, { data }] = useMutation<{ signUp: { token: string } }>(SIGN_UP_MUTATION);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (data && data.signUp !== null) {
    localStorage.setItem('token', data.signUp.token);
    history.push('/signin');
  } else if (data && data.signUp === null) {
    if (!open) {
      setOpen(true);
    }
  }

  const signUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userInput: UserCreateInput = {
      firstname: fNameValue,
      lastname: lNameValue,
      email: emailFormValue,
      login: loginValue,
      password: passwordFormValue,
    };
    alert('asdasd');
    await signUpHandler({
      variables: {
        data: userInput,
      },
    });
    alert('asdasd');
    history.push('/signin');
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
              Регистрация
            </Typography>
            <form className={classes.form} onSubmit={(e: React.FormEvent) => signUpSubmit(e)} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fName"
                value={fNameValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFnameValue(e.target.value)}
                label="Имя"
                name="fName"
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
                name="Lastname"
                label="Фамилия"
                type="lName"
                id="lName"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLNameValue(e.target.value)}
                value={lNameValue}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="login"
                label="Логин"
                type="login"
                id="login"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLoginValue(e.target.value)}
                value={loginValue}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                label="Адрес почты"
                type="email"
                id="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmailFormValue(e.target.value)}
                value={emailFormValue}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPaswordFormValue(e.target.value)}
                value={passwordFormValue}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submitButton}
                onClick={async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
                  e.preventDefault();
                  const userInput: UserCreateInput = {
                    firstname: fNameValue,
                    lastname: lNameValue,
                    email: emailFormValue,
                    login: loginValue,
                    password: passwordFormValue,
                  };
                  await signUpHandler({
                    variables: {
                      data: userInput,
                    },
                  });
                  history.push('/signin');
                }}
              >
                Зарегистрироваться
              </Button>
              <Snackbar open={open} autoHideDuration={6000} onClose={() => handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  Неправильный логин или пароль
                </Alert>
              </Snackbar>
            </form>
          </div>
          <Grid container justifyContent="center" alignItems="flex-end" style={{ marginBottom: 10 }}>
            <Copyright />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUp;
