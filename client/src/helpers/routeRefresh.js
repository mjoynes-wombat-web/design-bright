/* eslint-env browser */
const routeRefresh = () => {
  window.scrollTo(0, 0);
  document.activeElement.blur();
};

export default routeRefresh;
