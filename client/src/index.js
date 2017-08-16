/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import storeFactory from './store';
import App from './app';
import jsonState from './store/initialState.json';

const initialState = (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) : jsonState;

const store = storeFactory(initialState);

const saveState = () => {
  localStorage['redux-store'] = JSON.stringify(store.getState());
};

store.subscribe(saveState);

window.React = React;
window.store = store;

render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
