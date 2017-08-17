import auth0 from 'auth0-js';

import C from '../constants';

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
      return dispatch({
        type: C.ERROR,
        payload: {
          error: errMsg.description,
        },
      });
    }

    return dispatch({
      type: C.USER_AUTH,
      payload: authResults,
    });
  });
};

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: C.USER_AUTH,
    payload: {},
  });
};

export const newError = errMsg => (dispatch, getState) => {
  dispatch({
    type: C.ERROR,
    payload: [
      ...getState().error,
      errMsg,
    ],
  });
};

export const clearError = delError => (dispatch, getState) => {
  dispatch({
    type: C.ERROR,
    payload: getState.error.filter(errMsg => errMsg !== delError),
  });
};

export const getCampaigns = () => {
  console.log('Gets campaigns.');
};
