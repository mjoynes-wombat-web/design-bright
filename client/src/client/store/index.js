/* eslint-env browser */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import appReducer from '../reducers';
import jsonState from './initialState.json';

const storeFactory = (initialState = {}) =>
  applyMiddleware(thunk)(createStore)(appReducer, initialState);

const initialState = (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) : jsonState;

const store = storeFactory(initialState);

const saveState = () => {
  localStorage['redux-store'] = JSON.stringify(store.getState());
};

store.subscribe(saveState);

export default store;
