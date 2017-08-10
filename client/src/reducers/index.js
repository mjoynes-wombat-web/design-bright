import { combineReducers } from 'redux';
import C from '../constants';


export const createUser = (state = {}, action) =>(
  (action.type === C.CREATE_USER) ? action.payload : state
);

export const login = (state = {}, action) => (
  (action.type === C.LOGIN) ? action.payload : state
);

export default combineReducers({
  createUser,
  login,
});
