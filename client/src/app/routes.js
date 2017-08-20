/* eslint-env browser */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../scenes/home';
import Register from '../scenes/sign/scenes/register';
import Login from '../scenes/sign/scenes/login';
import Profile from '../scenes/userProfile';
import routeRefresh from '../helpers/routeRefresh';
import Message from '../partials/messages';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

const Routes = () => (
  <div className={('ontouchstart' in document.documentElement) ? '' : 'no-touch'}>
    <Message />
    <Switch onComponentWillMount={routeRefresh()}>
      <Route
        exact path='/'
        component={Home}/>
      <Route
        exact
        path='/register'
        component={Register}
      />
      <Route
        path='/login'
        component={Login}/>
      <Route
        path='/profile'
        component={Profile}/>
    </Switch>
  </div>
);

export default Routes;
