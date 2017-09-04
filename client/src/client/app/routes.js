/* eslint-env browser */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../scenes/home';
import Register from '../scenes/sign/scenes/register';
import Login from '../scenes/sign/scenes/login';
import Profile from '../scenes/userProfile';
import editProfile from '../scenes/userProfile/scenes/edit';
import Message from '../partials/messages';
import Campaign from '../scenes/campaign';
import mngCampaigns from '../scenes/mngCampaigns';
import editCampaigns from '../scenes/editCampaigns';
import gaTracker from '../helpers/gaTracker';
import routeRefresh from '../helpers/routeRefresh';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routes = () => (
  <div className={('ontouchstart' in document.documentElement) ? '' : 'no-touch'}>
    <Message />
    <Switch onComponentWillMount={routeRefresh}>
      <Route
        exact path='/'
        component={gaTracker(Home)}/>
      <Route
        exact
        path='/register'
        component={gaTracker(Register)}
      />
      <Route
        exact
        path='/login'
        component={gaTracker(Login)}/>
      <Route
        exact
        path='/profile'
        component={gaTracker(Profile)}/>
      <Route
        exact
        path='/profile/edit'
        component={gaTracker(editProfile)}/>
      <Route
        exact
        path='/campaigns/edit/:id'
        component={gaTracker(editCampaigns)}/>
      <Route
        exact
        path='/campaigns/:id'
        component={gaTracker(Campaign)}/>
      <Route
        exact
        path='/manage-campaigns'
        component={gaTracker(mngCampaigns)}/>
    </Switch>
  </div>
);

export default Routes;
