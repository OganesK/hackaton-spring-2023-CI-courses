/* eslint-disable no-constant-condition */
/*eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
import React from 'react';
import { useQuery } from '@apollo/client';
import { Route, Switch, Redirect } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '.';
import { userContext } from '../Context/context';
import { ME_QUERY } from '../Queries';
import { API_URL } from '../config';
import Loading from '../Components/UI/Loading/Loading';

const refreshToken: () => void = async () => {
  const res = await (await fetch(`${API_URL}/refresh_token`, { method: 'POST', credentials: 'include' })).json();
  if (res.ok) {
    localStorage.setItem('token', res.accessToken);
  } else {
    localStorage.removeItem('token');
  }
};

const AppRouter: () => JSX.Element = () => {
  const { data, error, loading } = useQuery(ME_QUERY);

  if (error) {
    console.error(error);
  }
  if (loading) {
    return <Loading />;
  }

  if (data) {
    if (localStorage.getItem('token') && data.me === null) {
      refreshToken();
    }
  }

  return (
    <userContext.Provider value={{ user: data ? data.me : null }}>
      {!data.me ? (
        <Switch>
          {publicRoutes.map(route => (
            <Route component={route.component} path={route.path} exact={route.exact} key={route.path} />
          ))}
          <Redirect to="/home" />
        </Switch>
      )  : (
        <Switch>
          {publicRoutes.map(route => (
            <Route component={route.component} path={route.path} exact={route.exact} key={route.path} />
          ))}
          <Redirect to="/home" />
        </Switch>
      )}
    </userContext.Provider>
  );
};

export default AppRouter;
