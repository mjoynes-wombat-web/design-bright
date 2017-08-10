import axios from 'axios';
import C from '../constants';

export const createUser = (
  firstName,
  lastName,
  email,
  password,
  userType,
  position = '',
  nonProfitName = '',
  EIN = null,
  address = '',
  city = '',
  state = '',
  zip = null) => (dispatch, getState) => {

  const newUser = {
    firstName,
    lastName,
    email,
    password,
    userType,
    position,
    nonProfitName,
    EIN,
    address,
    city,
    state,
    zip,
  };

  axios.post('http://localhost:3001/api/users/create', newUser);

  return {
    type: C.CREATE_USER,
    payload: newUser,
  };
};

export const login = (email, password) => {
  console.log(email);
  return {
    type: C.LOGIN,
    payload: {
      email,
      password,
    },
  };
};
