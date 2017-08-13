import { combineReducers } from 'redux';

import C from '../constants';

const login = (state = {}, action) => (
  (action.type === C.LOGIN) ? action.payload : state
);


export default combineReducers({
  login,
});
