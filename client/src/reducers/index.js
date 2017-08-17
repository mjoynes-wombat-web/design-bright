import { combineReducers } from 'redux';

import C from '../constants';

const userAuth = (state = {}, action) => (
  (action.type === C.USER_AUTH) ? action.payload : state
);

const error = (state = {}, action) => (
  (action.type === C.ERROR) ? action.payload : state
);


export default combineReducers({
  userAuth,
  error,
});
