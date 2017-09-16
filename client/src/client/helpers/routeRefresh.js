/* eslint-env browser */
import store from '../store';
import { clearError, clearMessage } from '../actions';

const routeRefresh = () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
  document.activeElement.blur();
  // store.dispatch(clearError());
  // store.dispatch(clearMessage());
};

export default routeRefresh;
