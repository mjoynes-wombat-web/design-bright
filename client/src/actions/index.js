import axios from 'axios';
import C from '../constants';

export const login = loginInfo => (dispatch, getState) => {
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
