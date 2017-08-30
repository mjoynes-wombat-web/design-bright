/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import smartlookClient from 'smartlook-client';

import store from './store';
import App from './app';
import routeRefresh from './helpers/routeRefresh';

window.React = React;
window.store = store;

render((
  <Provider store={store}>
    <BrowserRouter>
      <App onComponentWillMount={routeRefresh()} onComponentDidMount={smartlookClient.init('1d08f7a2a54b797ed38a726c1cd770a384a256c4')}/>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
