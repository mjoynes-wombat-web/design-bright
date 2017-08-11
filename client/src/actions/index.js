import axios from 'axios';
import C from '../constants';

export const login = loginInfo => (dispatch, getState) => {
  console.log(loginInfo);

  axios.post('http://localhost:3001/api/users/login', loginInfo);

  dispatch({
    type: C.LOGIN,
    payload: loginInfo,
  });

  return {
    type: C.LOGIN,
    payload: loginInfo,
  };
};

export const createUser = newUser => (dispatch, getState) => {
  console.log(newUser);
  axios.post('http://localhost:3001/api/users/create', newUser);

  dispatch({
    type: C.CREATE_USER,
    payload: newUser,
  });

  return {
    type: C.CREATE_USER,
    payload: newUser,
  };
};
