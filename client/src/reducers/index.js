import { combineReducers } from 'redux';

import C from '../constants';

const userAuth = (state = {}, action) => (
  (action.type === C.USER_AUTH) ? action.payload : state
);


export default combineReducers({
  userAuth,
});
