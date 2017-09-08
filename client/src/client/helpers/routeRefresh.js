/* eslint-env browser */
import store from '../store';
import { clearError, clearMessage } from '../actions';

const routeRefresh = () => {
  window.scrollTo(0, 0);
  document.activeElement.blur();
  console.log('Route refresh ran.');
  // store.dispatch(clearError());
  // store.dispatch(clearMessage());
};

export default routeRefresh;
