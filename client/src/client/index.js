/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import store from './store';
import App from './app';

window.React = React;
window.store = store;

ReactGA.initialize('UA-105647315-1');

render((
  <Provider store={store}>
    <BrowserRouter onUpdate={() => ReactGA.pageview(window.location)}>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
