import React     from 'react';
import { Route } from 'react-router';
import App from 'components/app';
import LogIn from 'components/pages/log-in';

export default (
  <Route name="app" component={App} path="/">
    <Route name="home" path="home" component={LogIn}/>
  </Route>
);
