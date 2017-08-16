import auth0 from 'auth0-js';

import C from '../constants';

export const login = (loginInfo, callback) => (dispatch, getState) => {
  const webAuth = new auth0.WebAuth({
    domain: 'designbright.auth0.com',
    clientID: 'bBvDRGSmgiYZk2GRZ3Va5hGeuNKwQ3Rh',
  });

  webAuth.client.login({
    realm: 'Username-Password-Authentication',
    username: loginInfo.email,
    password: loginInfo.password,
    scope: 'user_metadata',
  }, (err, authResults) => {
    if (err) {
      callback(err);

      return dispatch({
        type: C.USER_AUTH,
        payload: {
          error: err.description,
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

export const getCampaigns = () => {
  console.log('Gets campaigns.');
};
