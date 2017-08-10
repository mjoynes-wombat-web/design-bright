/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import storeFactory from './store';
import App from './app';
// import C from './constants';
import appReducer from './reducers';
import { createUser, login } from './actions';

const initialState = (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) : {};

const saveState = () => {
  localStorage['redux-store'] = JSON.stringify(store.getState());
};

const store = storeFactory(initialState);

store.subscribe(saveState);

window.React = React;
window.store = store;

store.dispatch(
  createUser('Emily', 'Smith', 'tofieldya@gmail.com', 'testing', 'donor'));

store.dispatch(
  login('tofieldya@gmail.com', 'test'));

render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
