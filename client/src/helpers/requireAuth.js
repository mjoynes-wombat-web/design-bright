import { Redirect } from 'react-router-dom';

import store from '../store';

const requireAuth = () => {
  const currentState = store.getState();

  if (currentState.userAuth.accessToken && currentState.userAuth.accessToken.length === 16) {
    return true;
  }
  return false;
};

export default requireAuth;
