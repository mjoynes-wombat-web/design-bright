import auth0 from 'auth0-js';

import C from '../constants';

export const newError = (errType, errMsg) => (dispatch, getState) => {
  dispatch({
    type: C.ERROR,
    payload: {
      type: errType,
      message: errMsg,
    },
  });
};

export const clearError = () => (dispatch, getState) => {
  dispatch({
    type: C.ERROR,
    payload: {
      type: '',
      message: '',
    },
  });
};

export const newMessage = (msgType, msg) => (dispatch, getState) => {
  dispatch({
    type: C.MESSAGE,
    payload: {
      type: msgType,
      message: msg,
    },
  });
};

export const clearMessage = () => (dispatch, getState) => {
  dispatch({
    type: C.MESSAGE,
    payload: {
      type: '',
      message: '',
    },
  });
};

export const login = loginInfo => (dispatch, getState) => {
  const webAuth = new auth0.WebAuth({
    domain: 'designbright.auth0.com',
    clientID: 'bBvDRGSmgiYZk2GRZ3Va5hGeuNKwQ3Rh',
  });

  webAuth.client.login({
    realm: 'Username-Password-Authentication',
    username: loginInfo.email,
    password: loginInfo.password,
    scope: 'user_metadata',
  }, (errMsg, authResults) => {
    if (errMsg) {
      return dispatch(newError('login', errMsg.description));
    }

    const authorization = authResults;
    authorization.date = new Date();

    return dispatch({
      type: C.USER_AUTH,
      payload: authorization,
    });
  });
};

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: C.USER_AUTH,
    payload: {},
  });
};

export const getCampaigns = () => {
  return null;
};
