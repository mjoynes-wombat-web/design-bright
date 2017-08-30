import React from 'react';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-105647315-1');

const gaTracker = (WrappedComponent) => {
  const trackPage = (page) => {
    ReactGA.set({ page });
    ReactGA.pageview(page);
  };

  const HOC = (props) => {
    const page = props.location.pathname;
    trackPage(page);

    return (
      <WrappedComponent {...props} />
    );
  };

  return HOC;
};

export default gaTracker;
