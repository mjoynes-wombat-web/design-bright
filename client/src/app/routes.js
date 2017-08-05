import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../scenes/home';
import Roster from '../scenes/roster';
import Schedule from '../scenes/schedule';


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/>
    </Switch>
  </main>
);

export default Routes;