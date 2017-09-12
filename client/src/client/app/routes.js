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
import CampaignList from '../scenes/campaignList';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routes = () => (
  <div className={('ontouchstart' in document.documentElement) ? '' : 'no-touch'}>
    <Message />
    <Switch>
      <Route
        exact path='/'
        component={gaTracker(Home)} />
      <Route
        exact
        path='/register'
        component={gaTracker(Register)}
      />
      <Route
        exact
        path='/login'
        component={gaTracker(Login)} />
      <Route
        exact
        path='/user/profile'
        component={gaTracker(Profile)} />
      <Route
        exact
        path='/user/profile/edit'
        component={gaTracker(editProfile)} />
      <Route
        exact
        path='/user/manage-campaigns'
        component={gaTracker(mngCampaigns)} />
      <Route
        exact
        path='/campaign/create'
        component={gaTracker(editCampaigns)} />
      <Route
        exact
        path='/campaign/edit/:id'
        component={gaTracker(editCampaigns)} />
      <Route
        exact
        path='/campaign/preview/:id'
        component={gaTracker(Campaign)} />
      <Route
        exact
        path='/campaign/:id'
        component={gaTracker(Campaign)} />
      <Route
        path='/campaigns/:view/:page'
        component={gaTracker(CampaignList)} />
      <Route
        path='/campaigns/:view'
        component={gaTracker(CampaignList)} />
    </Switch>
  </div>
);

export default Routes;
