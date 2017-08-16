import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import appReducer from '../reducers';

export default (initialState = {}) => applyMiddleware(thunk)(createStore)(appReducer, initialState);
