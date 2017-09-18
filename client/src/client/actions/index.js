/* eslint-env browser */
import auth0 from 'auth0-js';
import axios from 'axios';

import C from '../constants';

export const newError = (errType, errMsg) => (dispatch) => {
  dispatch({
    type: C.ERROR,
    payload: {
      type: errType,
      message: errMsg,
    },
  });
};

export const clearError = () => (dispatch) => {
  dispatch({
    type: C.ERROR,
    payload: {
      type: '',
      message: '',
    },
  });
};

export const newMessage = (msgType, msg) => (dispatch) => {
  dispatch({
    type: C.MESSAGE,
    payload: {
      type: msgType,
      message: msg,
    },
  });
};

export const clearMessage = () => (dispatch) => {
  dispatch({
    type: C.MESSAGE,
    payload: {
      type: '',
      message: '',
    },
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: C.USER_AUTH,
    payload: {},
  });
  dispatch({
    type: C.USER,
    payload: {},
  });
};

export const requireAuth = () => (dispatch, getState) => {
  const currentState = getState();
  const auth = currentState.userAuth;
  const authDate = new Date(Date.parse(auth.date));
  const expireDate = new Date(authDate.setSeconds(authDate.getSeconds() + auth.expiresIn));
  const currentDate = new Date();
  if (Object.keys(auth).length > 0) {
    if (auth.accessToken && auth.accessToken.length === 16) {
      if (expireDate > currentDate) {
        return true;
      }
      dispatch(logout());

      return false;
    }
    dispatch(logout());
    return false;
  }
  return false;
};

export const getUserInfo = () =>
  (dispatch, getState) => {
    const state = getState();
    if (dispatch(requireAuth())) {
      const webAuth = new auth0.WebAuth({
        domain: 'designbright.auth0.com',
        clientID: 'bBvDRGSmgiYZk2GRZ3Va5hGeuNKwQ3Rh',
      });

      webAuth.client.userInfo(
        state.userAuth.accessToken,
        (err, userData) => {
          if (err) {
            if (err.code === 401) {
              dispatch(logout());
              return;
            }
          }
          const userInfo = {
            email: userData.email,
            firstName: userData.user_metadata.firstName,
            lastName: userData.user_metadata.lastName,
            passwordDate: new Date(Date.parse(userData.user_metadata.passwordDate)),
            userType: userData.app_metadata.userType,
          };
          if ('picture' in userData.user_metadata) {
            userInfo.picture = userData.user_metadata.picture;
          } else {
            userInfo.picture = '/assets/img/user.svg';
          }

          if (userInfo.userType === 'non-profit') {
            axios.get(`https://${window.location.hostname}:3000/api/nonprofits/${state.userAuth.accessToken}`)
              .then(({ data }) => {
                const nonprofit = data.data;
                userInfo.nonProfitName = nonprofit.name;
                userInfo.ein = nonprofit.ein;
                userInfo.address = nonprofit.address;
                userInfo.city = nonprofit.city;
                userInfo.state = nonprofit.state;
                userInfo.zip = nonprofit.zip;

                dispatch({
                  type: C.USER,
                  payload: userInfo,
                });
              })
              .catch(error => (
                error.response.data.statusCode === 401
                  ? dispatch(logout())
                  : dispatch(newError(error.response.data.message))
              ));
          } else {
            dispatch({
              type: C.USER,
              payload: userInfo,
            });
          }
        },
      );
    }
  };

export const login = (loginInfo, callback) => (dispatch) => {
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
      return dispatch(newError('login', errMsg.description), callback());
    }

    const authorization = authResults;
    authorization.date = new Date();
    dispatch(
      {
        type: C.USER_AUTH,
        payload: authorization,
      },
      callback(),
    );
    return dispatch(getUserInfo());
  });
};
