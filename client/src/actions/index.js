import C from '../constants';
import auth0 from 'auth0-js';

const login = loginInfo => (dispatch, getState) => {
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
      throw new Error(err);
    }

    webAuth.client.userInfo(authResults.accessToken, (userErr, user) => {
      if (userErr) {
        throw new Error(userErr);
      }
      console.log(user);
    });
  });

  dispatch({
    type: C.LOGIN,
    payload: loginInfo,
  });

  return {
    type: C.LOGIN,
    payload: loginInfo,
  };
};

export default login;
