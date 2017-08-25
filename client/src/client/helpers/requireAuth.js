import { Redirect } from 'react-router-dom';

import store from '../store';
import { logout, clearUserInfo } from '../actions';

const requireAuth = () => {
  const currentState = store.getState();
  const auth = currentState.userAuth;
  const userInfo = currentState.userInfo;
  const authDate = new Date(Date.parse(auth.date));
  const expireDate = new Date(authDate.setSeconds(authDate.getSeconds() + auth.expiresIn));
  const currentDate = new Date();

  if (auth.accessToken && auth.accessToken.length === 16) {
    if (expireDate > currentDate) {
      return true;
    }
    store.dispatch(logout());
    store.dispatch(clearUserInfo());

    return false;
  } else if (userInfo.email) {
    store.dispatch(clearUserInfo());

    return false;
  }
};

export default requireAuth;
