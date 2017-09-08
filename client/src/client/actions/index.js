/* eslint-env browser */
import auth0 from 'auth0-js';
import axios from 'axios';

import C from '../constants';

export const newError = (errType, errMsg) => (dispatch) => {
  console.log('newError ran.');
  dispatch({
    type: C.ERROR,
    payload: {
      type: errType,
      message: errMsg,
    },
  });
};

export const clearError = () => (dispatch) => {
  console.log('clearError ran.');
  dispatch({
    type: C.ERROR,
    payload: {
      type: '',
      message: '',
    },
  });
};

export const newMessage = (msgType, msg) => (dispatch) => {
  console.log('newMessage ran.');
  dispatch({
    type: C.MESSAGE,
    payload: {
      type: msgType,
      message: msg,
    },
  });
};

export const clearMessage = () => (dispatch) => {
  console.log('clearMessage ran.');
  dispatch({
    type: C.MESSAGE,
    payload: {
      type: '',
      message: '',
    },
  });
};

export const clearUserInfo = () => (dispatch) => {
  console.log('clearUserInfo ran.');
  dispatch({
    type: C.USER,
    payload: {},
  });
};


export const logout = () => (dispatch) => {
  console.log('logout ran.');
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
  console.log('requireAuth ran.');
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
      dispatch(clearUserInfo());

      return false;
    }
    dispatch(logout());
    dispatch(clearUserInfo());
    return false;
  }
  return false;
};

export const login = loginInfo => (dispatch) => {
  console.log('login ran.');
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

export const getUserInfo = callback =>
  (dispatch, getState) => {
    console.log('getUserInfo ran.');
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

          if (userData.picture.indexOf('s.gravatar.com/avatar/')) {
            userInfo.picture = '/assets/img/user.svg';
          } else {
            userInfo.picture = userData.picture;
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
                callback();
              })
              .catch(
                error => (
                  error.response.data.statusCode === 401
                    ? dispatch(logout())
                    : dispatch(newError(error.response.data.message))
                ),
              );
          } else {
            dispatch({
              type: C.USER,
              payload: userInfo,
            });
            callback();
          }
        },
      );
    }
  };

export const editUser = (editData, callback) => (dispatch, getState) => {
  console.log('editUser ran.');
  const state = getState();
  const data = {
    editData,
    accessToken: state.userAuth.accessToken,
  };

  axios.patch(
    `https://${window.location.hostname}:3000/api/users/edit`,
    data)
    .then((results) => {
      const editUserResults = results.data;
      console.log(editUserResults);
      dispatch(newMessage(
        'editUser',
        `Congratulations, your changes have been made for ${editUserResults.data.updatedUser.email}`,
      ));

      dispatch(getUserInfo());

      callback(results);

      window.scroll(0, 0);
    })
    .catch((error) => {
      const createUserError = error.response.data;
      createUserError.message = `${createUserError.data.email.charAt(0).toUpperCase()}${createUserError.data.email.slice(1)} is already in use.`;

      dispatch(newError(createUserError.message));

      callback(error);

      window.scroll(0, 0);
    });
};
