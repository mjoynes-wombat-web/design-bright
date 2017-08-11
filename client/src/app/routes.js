import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../scenes/home';
import Register from '../scenes/sign/scenes/register';
import Login from '../scenes/sign/scenes/login';


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routes = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/login' component={Login}/>
    </Switch>
  </div>
);

export default Routes;
